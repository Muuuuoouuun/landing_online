import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { EngagementMeter } from "../elements";
import { Icon } from "../icons";
import { sceneById } from "../timeline";
import { CopyLine, EASE_IN_OUT, lerp, ramp, SceneShell } from "./kit";

// S1 고민 · S2 전환 — 회의 그리드 48칸 → 연두 마커로 지워 버린다.

const COLS = 8;
const ROWS = 6;
const TILE_W = 200;
const TILE_H = 112;
const GAP = 12;
const WALL_W = COLS * TILE_W + (COLS - 1) * GAP;
const WALL_H = ROWS * TILE_H + (ROWS - 1) * GAP;
const INITIALS = ["지", "민", "하", "서", "준", "윤", "도", "아", "예", "주", "시", "유"];

const MeetingTile: React.FC<{ i: number; p: number }> = ({ i, p }) => {
  const withFace = i % 5 === 1 || i % 7 === 3;
  return (
    <div
      style={{
        width: TILE_W,
        height: TILE_H,
        borderRadius: 10,
        background: COLOR.meeting,
        position: "relative",
        opacity: p,
        transform: `scale(${lerp(0.88, 1, p)})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {withFace ? (
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            background: "#C9CDC7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8E938C",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {INITIALS[i % INITIALS.length]}
        </div>
      ) : (
        <Icon name="VideoOff" size={30} color={COLOR.meetingIcon} strokeWidth={1.8} />
      )}
      <div style={{ position: "absolute", left: 10, bottom: 9, width: 54, height: 10, borderRadius: 5, background: "#CBCFC9" }} />
      <div style={{ position: "absolute", right: 9, bottom: 7 }}>
        <Icon name="MicOff" size={15} color={COLOR.meetingIcon} strokeWidth={2} />
      </div>
    </div>
  );
};

// 같은 크기의 칸 48개 — 선생님도 학생도 구분이 없는 회의 화면
const MeetingWall: React.FC<{ s1Local: number }> = ({ s1Local }) => (
  <div
    style={{
      position: "absolute",
      left: (1920 - WALL_W) / 2,
      top: (1080 - WALL_H) / 2,
      width: WALL_W,
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, ${TILE_W}px)`,
      gap: GAP,
    }}
  >
    {Array.from({ length: COLS * ROWS }, (_, i) => (
      <MeetingTile key={i} i={i} p={ramp(s1Local, ((i * 17) % 48) / 48 * 22, 8)} />
    ))}
  </div>
);

// 카피 뒤를 살짝 밝혀 가독성 확보
const Glow: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <AbsoluteFill
    style={{
      opacity,
      background: `radial-gradient(ellipse 46% 30% at 50% 50%, ${COLOR.paper}F5 0%, ${COLOR.paper}D9 45%, ${COLOR.paper}00 100%)`,
    }}
  />
);

export const S1Meeting: React.FC = () => {
  const s = sceneById("S1");
  const local = useCurrentFrame();
  const abs = local + s.from;
  const zoom = lerp(1, 1.04, ramp(local, 0, s.duration, EASE_IN_OUT));
  return (
    <SceneShell from={s.from} duration={s.duration} enter={0} exit={0}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <MeetingWall s1Local={local} />
      </AbsoluteFill>
      <Glow />
      <div style={{ position: "absolute", top: 392, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[0]} />
      </div>
      <div style={{ position: "absolute", top: 466, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[1]} size={124} />
      </div>
      <div style={{ position: "absolute", right: 128, bottom: 112, opacity: ramp(local, 16, 12) }}>
        <EngagementMeter level={0} frame={abs} width={250} />
      </div>
    </SceneShell>
  );
};

// 지그재그 마커 — 위에서 아래로 쓸어내리며 그리드를 지운다
const Scribble: React.FC<{ p: number }> = ({ p }) => {
  const edge = p * 106;
  const mask = `linear-gradient(180deg, #000 ${edge - 6}%, transparent ${edge}%)`;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: (1920 - WALL_W) / 2 - 40,
        top: (1080 - WALL_H) / 2 - 40,
        width: WALL_W + 80,
        height: WALL_H + 80,
        overflow: "visible",
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    >
      <path
        d="M3 4 L 97 2 L 2 16 L 98 13 L 3 29 L 97 26 L 2 42 L 98 39 L 3 55 L 97 52 L 2 68 L 98 65 L 3 81 L 97 78 L 4 95 L 96 93"
        fill="none"
        stroke={COLOR.lime}
        strokeWidth={84}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export const S2Wipe: React.FC = () => {
  const s = sceneById("S2");
  const local = useCurrentFrame();
  const fold = ramp(local, 12, 18, EASE_IN_OUT);
  return (
    <SceneShell from={s.from} duration={s.duration} enter={0} exit={6}>
      <AbsoluteFill
        style={{
          transform: `scale(${lerp(1.04, 0.62, fold)}) rotate(${lerp(0, -3, fold)}deg)`,
          opacity: 1 - ramp(local, 18, 12),
        }}
      >
        <MeetingWall s1Local={99} />
        <Scribble p={ramp(local, 0, 14, EASE_IN_OUT)} />
      </AbsoluteFill>
      <Glow opacity={1 - fold} />
      <div style={{ position: "absolute", top: 468, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[0]} size={112} />
      </div>
    </SceneShell>
  );
};
