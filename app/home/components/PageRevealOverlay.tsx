"use client";

import { useEffect, useRef } from "react";

export function PageRevealOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Force a reflow so the browser registers opacity:1 before transitioning
    el.getBoundingClientRect();
    el.style.opacity = "0";
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] bg-[#FCF3E8] pointer-events-none flex items-center justify-center"
      style={{ opacity: 1, transition: "opacity 4.5s ease" }}
    >
      <p className="text-[34px] font-semibold text-[#96401F] tracking-tight text-center px-8 italic">
        Your adventure starts here...
      </p>
    </div>
  );
}
