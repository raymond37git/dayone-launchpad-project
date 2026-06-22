"use client";

import { useState } from "react";

const JUNE_START_DOW = 1;
const DAYS_IN_JUNE = 30;
const TODAY = 20;
const EVENT_DAYS = new Set([20, 21, 23, 25, 26, 28]);
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function StickyCalendar() {
  const [selectedDay, setSelectedDay] = useState<number>(TODAY);

  const cells: (number | null)[] = [
    ...Array<null>(JUNE_START_DOW).fill(null),
    ...Array.from({ length: DAYS_IN_JUNE }, (_, i) => i + 1),
  ];
  const rem = cells.length % 7;
  if (rem !== 0) cells.push(...Array<null>(7 - rem).fill(null));

  return (
    <div className="bg-white rounded-2xl border border-[#D5C0A9]/40 shadow-sm overflow-hidden">

      {/* Calendar header */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-base font-bold text-[#261D20]">June</span>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 px-3">
        {DAY_LABELS.map((l, i) => (
          <div key={i} className="text-center text-[10px] font-medium text-[#BC9579] py-1">
            {l}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-3 pb-3">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} className="py-0.5 h-9" />;

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
                  "w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all active:scale-90",
                  isSelected
                    ? "bg-[#96401F] text-white"
                    : isToday
                    ? "ring-2 ring-[#96401F] text-[#96401F] font-bold"
                    : isPast
                    ? "text-[#BC9579] hover:bg-[#F7E2CE]"
                    : "text-[#584B46] hover:bg-[#F7E2CE]",
                ].join(" ")}
              >
                {day}
              </button>
              {hasEvent && (
                <div className={`w-1 h-1 rounded-full -mt-0.5 ${isSelected ? "bg-white opacity-70" : "bg-[#96401F]"}`} />
              )}
              {!hasEvent && <div className="w-1 h-1 -mt-0.5" />}
            </div>
          );
        })}
      </div>

    </div>
  );
}
