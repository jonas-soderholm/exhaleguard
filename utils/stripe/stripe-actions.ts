"use server";
import Stripe from "stripe";
import { getFullUser } from "../user-actions/get-user";
import prisma from "../prisma";
import { Prices } from "@/constants/prices";
const MIN_TEAM_MEMBERS = 2;
const MAX_TEAM_MEMBERS = 3;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function createCheckoutSessionIndividual() {
  const user = await getFullUser();

  if (!user) {
    throw new Error("User is not authenticated or does not exist.");
  }

  const { id, email } = user;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email, // Prefill the email in Stripe Checkout

    metadata: {
      userId: id, // User ID
      userEmail: email, // Email
      planType: "individual", // Tells Stripe this is an Individual Plan
    },

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Individual Plan",
            description: "1-month access",
          },
          unit_amount: Prices.Individual * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
  });

  return session.url;
}

export async function createCheckoutSessionTeam(teamEmails: string[]) {
  const user = await getFullUser();

  if (!user) {
    throw new Error("User is not authenticated or does not exist.");
  }

  const { id, email } = user;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,

    metadata: {
      userId: id, // User ID
      userEmail: email, // Email
      planType: "team", // Tells Stripe this is a Team Plan
      teamMembers: JSON.stringify(teamEmails), // Store team members as JSON
    },

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Team Plan",
            description: `Access for ${teamEmails.length} members`,
          },
          unit_amount: Prices.Team * 100,
        },
        quantity: teamEmails.length,
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
