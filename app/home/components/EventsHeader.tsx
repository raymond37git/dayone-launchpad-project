"use client";

export function EventsHeader() {
  return (
    <div className="flex items-center justify-between py-4">

      {/* Left: title + view toggles */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-[#261D20]">Events</h2>
        <div className="flex items-center gap-0.5 bg-[#F7E2CE] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => {}}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white shadow-sm text-[#584B46] active:scale-90 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#BC9579] hover:text-[#584B46] active:bg-white active:scale-90 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="2" y1="4" x2="14" y2="4" />
              <line x1="2" y1="8" x2="14" y2="8" />
              <line x1="2" y1="12" x2="14" y2="12" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {}}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#BC9579] hover:text-[#584B46] hover:bg-[#F7E2CE] active:bg-[#D5C0A9] active:scale-90 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <line x1="10" y1="10" x2="14" y2="14" />
          </svg>
        </button>
      </div>

      {/* Right: Submit Event + RSS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {}}
          className="text-sm font-medium border border-[#D5C0A9] bg-white text-[#584B46] rounded-full px-4 py-1.5 hover:bg-[#FCF3E8] active:bg-[#F7E2CE] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Submit Event
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-[#D5C0A9] text-[#BC9579] hover:text-[#584B46] hover:bg-[#FCF3E8] active:bg-[#F7E2CE] active:scale-90 transition-all cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h3v3H2zM2 8c3.3 0 6 2.7 6 6H6c0-2.2-1.8-4-4-4V8zm0-4c5.5 0 10 4.5 10 10h-2C10 8.5 6.5 5 2 5V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
