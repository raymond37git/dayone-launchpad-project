"use client";

import { useEffect, useRef, useState } from "react";

type Dir = "down" | "left" | "right" | "up";

const OPPOSITE: Record<Dir, Dir> = { left: "right", right: "left", up: "down", down: "up" };
const DX: Record<Dir, number>    = { right: 1.5, left: -1.5, down: 0,   up: 0    };
const DY: Record<Dir, number>    = { right: 0,   left: 0,    down: 1.5, up: -1.5 };

const CYCLE      = [0, 1, 2, 1];
const IDLE_FRAME = 1;
const SCALE      = 2;
const SW         = 32 * SCALE;
const SH         = 32 * SCALE;
const TICK_MS    = 50;
const ANIM_EVERY = 4;
const LOOK_AHEAD = 14;
const NAV_H      = 56;

// Bounds use page coordinates. maxY is captured once at mount so the
// walking area stays fixed to the top of the page regardless of scroll.
function inBounds(x: number, y: number, maxY: number): boolean {
  return x >= 0 && y >= NAV_H && x + SW <= window.innerWidth && y + SH <= maxY;
}

function clearAhead(x: number, y: number, dir: Dir, maxY: number, dist = LOOK_AHEAD): boolean {
  for (let i = 1; i <= 3; i++) {
    const f = (i / 3) * dist;
    if (!inBounds(x + DX[dir] * f, y + DY[dir] * f, maxY)) return false;
  }
  return true;
}

function chooseTurn(blocked: Dir, x: number, y: number, maxY: number): Dir | null {
  const candidates: Dir[] = blocked === "up" || blocked === "down"
    ? ["left", "right", OPPOSITE[blocked]]
    : ["up", "down", OPPOSITE[blocked]];
  return candidates.find(d => clearAhead(x, y, d, maxY)) ?? null;
}

// ── Speech bubble ─────────────────────────────────────────────────────────────

