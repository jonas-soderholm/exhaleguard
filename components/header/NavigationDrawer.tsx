"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "./auth/logout-button";
import Link from "next/link";
import type { User } from "@supabase/auth-js";

export default function NavigationDrawer({ user }: { user: User | null }) {
  const pathname = usePathname();

  const closeDrawer = () => {
    const drawerToggle = document.getElementById(
      "my-drawer"
    ) as HTMLInputElement;
    if (drawerToggle) {
      drawerToggle.checked = false; // Close the drawer
    }
  };

  useEffect(() => {
    // Close the drawer whenever the pathname changes
    closeDrawer();
  }, [pathname]);

  useEffect(() => {
    // Close the drawer whenever the user state changes (e.g., login/logout)
    closeDrawer();
  }, [user]);

  return (
    <div className="flex mx-2 text-slate-200">
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost text-white hover:text-slate-300 hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side mt-[4rem]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Link href="/courses" onClick={closeDrawer}>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2563EB"
                  >
                    <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
                  </svg>
                  Courses
                </div>
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={closeDrawer}>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2563EB"
                  >
                    <path d="M80-40v-80h800v80H80Zm80-120v-240q-33-54-51-114.5T91-638q0-61 15.5-120T143-874q8-21 26-33.5t40-12.5q31 0 53 21t18 50l-11 91q-6 48 8.5 91t43.5 75.5q29 32.5 70 52t89 19.5q60 0 120.5 12.5T706-472q45 23 69.5 58.5T800-326v166H160Zm80-80h480v-86q0-24-12-42.5T674-398q-41-20-95-31t-99-11q-66 0-122.5-27t-96-72.5Q222-585 202-644.5T190-768q-10 30-14.5 64t-4.5 66q0 58 20.5 111.5T240-422v182Zm240-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-720q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720q0 33 23.5 56.5T480-640ZM320-160v-37q0-67 46.5-115T480-360h160v80H480q-34 0-57 24.5T400-197v37h-80Zm160-80Zm0-480Z" />
                  </svg>
                  FAQ
                </div>
              </Link>
            </li>

            <li>
              <div className="divider"></div>
              <Link
                href={{ pathname: "/account", query: { tab: 1 } }}
                onClick={closeDrawer}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2563EB"
                  >
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                  </svg>
                  Plan Manager
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: user ? "/account" : "/sign-in",
                  query: { tab: 0 },
                }}
                onClick={closeDrawer}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2563EB"
                  >
                    <path d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z" />
                  </svg>
                  My Account
                </div>
              </Link>
            </li>
            {user ? (
              <>
                <div className="flex w-full flex-col">
                  <div className="divider"></div>
                </div>
                <div>
                  <LogoutButton onClick={closeDrawer} />
                </div>
              </>
            ) : (
              <>
                <div className="divider"></div>
                <div className="flex items-center gap-4">
                  <Link href="/sign-in" onClick={closeDrawer}>
                    <button
                      type="button"
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
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                      </svg>
                      Sign In
                    </button>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
