"use server";

import { supabaseAdmin } from "@/utils/supabase/admin";
import prisma from "@/utils/prisma";

export const deleteUser = async (userId: string) => {
  if (!userId) {
    return { error: "No user found" };
  }

  try {
    // Delete related records
    await prisma.subscription.deleteMany({ where: { userId } });
    await prisma.invoice.deleteMany({ where: { userId } });
    await prisma.progress.deleteMany({ where: { userId } });

    // Delete the user record in Prisma
    await prisma.user.delete({ where: { id: userId } });

    // Delete from Supabase Auth (Admin API)
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      console.error("Supabase delete error:", error.message);
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
};
