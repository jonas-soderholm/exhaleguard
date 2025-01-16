// utils/getUser.ts
import { createClient } from "@/utils/supabase/server";

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
