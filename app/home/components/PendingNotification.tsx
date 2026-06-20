"use client";

import { useState } from "react";

export function PendingNotification() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mx-5 mt-4 mb-1 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
        <p className="text-xs text-amber-700">
          You have <span className="font-semibold">0 events</span> pending approval
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 active:scale-90 transition-all text-base leading-none flex-shrink-0"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
