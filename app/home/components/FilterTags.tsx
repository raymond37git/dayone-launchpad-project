"use client";

import { EVENTS } from "../data/events";
import { INTEREST_TAG_LABELS } from "@/app/lib/tags";

const TAG_COUNTS = INTEREST_TAG_LABELS.map((label) => ({
  label,
  count: EVENTS.filter((e) => e.tags.some((t) => t.label === label)).length,
})).filter((t) => t.count > 0);

interface Props {
  activeTags: string[];
  onTagSelect: (tag: string) => void;
}

export function FilterTags({ activeTags, onTagSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap py-3">
      {TAG_COUNTS.map((f) => {
        const isActive = activeTags.includes(f.label);
        return (
          <button
            key={f.label}
            type="button"
            onClick={() => onTagSelect(f.label)}
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
