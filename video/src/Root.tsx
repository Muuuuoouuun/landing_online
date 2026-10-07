import React from "react";
import { Composition } from "remotion";
import { Animatic } from "./Animatic";
import { BOARD_DURATION, BOARD_HEIGHT, ElementBoard } from "./ElementBoard";
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
      height={BOARD_HEIGHT}
    />
  </>
);
