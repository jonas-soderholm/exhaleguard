"use server";

import { getUserId } from "@/utils/user-actions/get-user";
import { isSubscribedNew } from "@/utils/user-actions/subscription";

export async function getIdAndSub() {
  let userId: string | null = null;
  let subscribed = false;

  try {
    userId = await getUserId();
    if (userId) {
      subscribed = await isSubscribedNew(userId);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    userId = null;
  }

  return { userId, subscribed };
}
