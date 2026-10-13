import React from "react";
import { Composition } from "remotion";
import { Animatic } from "./Animatic";
import { ClassIn24 } from "./main/ClassIn24";
import { S2ShadeA, S2ShadeB } from "./sketch/S2Shade";
import { BOARD_DURATION, BOARD_HEIGHT, ElementBoard } from "./ElementBoard";
import { DURATION, FPS, HEIGHT, WIDTH } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ClassIn24"
      component={ClassIn24}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="Animatic"
      component={Animatic}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition id="SketchS2A" component={S2ShadeA} durationInFrames={60} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="SketchS2B" component={S2ShadeB} durationInFrames={60} fps={FPS} width={WIDTH} height={HEIGHT} />
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
