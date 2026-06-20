"use client";

import Image from "next/image";

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function CommunityHeader() {
  return (
    <div className="border-b border-gray-100 px-5 py-5">
      <div className="flex items-start justify-between gap-4">

        {/* Left: avatar + info */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FCF3E8] border border-[#D5C0A9] flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
            <Image src="/cozy_leaf_logo.png" alt="Day One" width={44} height={44} />
          </div>

          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Day One</h1>
            <p className="text-sm text-gray-500 leading-snug max-w-sm">
              The launchpad for founders, builders &amp; makers.
              <br />
              <span className="text-gray-400 text-xs">50+ Cities · 30K+ Community</span>
            </p>

            {/* Social icon buttons */}
            <div className="flex items-center gap-1 mt-2">
              <button
                type="button"
                onClick={() => {}}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-all"
              >
                <XIcon />
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-all"
              >
                <LinkedInIcon />
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 active:scale-90 transition-all"
              >
                <GlobeIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 pt-1">
          <button
            type="button"
            onClick={() => {}}
            className="text-sm border border-gray-200 rounded-full px-4 py-1.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="text-sm bg-gray-900 text-white rounded-full px-5 py-1.5 hover:bg-gray-700 active:bg-gray-600 active:scale-95 transition-all cursor-pointer"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
