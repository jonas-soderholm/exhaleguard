import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { createClient } from "@/utils/supabase/server";
import { Logo } from "../../app/constants/logo";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <nav className="w-full flex justify-between shadow-md h-[4rem] bg-exhaleguard-primary sticky top-0 z-50 overflow-hidden">
        <div className="w-full flex justify-between items-center text-sm">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center font-semibold">
              <img
                src={Logo.Tower}
                alt="Xhale Logo"
                className="w-6 md:w-10 mx-3"
              />
              <span className="text-[20px] md:text-2xl font-bold text-slate-200 ml-[-5px]">
                ExhaleGuard
              </span>
            </div>
          </Link>

          {/* Right-side links */}
          <div className="flex items-center justify-center">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Courses Link */}
            <div className="hover:underline ml-2 text-slate-200">
              <Link href="/courses">Courses</Link>
            </div>

            {/* Auth Links */}
            <div
              className={`hidden md:flex items-center ${!user ? "ml-2" : ""}`}
            >
              {user ? null : (
                <>
                  <div className="text-slate-200 pointer-events-none">|</div>
                  <div className="hover:underline text-slate-200 ml-2">
                    <Link href="/sign-in">Sign in</Link>
                  </div>
                </>
              )}
            </div>

            {/* Navigation Drawer */}
            <NavigationDrawer user={user} />
          </div>
        </div>
      </nav>
    </>
  );
}
