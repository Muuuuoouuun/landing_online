import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { ClassroomWall } from "../elements";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import { Chip, CopyLine, EASE_IN_OUT, Eyebrow, lerp, ramp, SceneShell, shadow } from "./kit";

// S7 사무실 없이 · S8 해소 · S9 로고

const HUB = { x: 960, y: 664 };
const PINS: { x: number; y: number; icon: IconName; label: string }[] = [
  { x: 360, y: 470, icon: "House", label: "강사 · 서울 자택" },
  { x: 300, y: 800, icon: "MapPin", label: "학생 · 부산" },
  { x: 680, y: 960, icon: "MapPin", label: "학생 · 제주" },
  { x: 1240, y: 960, icon: "House", label: "강사 · 대전" },
  { x: 1620, y: 800, icon: "Globe", label: "학생 · 뉴욕" },
  { x: 1560, y: 470, icon: "Wifi", label: "원장 · 어디서나" },
];

const Laptop: React.FC<{ p: number }> = ({ p }) => (
  <div
    style={{
      position: "absolute",
      left: HUB.x - 230,
      top: HUB.y - 150,
      width: 460,
      opacity: p,
      transform: `scale(${lerp(0.8, 1, p)})`,
    }}
  >
    <div
      style={{
        width: 460,
        height: 280,
        borderRadius: 18,
        border: `10px solid ${COLOR.ink}`,
        background: COLOR.surface,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        boxShadow: shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 700, color: COLOR.sub }}>
        <Icon name="LayoutDashboard" size={18} color={COLOR.limeInk} /> 기관 대시보드 · 수업 48
      </div>
      <ClassroomWall shown={1} checked={p} cell={42} />
    </div>
    <div style={{ width: 540, height: 20, marginLeft: -40, borderRadius: "0 0 14px 14px", background: COLOR.ink }} />
  </div>
);

