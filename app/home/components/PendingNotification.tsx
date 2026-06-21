"use client";

import { useState } from "react";

export function PendingNotification() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mt-4 mb-1 rounded-xl border border-[#D5C0A9] bg-[#F7E2CE] px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#96401F] flex-shrink-0" />
        <p className="text-xs text-[#584B46]">
          You have <span className="font-semibold">0 events</span> pending approval
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-[#BC9579] hover:text-[#584B46] active:scale-90 transition-all text-base leading-none flex-shrink-0"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
