import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/utils/prisma";
import { createOrUpdateSubscription } from "@/utils/user-actions/subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      // Payment completed successfully
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const planType = session.metadata?.planType;
      const planMembers = session.metadata?.planMembers || "";
      const amount = session.amount_total ? session.amount_total / 100 : 0; // Convert cents to dollars
      const status = session.payment_status;
      const stripeRef = session.payment_intent as string;
      const payDate = new Date();

      if (!userId) {
        return new NextResponse("User ID is missing", { status: 400 });
      }

      if (planType === "individual") {
        await createOrUpdateSubscription(userId);
        await prisma.invoice.create({
          data: { userId, amount, status, payDate, stripeRef, planMembers },
        });
        console.log("✔️✔️✔️✔️✔️ PLAN:", planType);
      } else {
        console.log("✔️✔️✔️✔️✔️ PLAN:", planType);
      }
    }
  } catch (error) {
    console.error(`Error processing event ${event.type}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return new NextResponse("Webhook received", { status: 200 });
}
