"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SNAIL_SIZE = 64;
const SPEED = 0.4; // px per frame — snail slow
const EDGE_PADDING = 16;

export function CrawlingSnail() {
  const [x, setX] = useState(EDGE_PADDING);
  const directionRef = useRef(1); // 1 = right, -1 = left
  const xRef = useRef(EDGE_PADDING);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function tick() {
      const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
      const maxX = containerWidth - SNAIL_SIZE - EDGE_PADDING;

      xRef.current += SPEED * directionRef.current;

      if (xRef.current >= maxX) {
        xRef.current = maxX;
        directionRef.current = -1;
      } else if (xRef.current <= EDGE_PADDING) {
        xRef.current = EDGE_PADDING;
        directionRef.current = 1;
      }

      setX(xRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const facingLeft = directionRef.current === -1;

  return (
    <div ref={containerRef} className="relative w-full h-16 pointer-events-none select-none">
      <div
        className="absolute bottom-0"
        style={{ left: x, transition: "none" }}
      >
        {/* Bob up/down via CSS animation */}
        <div className="animate-snail-bob">
          <Image
            src="/snail.png"
            alt="snail"
            width={SNAIL_SIZE}
            height={SNAIL_SIZE}
            className="pixelated"
            style={{
              transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
              transition: "transform 0.1s",
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>
    </div>
  );
}
