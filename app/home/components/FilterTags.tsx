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
                ? "bg-[#96401F] text-white border-[#96401F]"
                : "bg-white text-[#584B46] border-[#D5C0A9] hover:border-[#896D5F]",
            ].join(" ")}
          >
            {f.label}{" "}
            <span className={isActive ? "text-[#D5C0A9]" : "text-[#BC9579]"}>
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
