"use client";

import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export function TopNavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src="/cozy_leaf_logo.png" alt="Day One" width={28} height={28} />
          <span className="font-bold text-gray-900 text-[15px] tracking-tight">Day One</span>
        </div>

        {/* Center nav link (decorative) */}
        <button
          type="button"
          onClick={() => {}}
          className="hidden sm:block text-sm text-gray-500 hover:text-gray-800 active:text-gray-900 active:scale-95 transition-all cursor-pointer"
        >
          Discover Events
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* My Interests — real navigation */}
          <Link
            href="/onboarding-get-to-know-you?edit=1"
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            My Interests
          </Link>

          {/* Log out — real action */}
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all"
            >
              Log out
            </button>
          </form>

          {/* Sign In — decorative */}
          <button
            type="button"
            onClick={() => {}}
            className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-full hover:bg-gray-700 active:bg-gray-600 active:scale-95 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
