"use server";
import Stripe from "stripe";
import { getFullUser } from "../user-actions/get-user";
import prisma from "../prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function createCheckoutSession(planMembers?: string) {
  const priceId = process.env.NEXT_STRIPE_PRICE_ID; // Ensure this is set in your .env file
  const user = await getFullUser();

  if (!user) {
    throw new Error("User is not authenticated or does not exist.");
  }

  // Check if planMembers is empty or null
  const isPlanMembersEmpty = !planMembers || planMembers.trim() === "";

  const { id, email } = user;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email, // Prefill the email in Stripe Checkout
    metadata: {
      id, // Attach user ID for webhook reference
      email, // Attach email for webhook reference
      planMembers: isPlanMembersEmpty ? user.email : planMembers,
    },
    payment_intent_data: {
      metadata: {
        userId: id, // Attach user ID for webhook reference in Payment Intent
        userEmail: email, // Attach email for webhook reference in Payment Intent
        planMembers: isPlanMembersEmpty ? user.email : planMembers,
      },
    },
    line_items: [
      {
        price: priceId, // Pass the string directly here
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
  });

  return session.url;
}

export async function createInvoice(
  userId: string,
  amount: number,
  status: string,
  payDate: Date,
  stripeRef: string,
  planMembers: string
) {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        amount,
        status,
        payDate,
        stripeRef,
        planMembers,
      },
    });

    console.log("Invoice created successfully:", invoice);
    return invoice;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice");
  }
}

export async function getInvoice() {
  const user = await getFullUser(); // Fetch the authenticated user

  if (!user) {
    throw new Error("User not authenticated or not found");
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.id, // Properly reference the user ID
      },
    });
    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices");
  }
}
