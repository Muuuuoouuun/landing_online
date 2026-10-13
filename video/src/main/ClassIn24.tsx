import React from "react";
import { AbsoluteFill, getStaticFiles, Html5Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { MASTER, musicVolume, SCENES, SFX, SFX_VOLUME } from "../timeline";
import { Checklist } from "./Checklist";
import { S4Class, S5Record } from "./Classroom";
import { S3Declare } from "./Declare";
import { S8Office, S9End } from "./Finale";
import { S6Manage, S7AI } from "./Manage";
import { S1Meeting, S2Wipe } from "./Meeting";
import { Paper, ramp } from "./kit";

// 본편 24초. 씬 타이밍·카피·효과음은 전부 timeline.ts에서 온다.
// 장면을 Sequence로 자르지 않고 겹쳐 그린다 — 각 장면은 끝난 뒤에도 tail 프레임 동안 남아
// 카피를 위로 밀어내고(스크롤), 화면 요소는 다음 장면에 넘겨준다(모프·팬·줌). 빈 화면으로 빠지는 페이드는 없다.

const STAGE: Record<string, { C: React.FC<{ t: number }>; tail: number }> = {
  S1: { C: S1Meeting, tail: 0 }, // S2가 S1 화면을 그대로 이어받아 지운다
  S2: { C: S2Wipe, tail: 14 },
  S3: { C: S3Declare, tail: 14 },
  S4: { C: S4Class, tail: 14 },
  S5: { C: S5Record, tail: 20 }, // 카메라 팬
  S6: { C: S6Manage, tail: 14 },
  S7: { C: S7AI, tail: 0 }, // S8이 S7 화면을 통째로 노트북 속으로 넣는다
  S8: { C: S8Office, tail: 16 },
  S9: { C: S9End, tail: 0 },
};

// BGM: public/music/bed.mp3 (scripts/make-bgm.py). 다른 곡으로 바꾸려면 같은 이름으로 넣으면 된다.
const MUSIC = getStaticFiles().find((f) => /^music\/bed\.(mp3|wav)$/.test(f.name));

export const ClassIn24: React.FC = () => {
  const frame = useCurrentFrame();
  // 회의 화면(S1)은 살짝 회색, 마커가 지나가면 밝은 종이로
  const tint = 1 - ramp(frame, 78, 24);
  return (
    <AbsoluteFill>
      <Paper tint={tint} />
      {SCENES.map((s) => {
        const { C, tail } = STAGE[s.id];
        const t = frame - s.from;
        if (t < 0 || t >= s.duration + tail) return null;
        return <C key={s.id} t={t} />;
      })}
      <Checklist />
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.at} durationInFrames={40} layout="none" name={`sfx ${s.name}`}>
          <Html5Audio src={staticFile(`sfx/${s.name}.wav`)} volume={MASTER * SFX_VOLUME[s.name]} />
        </Sequence>
      ))}
      {MUSIC && <Html5Audio src={staticFile(MUSIC.name)} volume={musicVolume} />}
    </AbsoluteFill>
  );
};
