"use client";

import { useState } from "react";

// June 2026 starts on Monday (DOW=1 where 0=Sun)
const JUNE_START_DOW = 1;
const DAYS_IN_JUNE = 30;
const TODAY = 20;
// Days that have at least one event
const EVENT_DAYS = new Set([20, 21, 23, 25, 26, 28]);
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function CalendarStrip() {
  const [selectedDay, setSelectedDay] = useState<number>(TODAY);

  // Build flat cell array: nulls for leading empty cells, then 1–30
  const cells: (number | null)[] = [
    ...Array<null>(JUNE_START_DOW).fill(null),
    ...Array.from({ length: DAYS_IN_JUNE }, (_, i) => i + 1),
  ];
  // Pad so last row is complete
  const rem = cells.length % 7;
  if (rem !== 0) cells.push(...Array<null>(7 - rem).fill(null));

  return (
    <div className="border-b border-gray-100 px-5 pt-4 pb-3">

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {}}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all"
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-gray-900 px-2">June 2026</span>
          <button
            type="button"
            onClick={() => {}}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all"
          >
            ›
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSelectedDay(TODAY)}
          className="text-xs font-medium text-[#96401F] hover:opacity-70 active:opacity-50 transition-opacity"
        >
          Today
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-gray-400 py-0.5">
            {label}
          </div>
        ))}
      </div>

      {/* Calendar day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} className="py-0.5" />;

          const isPast = day < TODAY;
          const isToday = day === TODAY;
          const isSelected = day === selectedDay;
          const hasEvent = EVENT_DAYS.has(day);

          return (
            <div key={day} className="flex flex-col items-center py-0.5">
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={[
                  "w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-medium transition-all active:scale-90",
                  isSelected && isToday
                    ? "bg-[#96401F] text-white"
                    : isSelected
                    ? "bg-gray-900 text-white"
                    : isToday
                    ? "ring-2 ring-[#96401F] text-[#96401F] font-semibold"
                    : isPast
                    ? "text-gray-400 hover:bg-gray-100 active:bg-gray-200"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
                ].join(" ")}
              >
                {day}
              </button>

              {/* Event dot */}
              {hasEvent && (
                <div
                  className={`w-1 h-1 rounded-full mt-0.5 ${
                    isSelected ? "bg-white" : isPast ? "bg-gray-300" : "bg-[#96401F]"
                  }`}
                />
              )}
              {!hasEvent && <div className="w-1 h-1 mt-0.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
