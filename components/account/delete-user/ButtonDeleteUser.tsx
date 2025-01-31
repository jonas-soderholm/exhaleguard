"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { deleteUser } from "./DeleteUser";
import { useRouter } from "next/navigation";

export default function DeleteUserButton() {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    if (!userId) return;
    const response = await deleteUser(userId);

    if (response?.success) {
      router.push("/sign-in"); // Redirect after deletion
    } else {
      console.error(response?.error || "Unknown error");
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={handleDelete}
      disabled={!userId}
    >
      {userId ? "Delete My Account" : "Loading..."}
    </button>
  );
}
