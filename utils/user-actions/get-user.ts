"use server";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function getUserId() {
  const supabase = await createClient();

  // Fetch the authenticated user
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (!sessionUser) {
    throw new Error("User not authenticated");
  }

  return sessionUser.id;
}

export async function getUserEmail() {
  const supabase = await createClient();

  // Fetch the authenticated user
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (!sessionUser) {
    throw new Error("User not authenticated");
  }

  return sessionUser.email;
}

export async function redirectIfNotLoggedIn() {
  try {
    // Create a Supabase client instance
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no user is logged in, redirect to the sign-in page
    if (!user) {
      redirect("/sign-in");
    }

    return user; // Return the user object if authenticated
  } catch (error) {
    console.error("Error checking user authentication:", error);
    redirect("/sign-in"); // Redirect on error
  }
}

export async function getFullUser() {
  const supabase = await createClient();

  // Fetch the authenticated user from Supabase
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (!sessionUser) {
    return null; // Return null if no user is authenticated
  }

  // Fetch user details from Prisma, including subscriptions
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      subscriptions: true, // Include related subscriptions
    },
  });

  if (!user) {
    return null; // Return null if the user is not found in the database
  }

  // Determine the active subscription (if any) and calculate days left
  const now = new Date();
  const activeSubscription = user.subscriptions.find((sub) => {
    return sub.isActive && now >= sub.startDate && now <= sub.endDate;
  });

  const daysLeft = activeSubscription
    ? Math.ceil(
        (new Date(activeSubscription.endDate).getTime() - now.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return {
    id: user.id,
    email: user.email,
    subscribed: !!activeSubscription, // Boolean: true if there's an active subscription
    daysLeft, // Number: days remaining in active subscription or null if no subscription
  };
}
