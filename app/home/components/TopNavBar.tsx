"use client";

import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export function TopNavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#D5C0A9]/40">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src="/cozy_leaf_logo.png" alt="Day One" width={28} height={28} />
          <span className="font-bold text-[#261D20] text-[15px] tracking-tight">Day One</span>
        </div>

        {/* Center nav link (decorative) */}
        <button
          type="button"
          onClick={() => {}}
          className="hidden sm:block text-sm text-[#896D5F] hover:text-[#584B46] active:text-[#261D20] active:scale-95 transition-all cursor-pointer"
        >
          Discover Events
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Link
            href="/onboarding-get-to-know-you?edit=1"
            className="text-sm text-[#584B46] hover:text-[#261D20] px-3 py-1.5 rounded-lg hover:bg-[#FCF3E8] active:bg-[#F7E2CE] transition-all"
          >
            My Interests
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-[#584B46] hover:text-[#261D20] px-3 py-1.5 rounded-lg hover:bg-[#FCF3E8] active:bg-[#F7E2CE] transition-all"
            >
              Log out
            </button>
          </form>

          <button
            type="button"
            onClick={() => {}}
            className="text-sm bg-[#96401F] text-white px-4 py-1.5 rounded-full hover:bg-[#A53B0A] active:bg-[#584B46] active:scale-95 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
