import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/header/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogoName } from "@/constants/logo-name";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <>
      {/* Header */}
      <h1 className="text-2xl mb-4 font-bold">Sign in to {LogoName.AppName}</h1>

      {/* OAuth Login */}
      <div className="flex flex-col gap-2 w-full md:max-w-sm max-w-xs mx-auto">
        {/* OAuth Sign-up */}
        <div className="flex flex-col gap-2 w-full md:max-w-sm max-w-xs mx-auto">
          <OAuthButtons />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center w-[350px] mx-auto my-4">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-2 text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Email/Password Login */}
      <div className="flex justify-center items-center bg-base-300 px-6 py-6 rounded-lg border-slate-700 border-2 w-full md:max-w-sm max-w-xs mx-auto">
        <form className="flex-1 flex flex-col">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mb-2 mt-3">
            <Label className="text-slate-200" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-base-200 border-gray-700 text-slate-200 !placeholder-gray-600"
              name="email"
              placeholder="you@example.com"
              required
            />

            <div className="flex justify-between items-center">
              <Label className="text-slate-200" htmlFor="password">
                Password
              </Label>
              <Link
                className="text-xs underline !text-blue-400"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>

            <Input
              className="bg-base-200 border-gray-700 text-slate-200 !placeholder-gray-600"
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
          <p className="text-sm text-slate-200 text-center">
            Don't have an account?{" "}
            <Link
              className="font-medium underline text-blue-400"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
