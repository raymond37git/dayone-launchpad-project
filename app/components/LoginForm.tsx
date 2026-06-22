"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthState } from "@/app/actions/auth";

export default function LoginForm() {
  const [loginState, loginAction, loginPending] = useActionState<AuthState, FormData>(
    login,
    undefined
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
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

      <Link
        href="/signup"
        className="flex h-10 w-full items-center justify-center rounded-lg border border-[#96401F] bg-[#FCF3E8] text-sm font-medium text-[#96401F] transition hover:bg-[#F7E2CE] active:scale-[.98]"
      >
        Create an account
      </Link>
    </div>
  );
}
