"use client";

import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export function TopNavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#D5C0A9]/40">
      <div className="h-14 flex items-center justify-between px-5">

        {/* Logo — pinned left */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src="/Picture 1.png" alt="Day One" width={28} height={28} />
          <span className="font-bold text-[#261D20] text-[15px] tracking-tight">Day One</span>
        </div>

        {/* Right actions — pinned right */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link
            href="/onboarding-get-to-know-you?edit=1"
            className="text-sm text-[#584B46] hover:text-[#261D20] px-3 py-1.5 rounded-lg hover:bg-[#FCF3E8] active:bg-[#F7E2CE] transition-all"
          >
            Profile
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-[#584B46] px-3 py-1.5 rounded-lg transition-all hover:bg-[#96401F] hover:text-white active:bg-[#A53B0A] active:scale-95"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
