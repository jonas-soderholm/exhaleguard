import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const supabase = await createClient();

  // Fetch the authenticated user after sign-in
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (sessionUser) {
    // Check if user exists in Prisma DB
    const existingUser = await prisma.user.findUnique({
      where: { id: sessionUser.id },
    });

    if (!sessionUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(sessionUser);
  } else {
    return NextResponse.json(
      { error: "Session user not found" },
      { status: 401 }
    );
  }
}
