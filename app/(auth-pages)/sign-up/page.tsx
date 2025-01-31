import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/header/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogoName } from "@/constants/logo-name";
import { signInWithOAuth } from "@/utils/google-git-auth/google-git-auth-actions";
import OAuthButtons from "@/components/auth/OAuthButtons";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      {/* Header */}
      <h1 className="text-2xl mb-4 font-bold">
        Get started with {LogoName.AppName}
      </h1>

      {/* OAuth Sign-up */}
      <div className="flex flex-col gap-2 w-full md:max-w-sm max-w-xs mx-auto">
        <OAuthButtons />
      </div>

      {/* Divider */}
      <div className="flex items-center w-[350px] mx-auto my-4">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-2 text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Email/Password Sign-up */}
      <div className="flex justify-center items-center bg-base-300 px-6 py-6 rounded-lg border-slate-700 border-2 w-full md:max-w-sm max-w-xs mx-auto">
        <form className="flex-1 flex flex-col" action={signUpAction}>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mb-2 mt-3">
            <Label className="text-slate-200" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-base-200 text-gray-200 border-gray-700 !placeholder-gray-600"
              name="email"
              placeholder="you@example.com"
              required
            />
            <Label className="text-slate-200" htmlFor="password">
              Password
            </Label>
            <Input
              className="bg-base-200 border-gray-700 text-slate-200 !placeholder-gray-600"
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
          <p className="text-sm text-foreground text-slate-200 text-center">
            Already have an account?{" "}
            <Link
              className="text-foreground font-medium underline text-blue-400"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
