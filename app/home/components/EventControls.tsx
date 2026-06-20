"use client";

import { useState } from "react";

export function EventControls() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="border-b border-gray-100 px-5 flex items-center justify-between">

      {/* Tab switcher */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setTab("upcoming")}
          className={[
            "text-sm py-3 px-1 mr-6 font-medium transition-all",
            tab === "upcoming"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400 hover:text-gray-600 active:text-gray-800",
          ].join(" ")}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setTab("past")}
          className={[
            "text-sm py-3 px-1 font-medium transition-all",
            tab === "past"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400 hover:text-gray-600 active:text-gray-800",
          ].join(" ")}
        >
          Past
        </button>
      </div>

      {/* Submit Event */}
      <button
        type="button"
        onClick={() => {}}
        className="text-xs border border-gray-200 rounded-full px-4 py-1.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all cursor-pointer"
      >
        + Submit Event
      </button>
    </div>
  );
}
