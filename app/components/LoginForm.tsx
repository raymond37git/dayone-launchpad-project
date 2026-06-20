"use client";

import { useActionState } from "react";
import { login, signup, type AuthState } from "@/app/actions/auth";

export default function LoginForm() {
  const [loginState, loginAction, loginPending] = useActionState<AuthState, FormData>(
    login,
    undefined
  );
  const [signupState, signupAction, signupPending] = useActionState<AuthState, FormData>(
    signup,
    undefined
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-sm">
      {/* Login */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[#D5C0A9] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[#96401F]">
            Sign in
          </h1>
          <p className="text-sm text-[#896D5F]">
            Enter your credentials to continue.
          </p>
        </div>

        <form action={loginAction} className="flex flex-col gap-4">
          {loginState?.error && (
            <p className="text-sm text-red-600">{loginState.error}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="text-sm font-medium text-[#584B46]">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-sm font-medium text-[#584B46]">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loginPending}
            className="mt-1 h-10 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98] disabled:opacity-50"
          >
            {loginPending ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D5C0A9]" />
        <span className="text-xs text-[#BC9579]">or</span>
        <div className="h-px flex-1 bg-[#D5C0A9]" />
      </div>

      {/* Create Account */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[#D5C0A9] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#96401F]">
            Create an account
          </h2>
          <p className="text-sm text-[#896D5F]">
            New here? Get started in seconds.
          </p>
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
            className="mt-1 h-10 w-full rounded-lg border border-[#96401F] bg-[#FCF3E8] text-sm font-medium text-[#96401F] transition hover:bg-[#F7E2CE] active:scale-[.98] disabled:opacity-50"
          >
            {signupPending ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
