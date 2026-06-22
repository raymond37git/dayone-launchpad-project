"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthState } from "@/app/actions/auth";

export default function SignupForm() {
  const [signupState, signupAction, signupPending] = useActionState<AuthState, FormData>(
    signup,
    undefined
  );

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6 rounded-2xl border border-[#D5C0A9] bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[#96401F]">
              Create an account
            </h1>
            <p className="text-sm text-[#896D5F]">
              New here? Get started in seconds.
            </p>
          </div>
          <Link
            href="/"
            aria-label="Back to sign in"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#BC9579] transition hover:bg-[#FCF3E8] hover:text-[#96401F]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Link>
        </div>

        <form action={signupAction} className="flex flex-col gap-4">
          {signupState?.error && (
            <p className="text-sm text-red-600">{signupState.error}</p>
          )}
          {signupState?.message && (
            <p className="text-sm text-[#A53B0A]">{signupState.message}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-name" className="text-sm font-medium text-[#584B46]">
              Full name
            </label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-email" className="text-sm font-medium text-[#584B46]">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="signup-password" className="text-sm font-medium text-[#584B46]">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={signupPending}
            className="mt-1 h-10 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98] disabled:opacity-50"
          >
            {signupPending ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