function SpeechBubble({ text }: { text: string }) {
  return (
    <div style={{
      position: "absolute",
      bottom: SH + 8,
      left: "50%",
      transform: "translateX(-50%)",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      paddingBottom: 8,
    }}>
      <div style={{
        position: "relative",
        background: "white",
        border: "1.5px solid #D5C0A9",
        borderRadius: 10,
        padding: "6px 10px",
        fontSize: 11,
        color: "#584B46",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        lineHeight: 1.4,
        textAlign: "center",
        whiteSpace: "pre",
      }}>
        {text}
        <div style={{
          position: "absolute", bottom: -9, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
          borderTop: "8px solid #D5C0A9",
        }} />
        <div style={{
          position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
          borderTop: "7px solid white",
        }} />
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function WalkingSprite() {
  const [render, setRender] = useState({ x: -999, y: -999, dir: "down" as Dir, frame: IDLE_FRAME });
  const [hovered,  setHovered]  = useState(false);
  const [dragging, setDragging] = useState(false);
  const [postDrop, setPostDrop] = useState(false);
  const hoveredRef    = useRef(false);
  const draggingRef   = useRef(false);
  const dragOffset    = useRef({ x: 0, y: 0 });
  const postDropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const s = useRef({
    x: 0, y: 0,
    dir: "down" as Dir,
    cycleIdx: 0,
    tick: 0,
    pauseUntil: 0,
    pendingDir: "up" as Dir,
    nextHop: 60,
    hopDir: "right" as Dir,
    hopsLeft: 0,
  });

  useEffect(() => {
    // Capture the walking area height once — sprite is confined to this band
    // at the top of the page regardless of how far the user scrolls.
    const maxY = window.innerHeight;

    s.current.x = window.innerWidth  / 2 - SW / 2;
    s.current.y = maxY               / 2 - SH / 2;
    s.current.dir = Math.random() < 0.5 ? "down" : "up";
    s.current.pauseUntil = 20;
    s.current.pendingDir = s.current.dir;

    const interval = setInterval(() => {
      if (hoveredRef.current || draggingRef.current) return;

      const c = s.current;
      c.tick++;

      if (c.pauseUntil > 0) {
        if (c.tick < c.pauseUntil) {
          setRender({ x: Math.round(c.x), y: Math.round(c.y), dir: c.dir, frame: IDLE_FRAME });
          return;
        }
        c.dir        = c.pendingDir;
        c.pauseUntil = 0;
      }

      if (c.hopsLeft > 0) {
        c.hopsLeft--;
        if (!clearAhead(c.x, c.y, c.hopDir, maxY)) c.hopsLeft = 0;
        else c.dir = c.hopDir;
      } else if (c.tick >= c.nextHop) {
        c.hopDir   = Math.random() < 0.5 ? "left" : "right";
        c.hopsLeft = 10 + Math.floor(Math.random() * 20);
        c.nextHop  = c.tick + 50 + Math.floor(Math.random() * 60);
      }

      if (!clearAhead(c.x, c.y, c.dir, maxY)) {
        const turn = chooseTurn(c.dir, c.x, c.y, maxY);
        if (turn) { c.dir = turn; c.hopsLeft = 0; }
        else { c.pendingDir = OPPOSITE[c.dir]; c.pauseUntil = c.tick + 8; }
      }

      const nx = c.x + DX[c.dir];
      const ny = c.y + DY[c.dir];
      if (inBounds(nx, ny, maxY)) { c.x = nx; c.y = ny; }

      if (c.tick % ANIM_EVERY === 0) c.cycleIdx = (c.cycleIdx + 1) % CYCLE.length;

      setRender({ x: Math.round(c.x), y: Math.round(c.y), dir: c.dir, frame: CYCLE[c.cycleIdx] });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    draggingRef.current = true;
    setDragging(true);
    hoveredRef.current = false;
    setHovered(false);

    // Drag offset in page coordinates (clientY + scrollY)
    dragOffset.current = {
      x: e.clientX - s.current.x,
      y: e.clientY + window.scrollY - s.current.y,
    };

    function onMove(ev: MouseEvent) {
      const pageY = ev.clientY + window.scrollY;
      s.current.x = Math.max(0,      Math.min(ev.clientX - dragOffset.current.x, window.innerWidth - SW));
      s.current.y = Math.max(NAV_H,  Math.min(pageY      - dragOffset.current.y, window.innerHeight - SH));
      setRender(prev => ({ ...prev, x: Math.round(s.current.x), y: Math.round(s.current.y) }));
    }

    function onUp() {
      draggingRef.current = false;
      setDragging(false);
      s.current.pauseUntil = s.current.tick + 6;
      s.current.hopsLeft   = 0;
      setPostDrop(true);
      if (postDropTimer.current) clearTimeout(postDropTimer.current);
      postDropTimer.current = setTimeout(() => setPostDrop(false), 1500);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  }

  const isActive     = hovered || dragging;
  const displayDir   = isActive ? "down" : render.dir;
  const displayFrame = isActive ? 0      : render.frame;

  return (
    <div
      style={{
        position: "absolute",  // page-space: stays put when user scrolls
        left: render.x,
        top:  render.y,
        width:  SW,
        height: SH,
        zIndex: 45,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseEnter={() => { if (!draggingRef.current) { hoveredRef.current = true;  setHovered(true);  } }}
      onMouseLeave={() => { if (!draggingRef.current) { hoveredRef.current = false; setHovered(false); } }}
      onMouseDown={handleMouseDown}
    >
      {dragging && <SpeechBubble text="wheee!" />}
      {postDrop && !dragging && <SpeechBubble text="phew..." />}
      {hovered  && !dragging && !postDrop && (
        <SpeechBubble text={"hi! i'm ray, your AI assistant.\nhow can i help?"} />
      )}

      <div
        className={hovered && !dragging ? "sprite-float" : undefined}
        style={{
          width:  SW,
          height: SH,
          backgroundImage: `url(/sprites/walk_${displayDir}.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${displayFrame * SW}px 0px`,
          backgroundSize: `${96 * SCALE}px ${SH}px`,
          imageRendering: "pixelated",
          pointerEvents: "none",
          transform:  dragging ? "scale(1.15) translateY(-6px)" : undefined,
          filter:     dragging ? "drop-shadow(0 8px 12px rgba(0,0,0,0.30))" : undefined,
          transition: dragging ? "transform 0.15s ease, filter 0.15s ease" : undefined,
        }}
      />
    </div>
  );
}
