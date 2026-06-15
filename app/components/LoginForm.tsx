"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
  onCreateAccount?: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin, onCreateAccount }: LoginFormProps) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    onLogin?.(loginUsername, loginPassword);
  }

  function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    onCreateAccount?.(signupUsername, signupPassword);
  }

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

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-username"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              required
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="your_username"
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
              type="password"
              autoComplete="current-password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-10 w-full rounded-lg bg-black text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[.98] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Log in
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

        <form onSubmit={handleCreateAccount} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-username"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              autoComplete="username"
              required
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="choose_a_username"
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
              type="password"
              autoComplete="new-password"
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-lg border border-black/[.12] bg-zinc-50 px-3 text-sm text-black placeholder:text-zinc-400 outline-none transition focus:border-black focus:bg-white dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:bg-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-10 w-full rounded-lg border border-black/[.12] bg-zinc-50 text-sm font-medium text-black transition hover:bg-zinc-100 active:scale-[.98] dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
