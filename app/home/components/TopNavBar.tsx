"use client";

import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

interface Props {
  avatarUrl?: string | null;
  spriteOn?: boolean;
  onToggleSprite?: () => void;
}

export function TopNavBar({ avatarUrl, spriteOn, onToggleSprite }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md border-b border-[#D5C0A9]/30">
      <div className="h-14 flex items-center justify-between px-5">

        {/* Logo — scrolls to top on click */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center flex-shrink-0 rounded-lg p-1 hover:opacity-70 transition-opacity"
          aria-label="Back to top"
        >
          <Image src="/Picture 1.png" alt="Day One" width={28} height={28} />
        </a>

        {/* Right actions — pinned right */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link
            href="/onboarding-get-to-know-you?edit=1"
            className="flex items-center gap-2 text-sm text-[#584B46] hover:text-[#261D20] px-3 py-1.5 rounded-lg hover:bg-[#FCF3E8] active:bg-[#F7E2CE] transition-all"
          >
            {/* Avatar circle */}
            <span className="w-6 h-6 rounded-full overflow-hidden border border-[#D5C0A9] bg-[#FCF3E8] flex items-center justify-center flex-shrink-0">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[11px]">👤</span>
              )}
            </span>
            Profile
          </Link>

          {onToggleSprite !== undefined && (
            <button
              type="button"
              onClick={onToggleSprite}
              title={spriteOn ? "Hide Ray" : "Show Ray"}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#FCF3E8] transition-all active:scale-95 select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/head.png"
                alt="Ray"
                className="w-6 h-6 flex-shrink-0"
                style={{ imageRendering: "pixelated" }}
              />

              {/* Slide toggle */}
              <div style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                backgroundColor: spriteOn ? "#4ade80" : "#D5C0A9",
                position: "relative",
                flexShrink: 0,
                transition: "background-color 0.2s ease",
              }}>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  position: "absolute",
                  top: 2,
                  left: spriteOn ? 18 : 2,
                  transition: "left 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                }} />
              </div>
            </button>
          )}

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
