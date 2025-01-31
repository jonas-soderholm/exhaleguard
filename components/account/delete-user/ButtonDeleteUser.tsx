"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { deleteUser } from "./DeleteUser";
import { useRouter } from "next/navigation";

export default function DeleteUserButton() {
  const [userId, setUserId] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState(""); // Track user input
  const [isConfirmed, setIsConfirmed] = useState(false); // Track if "DELETE" is typed
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

  const openModal = () => {
    const modal = document.getElementById(
      "delete_modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      {/* Delete Account Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={openModal}
        disabled={!userId}
      >
        Delete My Account
      </button>

      {/* Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Confirm Deletion</h3>
          <p className="py-2 text-slate-300">
            <strong>Warning:</strong> This action <strong>cannot</strong> be
            undone. If you have an active subscription, any remaining time will
            be lost. To permanently delete your account and all associated data,
            type <strong>"DELETE"</strong> below.
          </p>

          {/* Input Field for Confirmation */}
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-900 text-slate-200"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              setIsConfirmed(e.target.value === "DELETE");
            }}
          />

          <div className="modal-action flex justify-between">
            {/* Close Modal */}
            <form method="dialog">
              <button onClick={() => setConfirmText("")} className="btn">
                Cancel
              </button>
            </form>

            {/* Confirm Delete Button */}
            <button
              className={`btn btn-error ${isConfirmed ? "" : "opacity-50 cursor-not-allowed"}`}
              disabled={!isConfirmed}
              onClick={handleDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
