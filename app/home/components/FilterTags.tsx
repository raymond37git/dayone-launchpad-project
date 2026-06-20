"use client";

import { useState } from "react";

const FILTERS = [
  { label: "AI", count: 4 },
  { label: "Sydney", count: 7 },
  { label: "Virtual", count: 3 },
  { label: "Networking", count: 3 },
  { label: "Hackathon", count: 2 },
  { label: "Melbourne", count: 1 },
  { label: "Conference", count: 1 },
  { label: "Demo", count: 1 },
];

export function FilterTags() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex gap-2 flex-wrap py-3">
      {FILTERS.map((f) => {
        const isActive = active === f.label;
        return (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(isActive ? null : f.label)}
            className={[
              "text-xs px-3 py-1.5 rounded-full border transition-all active:scale-95 cursor-pointer font-medium",
              isActive
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
            ].join(" ")}
          >
            {f.label}{" "}
            <span className={isActive ? "text-gray-300" : "text-gray-400"}>
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
