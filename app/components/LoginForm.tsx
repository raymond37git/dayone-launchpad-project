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
      <div className="flex flex-col gap-6 rounded-2xl border border-black/[.08] bg-white p-8 shadow-sm dark:border-white/[.1] dark:bg-zinc-900">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Sign in
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your credentials to continue.
          </p>
        </div>

        <form action={loginAction} className="flex flex-col gap-4">
          {loginState?.error && (
            <p className="text-sm text-red-500 dark:text-red-400">{loginState.error}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={loginPending}
            className="mt-1 h-10 w-full rounded-lg bg-black text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {loginPending ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-black/[.08] dark:bg-white/[.1]" />
        <span className="text-xs text-zinc-400">or</span>
        <div className="h-px flex-1 bg-black/[.08] dark:bg-white/[.1]" />
      </div>

      {/* Create Account */}
      <div className="flex flex-col gap-6 rounded-2xl border border-black/[.08] bg-white p-8 shadow-sm dark:border-white/[.1] dark:bg-zinc-900">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Create an account
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            New here? Get started in seconds.
          </p>
        </div>

        <form action={signupAction} className="flex flex-col gap-4">
          {signupState?.error && (
            <p className="text-sm text-red-500 dark:text-red-400">{signupState.error}</p>
          )}
          {signupState?.message && (
            <p className="text-sm text-green-600 dark:text-green-400">{signupState.message}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Full name
            </label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <button
            type="submit"
            disabled={signupPending}
            className="mt-1 h-10 w-full rounded-lg border border-black/[.12] bg-zinc-50 text-sm font-medium text-black transition hover:bg-zinc-100 active:scale-[.98] disabled:opacity-50 dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            {signupPending ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
