"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Gender = "boy" | "girl";

const HEADER = "Welcome! Let's get to know you";
const SUBTITLE = "We'll use this to personalise your experience.";
const SPEED = 35;

// Shows the GIF when playing; shows a canvas snapshot of frame 1 when paused.
function GifPlayer({
  src,
  alt,
  width,
  height,
  marginTop = 0,
  playing,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  marginTop?: number;
  playing: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw a mid-animation frame to canvas (delayed so the GIF advances past frame 1).
  useEffect(() => {
    const img = new Image();
    const draw = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = width;
      c.height = height;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const x = (width - drawW) / 2;
      const y = (height - drawH) / 2;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, drawW, drawH);
    };
    img.onload = () => {
      // Wait ~300 ms so the GIF advances past the first (larger) pose frame.
      setTimeout(draw, 300);
    };
    img.src = src;
  }, [src, width, height]);

  return (
    <div style={{ width, height, marginTop, position: "relative", flexShrink: 0 }}>
      {/* Animated GIF — mounted only when playing so it restarts fresh each time */}
      {playing && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}
      {/* Static first-frame canvas — visible when not playing */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          visibility: playing ? "hidden" : "visible",
        }}
      />
    </div>
  );
}

export function GenderStep() {
  const [displayHeader, setDisplayHeader] = useState("");
  const [displaySub, setDisplaySub] = useState("");
  const [phase, setPhase] = useState<"header" | "sub" | "done">("header");
  const [showCards, setShowCards] = useState(false);
  const [selected, setSelected] = useState<Gender | null>(null);
  const router = useRouter();

  useEffect(() => {
    let i = 0;
    const headerInterval = setInterval(() => {
      i++;
      setDisplayHeader(HEADER.slice(0, i));
      if (i >= HEADER.length) {
        clearInterval(headerInterval);
        setPhase("sub");
        let j = 0;
        const subInterval = setInterval(() => {
          j++;
          setDisplaySub(SUBTITLE.slice(0, j));
          if (j >= SUBTITLE.length) {
            clearInterval(subInterval);
            setPhase("done");
            setTimeout(() => setShowCards(true), 150);
          }
        }, SPEED);
      }
    }, SPEED);
    return () => clearInterval(headerInterval);
  }, []);

  function handleNext() {
    if (!selected) return;
    localStorage.setItem("onboarding_gender", selected);
    router.push("/onboarding-profile");
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-md">

      {/* Header with typewriter */}
      <div className="flex flex-col gap-2 text-center min-h-[72px]">
        <h1 className="text-3xl font-semibold tracking-tight text-[#96401F]">
          {displayHeader}
          {phase === "header" && <span className="animate-pulse">|</span>}
        </h1>
        <p className="text-[#896D5F] min-h-[24px]">
          {displaySub}
          {phase === "sub" && <span className="animate-pulse">|</span>}
        </p>
      </div>

      {/* Selection cards — fade in after typing completes */}
      <div
        className="flex gap-5 w-full transition-all duration-700"
        style={{ opacity: showCards ? 1 : 0, transform: showCards ? "translateY(0)" : "translateY(12px)" }}
      >
        {(["boy", "girl"] as Gender[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => showCards && setSelected(option)}
            className={[
              "flex-1 flex flex-col items-center justify-center gap-4 py-10 rounded-2xl border-2 transition-all active:scale-[.98]",
              selected === option
                ? "border-[#96401F] bg-[#96401F]/10 shadow-md"
                : "border-[#D5C0A9] bg-white hover:border-[#BC9579]",
            ].join(" ")}
          >
            <GifPlayer
              src={option === "boy" ? "/boyrun.gif" : "/girlrun.gif"}
              alt={option === "boy" ? "Boy" : "Girl"}
              width={option === "boy" ? 74 : 59}
              height={option === "boy" ? 84 : 66}
              marginTop={option === "girl" ? 3 : 0}
              playing={selected === option}
            />
            <span
              className={[
                "text-base font-semibold capitalize",
                selected === option ? "text-[#96401F]" : "text-[#584B46]",
              ].join(" ")}
            >
              {option === "boy" ? "Boy" : "Girl"}
            </span>
            {selected === option && (
              <span className="w-5 h-5 rounded-full bg-[#96401F] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Next button */}
      <div
        className="w-full transition-all duration-200"
        style={{ opacity: selected ? 1 : 0, transform: selected ? "translateY(0)" : "translateY(8px)", pointerEvents: selected ? "auto" : "none" }}
      >
        <button
          type="button"
          onClick={handleNext}
          className="h-11 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98]"
        >
          Next →
        </button>
      </div>

    </div>
  );
}
