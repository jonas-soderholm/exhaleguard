"use client";

import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <form action={signOutAction}>
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
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </form>
      )}
    </>
  );
}
