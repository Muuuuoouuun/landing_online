import React from "react";
import { Composition } from "remotion";
import { Animatic } from "./Animatic";
import { BOARD_DURATION, ElementBoard } from "./ElementBoard";
import { DURATION, FPS, HEIGHT, WIDTH } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Animatic"
      component={Animatic}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="ElementBoard"
      component={ElementBoard}
      durationInFrames={BOARD_DURATION}
      fps={FPS}
      width={WIDTH}
      height={1600}
    />
  </>
);
