"use client";

interface Props {
  forMe: boolean;
  onForMeToggle: () => void;
  hasUserTags: boolean;
  showSaved: boolean;
  onShowSavedToggle: () => void;
  savedCount: number;
}

export function EventsHeader({
  forMe,
  onForMeToggle,
  hasUserTags,
  showSaved,
  onShowSavedToggle,
  savedCount,
}: Props) {
  return (
    <div className="flex items-center gap-3 py-4">
      <h2 className="text-xl font-bold text-[#261D20]">Events</h2>

      <div className="flex items-center gap-2">
        {/* For Me button */}
        {hasUserTags && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onForMeToggle}
              className={`for-me-btn text-xs font-semibold px-3.5 py-1.5 rounded-full${forMe ? " active" : ""}`}
            >
              For Me
            </button>

            {/* Info tooltip */}
            <div className="relative group">
              <div className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-[#BC9579] text-[#BC9579] text-[8px] font-bold cursor-default select-none leading-none">
                i
              </div>
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-5 z-30 hidden group-hover:block w-52 rounded-lg bg-[#261D20] px-3 py-2 text-xs text-white shadow-xl">
                Filter for interests that match my profile.
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#261D20] rotate-45" />
              </div>
            </div>
          </div>
        )}

        {/* Saved button */}
        <button
          type="button"
          onClick={onShowSavedToggle}
          className={[
            "flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all active:scale-95",
            showSaved
              ? "bg-[#96401F] text-white border-[#96401F]"
              : "bg-white text-[#584B46] border-[#D5C0A9] hover:border-[#96401F] hover:text-[#96401F]",
          ].join(" ")}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 16 16"
            fill={showSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 2h10a1 1 0 0 1 1 1v11l-6-3-6 3V3a1 1 0 0 1 1-1z" />
          </svg>
          Saved
          {savedCount > 0 && (
            <span
              className={[
                "text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center",
                showSaved ? "bg-white/30 text-white" : "bg-[#F7E2CE] text-[#96401F]",
              ].join(" ")}
            >
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
