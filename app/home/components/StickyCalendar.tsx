"use client";

import { useState } from "react";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0=Mon … 6=Sun (Monday-first grid)
function getFirstDayOfWeek(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}


interface Props {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  onReset: () => void;
}

export function StickyCalendar({ selectedDate, onDateSelect, onReset }: Props) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);
const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const rem = cells.length % 7;
  if (rem !== 0) cells.push(...Array<null>(7 - rem).fill(null));

  function goToPrev() {
    if (isCurrentMonth) return;
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
    onReset();
  }

  function goToNext() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
    onReset();
  }

  const selectedPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-`;
  const selectedDay = selectedDate?.startsWith(selectedPrefix)
    ? parseInt(selectedDate.split("-")[2], 10)
    : null;

  function handleDayClick(day: number) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelect(selectedDate === dateStr ? null : dateStr);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D5C0A9]/40 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goToPrev}
            disabled={isCurrentMonth}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#BC9579] hover:bg-[#F7E2CE] active:bg-[#D5C0A9] active:scale-90 disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm"
          >
            ‹
          </button>
          <span className="text-sm font-bold text-[#261D20] min-w-[120px] text-center">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={goToNext}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#BC9579] hover:bg-[#F7E2CE] active:bg-[#D5C0A9] active:scale-90 transition-all text-sm"
          >
            ›
          </button>
        </div>

        {selectedDate && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-[#96401F] hover:text-[#A53B0A] px-2 py-0.5 rounded-md hover:bg-[#FCF3E8] transition-all"
          >
            Reset
          </button>
        )}
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
          if (day === null) return <div key={`e-${idx}`} className="h-9" />;

          const isPast = isCurrentMonth && day < now.getDate();
          const isToday = isCurrentMonth && day === now.getDate();
          const isSelected = day === selectedDay;

          return (
            <div key={day} className="flex flex-col items-center py-0.5">
              <button
                type="button"
                onClick={() => handleDayClick(day)}
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
            </div>
          );
        })}
      </div>

    </div>
  );
}
