"use server";

import { getUserId } from "@/utils/user-actions/get-user";
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function redirectIfNotSubscribed() {
  try {
    const userId = await getUserId();
    const subscribed = await isSubscribed();

    if (!userId || !subscribed) {
      redirect("/sign-in");
      return null;
    }
  } catch (error) {
    console.error("Error validating subscription:", error);
    redirect("/sign-in");
    return null;
  }
}

export async function isSubscribed(): Promise<boolean> {
  try {
    const userId = await getUserId();

    // Fetch the user's subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    if (!subscription) return false;

    const now = new Date();
    const isActive =
      now >= subscription.startDate && now <= subscription.endDate;

    return isActive;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
}

export async function getSubscriptionDaysLeft(): Promise<number | null> {
  try {
    const userId = await getUserId();

    // Get the active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        isActive: true,
      },
      select: { endDate: true },
    });

    if (!subscription?.endDate) return null;

    const expiresAt = new Date(subscription.endDate);
    const today = new Date();
    const timeLeft = Math.max(
      0,
      Math.ceil((expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );

    return timeLeft;
  } catch (error) {
    console.error("Error checking subscription expiration:", error);
    return null;
  }
}

export async function createOrUpdateSubscription(userId: string) {
  // const userId = await getUserId();

  // Define the subscription start and end dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1); // Add 1 month

  // Find the existing subscription for the user
  const existingSubscription = await prisma.subscription.findFirst({
    where: { userId }, // Find by userId
  });

  // Use Prisma's upsert to either update or create a subscription
  const subscription = await prisma.subscription.upsert({
    where: {
      id: existingSubscription?.id || 0, // Use the unique ID if found, otherwise provide a placeholder
    },
    update: {
      startDate: startDate, // Update subscription details
      endDate: endDate,
      isActive: true,
    },
    create: {
      userId: userId, // Create a new subscription if none exists
      startDate: startDate,
      endDate: endDate,
      isActive: true,
    },
  });

  return subscription;
}
