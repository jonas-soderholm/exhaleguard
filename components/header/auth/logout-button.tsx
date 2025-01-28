"use client";

import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";

type LogoutButtonProps = {
  onClick?: () => void; // Optional onClick prop
};

export default function LogoutButton({ onClick }: LogoutButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <form action={signOutAction}>
          <div className="gap-4 flex items-center">
            <button
              type="submit"
              style={{
                background: "none",
                color: "inherit",
                border: "none",
                padding: 0,
                font: "inherit",
                cursor: "pointer",
                outline: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                width="20px"
                viewBox="0 -960 960 960"
                fill="#B7B7B7"
                style={{
                  marginRight: "8px", // Add space between the icon and text
                }}
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
              Sign out
            </button>
          </div>
        </form>
      )}
    </>
  );
}
