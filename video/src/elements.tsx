import React from "react";
import { interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { COLOR } from "./brand";
import { MONO, SANS } from "./fonts";
import { Icon, IconName } from "./icons";

// 장점 표현 장치 (밝은 테마). 전부 progress(0→1) 하나로 움직이고, 1이면 완성 상태.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const card: React.CSSProperties = {
  background: COLOR.surface,
  border: `1px solid ${COLOR.line}`,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(21,24,28,0.06)",
  fontFamily: SANS,
  color: COLOR.ink,
};

// S1→S2 회의 그리드. scribble 0→1로 연두 마커가 그리드를 지워 버린다.
export const MeetingGrid: React.FC<{ scribble: number; cols?: number; rows?: number; cell?: number }> = ({
  scribble,
  cols = 6,
  rows = 4,
  cell = 64,
}) => (
  <div style={{ position: "relative", alignSelf: "flex-start" }}>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 6 }}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <div
          key={i}
          style={{
            height: (cell * 9) / 16,
            borderRadius: 6,
            background: COLOR.meeting,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: 4,
          }}
        >
          <Icon name={i % 3 === 0 ? "MicOff" : "VideoOff"} size={cell * 0.2} color={COLOR.meetingIcon} strokeWidth={2} />
        </div>
      ))}
    </div>
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: "-4%",
        top: "-8%",
        width: "108%",
        height: "116%",
        overflow: "visible",
        WebkitMaskImage: `linear-gradient(180deg, #000 ${scribble * 104 - 4}%, transparent ${scribble * 104}%)`,
        maskImage: `linear-gradient(180deg, #000 ${scribble * 104 - 4}%, transparent ${scribble * 104}%)`,
      }}
    >
      <path
        d="M4 6 L 96 3 L 3 24 L 97 20 L 4 43 L 95 39 L 3 62 L 97 58 L 4 81 L 96 77 L 5 97 L 95 95"
        fill="none"
        stroke={COLOR.lime}
        strokeWidth={cell * 0.38}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.9}
      />
    </svg>
  </div>
);

