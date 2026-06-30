"use client";

import { useEffect, useRef, useState } from "react";

type Dir = "left" | "right";

const DX: Record<Dir, number> = { right: 1.2, left: -1.2 };

const FRAMES     = 8;
const FRAME_W    = 80;
const FRAME_H    = 90;
const SCALE      = 0.9;
const SW         = Math.round(FRAME_W * SCALE);  // 48
const SH         = Math.round(FRAME_H * SCALE);  // 54
const TICK_MS    = 60;
const ANIM_EVERY = 3;
const BOTTOM_PAD = 8;

const SOUNDS = [
  "beep boop*",
  "whirr...*",
  "bzzt!*",
  "click clack*",
  "vrrrm...*",
  "ping!*",
  "zap zap*",
  "hmm...*",
  "brrr*",
  "clunk!*",
  "bleep*",
  "whzzz...*",
];


export function RobotSprite() {
  const [render, setRender] = useState({ x: -999, y: -999, dir: "right" as Dir, frame: 0 });
  const [sound, setSound]   = useState<string | null>(null);

  const s = useRef({
    x: 0,
    dir: "right" as Dir,
    frameIdx: 0,
    tick: 0,
    dirSince: 0,
    nextFlip: 80,
    nextSound: 0, // tick to show next sound
  });

  useEffect(() => {
    s.current.x = window.innerWidth / 2 - SW / 2;
    s.current.dir = Math.random() < 0.5 ? "left" : "right";
    // First sound after 6-15 seconds
    s.current.nextSound = Math.floor((6000 + Math.random() * 9000) / TICK_MS);

    const interval = setInterval(() => {
      const c = s.current;
      c.tick++;

      // Random sound every 6-15 seconds
      if (c.tick >= c.nextSound) {
        const text = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
        setSound(text);
        setTimeout(() => setSound(null), 2500);
        c.nextSound = c.tick + Math.floor((6000 + Math.random() * 9000) / TICK_MS);
      }

      // Move horizontally
      const nx = c.x + DX[c.dir];

      if (nx >= 0 && nx + SW <= window.innerWidth) {
        c.x = nx;

        // Spontaneous direction flip (every 3-8 seconds, after 30 tick commit)
        if (c.tick >= c.nextFlip && c.tick - c.dirSince >= 30) {
          c.dir    = c.dir === "left" ? "right" : "left";
          c.dirSince = c.tick;
          c.nextFlip = c.tick + Math.floor((3000 + Math.random() * 5000) / TICK_MS);
        }
      } else {
        // Hit edge — reverse
        c.dir      = c.dir === "left" ? "right" : "left";
        c.dirSince  = c.tick;
        c.nextFlip = c.tick + 30;
      }

      if (c.tick % ANIM_EVERY === 0) {
        c.frameIdx = (c.frameIdx + 1) % FRAMES;
      }

      setRender({ x: Math.round(c.x), y: 0, dir: c.dir, frame: c.frameIdx }); // y unused; bottom CSS handles it
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",   // page-space: scrolls with content, visible at page bottom
        left:   render.x,
        bottom: BOTTOM_PAD,     // CSS bottom — no scrollHeight reading, no feedback loop
        width:  SW,
        height: SH,
        zIndex: 44,
        pointerEvents: "none",
      }}
    >
      {/* Random sound bubble */}
      {sound && (
        <div style={{
          position: "absolute",
          bottom: SH + 6,
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}>
          <div style={{
            position: "relative",
            background: "white",
            border: "1.5px solid #D5C0A9",
            borderRadius: 10,
            padding: "4px 8px",
            fontSize: 10,
            color: "#584B46",
            boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
            lineHeight: 1.4,
          }}>
            {sound}
            <div style={{
              position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
              borderTop: "7px solid #D5C0A9",
            }} />
            <div style={{
              position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
              borderTop: "6px solid white",
            }} />
          </div>
        </div>
      )}

      {/* Sprite */}
      <div style={{
        width:  SW,
        height: SH,
        backgroundImage:    `url(/sprites/robot_${render.dir}.png)`,
        backgroundRepeat:   "no-repeat",
        backgroundPosition: `-${render.frame * SW}px 0px`,
        backgroundSize:     `${FRAMES * SW}px ${SH}px`,
        imageRendering:     "pixelated",
      }} />
    </div>
  );
}
