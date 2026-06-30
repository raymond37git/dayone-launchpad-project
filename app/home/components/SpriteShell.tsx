"use client";

import { useState } from "react";
import { TopNavBar } from "./TopNavBar";
import { WalkingSprite } from "./WalkingSprite";
import { RobotSprite } from "./RobotSprite";

interface Props {
  avatarUrl: string | null;
}

export function SpriteShell({ avatarUrl }: Props) {
  const [spriteOn, setSpriteOn] = useState(true);

  return (
    <>
      <TopNavBar
        avatarUrl={avatarUrl}
        spriteOn={spriteOn}
        onToggleSprite={() => setSpriteOn((v) => !v)}
      />
      {spriteOn && <WalkingSprite />}
      {spriteOn && <RobotSprite />}
    </>
  );
}