// 참여도 미터 — level 0이면 평평한 선, 1이면 살아 있는 파형
export const EngagementMeter: React.FC<{ level: number; frame: number; width?: number }> = ({ level, frame, width = 300 }) => {
  const bars = 18;
  const live = level > 0.05;
  return (
    <div style={{ ...card, padding: "16px 20px", width }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, color: COLOR.sub, marginBottom: 12 }}>
        <Icon name="Activity" size={22} color={live ? COLOR.limeInk : COLOR.sub} />
        참여도
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64 }}>
        {Array.from({ length: bars }, (_, i) => {
          const wiggle = (noise2D("meter", i * 0.35, frame * 0.06) + 1) / 2;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3 + level * (14 + wiggle * 50),
                borderRadius: 3,
                background: live ? COLOR.lime : COLOR.line,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// 상호작용 칩 — S3에서 동사가 나올 때마다 하나씩 연두로 점등
const INTERACTIONS: { icon: IconName; label: string }[] = [
  { icon: "Presentation", label: "무대" },
  { icon: "PenLine", label: "판서" },
  { icon: "ListChecks", label: "퀴즈" },
  { icon: "Trophy", label: "트로피" },
];
export const InteractionChips: React.FC<{ lit: number }> = ({ lit }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {INTERACTIONS.map((c, i) => {
      const on = lit > i;
      return (
        <div
          key={c.label}
          style={{
            ...card,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            fontSize: 20,
            fontWeight: 600,
            background: on ? COLOR.limeSoft : COLOR.surface,
            borderColor: on ? COLOR.lime : COLOR.line,
            color: on ? COLOR.ink : COLOR.sub,
            boxShadow: "none",
          }}
        >
          <Icon name={c.icon} size={24} color={on ? COLOR.limeInk : COLOR.sub} />
          {c.label}
        </div>
      );
    })}
  </div>
);

// 자동 녹화 체크 배지
export const CheckBadge: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ ...card, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 12, width: 340 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20 }}>
      <Icon name="CircleDot" size={24} color={COLOR.limeInk} />
      <span>녹화 버튼</span>
      <b style={{ marginLeft: "auto", fontFamily: MONO, color: COLOR.limeInk }}>0번</b>
    </div>
    <div style={{ display: "flex", gap: 18, fontSize: 20 }}>
      {["판서", "화면", "음성"].map((t, i) => (
        <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="Check" size={22} color={COLOR.limeInk} strokeWidth={2.5} progress={interpolate(progress, [i * 0.2, i * 0.2 + 0.5], [0, 1], clamp)} />
          {t}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: COLOR.sub }}>
      <Icon name="CloudCheck" size={20} color={COLOR.sub} /> 수업 종료와 동시에 자동 저장
    </div>
  </div>
);

// KPI 칩
export const KpiChip: React.FC<{ icon: IconName; label: string; value: number; suffix?: string; decimals?: number; progress: number }> = ({
  icon,
  label,
  value,
  suffix = "",
  decimals = 0,
  progress,
}) => (
  <div style={{ ...card, display: "flex", alignItems: "center", gap: 14, padding: "12px 18px" }}>
    <div style={{ width: 44, height: 44, borderRadius: 12, background: COLOR.limeSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={icon} size={26} color={COLOR.limeInk} progress={progress} />
    </div>
    <div>
      <div style={{ fontSize: 15, color: COLOR.sub }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
        {(value * progress).toFixed(decimals)}
        {suffix}
      </div>
    </div>
  </div>
);

// 48칸 교실 월 — checked 0→1로 칸마다 연두 체크가 채워진다 (S6 스캔 · S7 해소)
export const ClassroomWall: React.FC<{ shown: number; checked: number; cell?: number }> = ({ shown, checked, cell = 30 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(8, ${cell}px)`, gap: 5 }}>
    {Array.from({ length: 48 }, (_, i) => {
      const appear = interpolate(shown, [i / 60, i / 60 + 0.2], [0, 1], clamp);
      const done = interpolate(checked, [i / 60, i / 60 + 0.15], [0, 1], clamp);
      return (
        <div
          key={i}
          style={{
            height: (cell * 9) / 16 + 2,
            borderRadius: 4,
            background: done > 0.5 ? COLOR.limeSoft : COLOR.surface,
            border: `1px solid ${done > 0.5 ? COLOR.lime : COLOR.line}`,
            opacity: appear,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="Check" size={cell * 0.45} color={COLOR.limeInk} strokeWidth={3} progress={done} />
        </div>
      );
    })}
  </div>
);

// AI 강의 평가 점수 — 링 + 숫자 카운트업 (점수는 기본 폰트. 손글씨는 카피 강조에만 쓴다)
export const ScoreRing: React.FC<{ score: number; progress: number; size?: number; label?: boolean }> = ({
  score,
  progress,
  size = 200,
  label = true,
}) => {
  const r = 80;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: SANS }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg viewBox="0 0 200 200" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx="100" cy="100" r={r} fill="none" stroke={COLOR.line} strokeWidth={12} />
          <circle
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={COLOR.lime}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - (score / 100) * progress)}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: size * 0.32, fontWeight: 900, color: COLOR.ink, lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
            {Math.round(score * progress)}
          </div>
          <div style={{ fontSize: size * 0.07, color: COLOR.sub, marginTop: 4 }}>/ 100</div>
        </div>
      </div>
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 18, color: COLOR.sub }}>
          <Icon name="Sparkles" size={20} color={COLOR.limeInk} /> AI 강의 평가
        </div>
      )}
    </div>
  );
};

// AI 강의 평가 레이더 5축
export const RADAR_AXES = ["상호작용", "학생 발화", "참여도", "판서 활용", "피드백"];
export const RadarChart: React.FC<{ values: number[]; progress: number; size?: number }> = ({ values, progress, size = 260 }) => {
  const cx = 130;
  const cy = 130;
  const R = 82;
  const pt = (i: number, k: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / RADAR_AXES.length;
    return [cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k] as const;
  };
  const poly = (k: (i: number) => number) => RADAR_AXES.map((_, i) => pt(i, k(i)).join(",")).join(" ");
  return (
    <svg viewBox="0 0 260 260" width={size} height={size} style={{ fontFamily: SANS }}>
      {[0.33, 0.66, 1].map((k) => (
        <polygon key={k} points={poly(() => k)} fill="none" stroke={COLOR.line} />
      ))}
      {RADAR_AXES.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={COLOR.line} />;
      })}
      <polygon points={poly((i) => values[i] * progress)} fill={`${COLOR.lime}66`} stroke={COLOR.limeInk} strokeWidth={2.5} />
      {RADAR_AXES.map((label, i) => {
        const [x, y] = pt(i, 1.28);
        return (
          <text key={label} x={x} y={y} fill={COLOR.sub} fontSize={14} textAnchor="middle" dominantBaseline="middle">
            {label}
          </text>
        );
      })}
    </svg>
  );
};

// 관리 효율 비교 카운터 — 원장님이 직접 본 수업 0 · AI가 평가한 수업 48
export const CompareCounter: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ ...card, display: "flex", padding: "18px 24px", gap: 28 }}>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.sub }}>
        <Icon name="Eye" size={20} color={COLOR.sub} /> 원장님이 직접 본 수업
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: COLOR.sub, fontVariantNumeric: "tabular-nums" }}>0</div>
    </div>
    <div style={{ width: 1, background: COLOR.line }} />
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.ink }}>
        <Icon name="ClipboardCheck" size={20} color={COLOR.limeInk} /> AI가 평가한 수업
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: COLOR.limeInk, fontVariantNumeric: "tabular-nums" }}>
        {Math.round(48 * progress)}
      </div>
    </div>
  </div>
);
