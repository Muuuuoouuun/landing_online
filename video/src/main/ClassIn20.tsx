import React from "react";
import { AbsoluteFill, getStaticFiles, Html5Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SCENES, SFX, SFX_VOLUME } from "../timeline";
import { S3Classroom, S4Data } from "./Classroom";
import { S1Meeting, S2Wipe } from "./Meeting";
import { S5Manage, S6AI } from "./Manage";
import { S7Office, S8Seen, S9Lockup } from "./Finale";
import { Paper, ramp } from "./kit";

// 본편 20초. 씬 타이밍·카피·효과음은 전부 timeline.ts에서 온다.

const SCENE_COMPONENTS: Record<string, React.FC> = {
  S1: S1Meeting,
  S2: S2Wipe,
  S3: S3Classroom,
  S4: S4Data,
  S5: S5Manage,
  S6: S6AI,
  S7: S7Office,
  S8: S8Seen,
  S9: S9Lockup,
};

// public/music/bed.(mp3|wav)를 넣으면 깔린다. 손글씨 소리가 주인공이라 음악은 낮게.
const MUSIC = getStaticFiles().find((f) => /^music\/bed\.(mp3|wav)$/.test(f.name));

export const ClassIn20: React.FC = () => {
  const frame = useCurrentFrame();
  // 회의 화면(S1)은 살짝 회색, 마커가 지나가면 밝은 종이로
  const tint = 1 - ramp(frame, 62, 24);
  return (
    <AbsoluteFill>
      <Paper tint={tint} />
      {SCENES.map((s) => {
        const Scene = SCENE_COMPONENTS[s.id];
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={`${s.id} ${s.title}`}>
            <Scene />
          </Sequence>
        );
      })}
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.at} durationInFrames={30} layout="none" name={`sfx ${s.name}`}>
          <Html5Audio src={staticFile(`sfx/${s.name}.wav`)} volume={SFX_VOLUME[s.name]} />
        </Sequence>
      ))}
      {MUSIC && <Html5Audio src={staticFile(MUSIC.name)} volume={0.35} />}
    </AbsoluteFill>
  );
};
