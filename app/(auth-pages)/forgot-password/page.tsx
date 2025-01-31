import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/header/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoName } from "@/constants/logo-name";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      {/* Header */}
      <h1 className="text-2xl mb-4 font-bold">Reset Password</h1>
      {/* Form */}
      <div className="flex justify-center items-center bg-base-300 px-6 py-6 rounded-lg border-slate-700 border-2 w-full md:max-w-sm max-w-xs mx-auto">
        <form className="flex-1 flex flex-col" action={forgotPasswordAction}>
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
            <SubmitButton
              formAction={forgotPasswordAction}
              pendingText="Resetting..."
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
      {/* Back to Sign In */}
      <div className="flex justify-center items-center mt-4 bg-base-300 px-6 py-6 rounded-lg border-slate-700 border-2 w-full md:max-w-sm max-w-xs mx-auto">
        <p className="text-sm text-foreground text-slate-200 text-center">
          Back to{" "}
          <Link
            className="text-foreground font-medium text-blue-400"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