export const S7Office: React.FC = () => {
  const s = sceneById("S7");
  const t = useCurrentFrame();
  const fold = ramp(t, 4, 14, EASE_IN_OUT);
  const laptop = ramp(t, 14, 14);
  return (
    <SceneShell from={s.from} duration={s.duration} enter={8} exit={8}>
      <div style={{ position: "absolute", top: 96, width: "100%", display: "flex", justifyContent: "center" }}>
        <Eyebrow text={s.eyebrow!} at={s.from + 2} />
      </div>
      <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[0]} />
      </div>
      <div style={{ position: "absolute", top: 204, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[1]} />
      </div>

      {/* 사무실이 접혀 사라진다 */}
      <div
        style={{
          position: "absolute",
          left: HUB.x - 160,
          top: HUB.y - 200,
          width: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scaleY(${1 - fold}) scaleX(${1 + fold * 0.15})`,
          transformOrigin: "50% 100%",
          opacity: 1 - fold,
        }}
      >
        <Icon name="Building" size={300} color={COLOR.sub} strokeWidth={1.2} />
        <span style={{ fontSize: 22, fontWeight: 700, color: COLOR.sub }}>사무실 · 임대 · 출근</span>
      </div>

      {/* 노트북 하나에 기관 전체, 어디서든 연결 */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        {PINS.map((pin, i) => {
          const p = ramp(t, 26 + i * 4, 10, EASE_IN_OUT);
          const x2 = lerp(HUB.x, pin.x, p);
          const y2 = lerp(HUB.y, pin.y, p);
          return (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={x2}
              y2={y2}
              stroke={COLOR.lime}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="2 14"
              strokeDashoffset={-t * 1.6}
              opacity={p > 0 ? 1 : 0}
            />
          );
        })}
      </svg>
      <Laptop p={laptop} />
      {PINS.map((pin, i) => {
        const p = ramp(t, 30 + i * 4, 10);
        return (
          <div
            key={pin.label}
            style={{
              position: "absolute",
              left: pin.x,
              top: pin.y,
              transform: `translate(-50%, -50%) scale(${lerp(0.6, 1, p)})`,
              opacity: p,
            }}
          >
            <Chip icon={pin.icon} label={pin.label} on size={22} style={{ boxShadow: shadow }} />
          </div>
        );
      })}
    </SceneShell>
  );
};

export const S8Seen: React.FC = () => {
  const s = sceneById("S8");
  const t = useCurrentFrame();
  return (
    <SceneShell from={s.from} duration={s.duration} enter={8} exit={6}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 0.22, transform: `scale(${lerp(1, 1.06, t / s.duration)})` }}>
        <ClassroomWall shown={1} checked={1} cell={120} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 462, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[0]} size={120} />
      </div>
    </SceneShell>
  );
};

const ORBIT: IconName[] = [
  "Presentation",
  "PenLine",
  "ListChecks",
  "Trophy",
  "CircleDot",
  "CirclePlay",
  "UserCheck",
  "LayoutDashboard",
  "Users",
  "Sparkles",
  "Gauge",
  "Laptop",
  "MessageCircle",
  "CalendarDays",
];

export const S9Lockup: React.FC = () => {
  const s = sceneById("S9");
  const t = useCurrentFrame();
  const [slogan, logo, tagline, cta] = s.cues;
  const pull = ramp(t, 0, 26, EASE_IN_OUT);
  const rise = ramp(t, 22, 12, EASE_IN_OUT);
  const hitT = logo.at - s.from;
  const pop = ramp(t, hitT, 10);
  const ring = ramp(t, hitT, 18);
  const ctaP = ramp(t, cta.at - s.from, 12);

  return (
    <SceneShell from={s.from} duration={s.duration} enter={6} exit={0}>
      {/* 영상에 나온 기능 아이콘이 전부 한 점으로 */}
      {ORBIT.map((name, i) => {
        const a = (i / ORBIT.length) * Math.PI * 2 + t * 0.05;
        const r = lerp(470, 0, pull);
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 960 + Math.cos(a) * r * 1.5 - 32,
              top: 540 + Math.sin(a) * r - 32,
              width: 64,
              height: 64,
              borderRadius: 32,
              background: COLOR.surface,
              border: `1.5px solid ${COLOR.line}`,
              boxShadow: shadow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 1 - ramp(t, 20, 6),
              transform: `scale(${lerp(1, 0.4, pull)})`,
            }}
          >
            <Icon name={name} size={32} color={i % 3 === 0 ? COLOR.limeInk : COLOR.ink} />
          </div>
        );
      })}

      <div style={{ position: "absolute", top: 470, width: "100%", textAlign: "center", transform: `translateY(${-rise * 210}px) scale(${lerp(1, 0.82, rise)})` }}>
        <CopyLine cue={slogan} size={112} />
      </div>

      {/* 로고 히트 */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: ring > 0 ? 1 - ring : 0 }}>
        <circle cx={960} cy={520} r={lerp(80, 700, ring)} fill="none" stroke={COLOR.lime} strokeWidth={lerp(14, 2, ring)} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 410,
          width: "100%",
          textAlign: "center",
          fontSize: 190,
          fontWeight: 900,
          letterSpacing: "-0.055em",
          lineHeight: 1,
          opacity: pop,
          transform: `scale(${lerp(1.25, 1, pop)})`,
        }}
      >
        {logo.text}
      </div>
      <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center" }}>
        <CopyLine cue={tagline} />
      </div>
      <div style={{ position: "absolute", top: 730, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 34px",
            borderRadius: 999,
            background: COLOR.lime,
            fontSize: 30,
            fontWeight: 800,
            opacity: ctaP,
            transform: `translateY(${(1 - ctaP) * 20}px)`,
          }}
        >
          {cta.text.split(" · ")[0]}
          <Icon name="ArrowRight" size={30} color={COLOR.ink} strokeWidth={2.6} />
          <span style={{ fontWeight: 600 }}>{cta.text.split(" · ")[1]}</span>
        </div>
      </div>
    </SceneShell>
  );
};
