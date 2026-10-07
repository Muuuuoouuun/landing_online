import React from "react";
import { interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { COLOR } from "./brand";
import { MONO, SANS } from "./fonts";
import { Icon, IconName } from "./icons";

// 장점 표현 장치 + 히어로 오브젝트. 전부 progress(0→1) 하나로 움직이고, 1이면 완성 상태.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const card: React.CSSProperties = {
  background: "rgba(242,239,232,0.04)",
  border: "1px solid rgba(242,239,232,0.10)",
  borderRadius: 16,
  fontFamily: SANS,
  color: COLOR.cream,
};

// 히어로 오브젝트 — 민준 타일. on 0(회의 화면, 카메라 꺼짐) → 1(카메라 켜짐)
export const StudentTile: React.FC<{
  name?: string;
  on?: number;
  width?: number;
  highlight?: boolean;
}> = ({ name = "민준", on = 0, width = 320, highlight = false }) => {
  const h = (width * 9) / 16;
  return (
    <div
      style={{
        position: "relative",
        width,
        height: h,
        borderRadius: 14,
        overflow: "hidden",
        background: COLOR.meetingGray,
        boxShadow: highlight ? `0 0 0 3px ${COLOR.coral}, 0 0 40px ${COLOR.coral}66` : undefined,
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: on,
          background: `radial-gradient(120% 90% at 30% 20%, #F2B48C 0%, ${COLOR.coral} 35%, ${COLOR.emerald} 100%)`,
        }}
      >
        <svg viewBox="0 0 160 90" width="100%" height="100%">
          <circle cx="80" cy="38" r="16" fill={COLOR.cream} opacity={0.85} />
          <path d="M44 90 C48 64 62 58 80 58 C98 58 112 64 116 90 Z" fill={COLOR.cream} opacity={0.85} />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - on,
        }}
      >
        <div
          style={{
            width: h * 0.42,
            height: h * 0.42,
            borderRadius: "50%",
            background: "#3A3F45",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLOR.muted,
            fontSize: h * 0.13,
            fontWeight: 600,
          }}
        >
          {name}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: h * 0.1,
          color: COLOR.cream,
        }}
      >
        <span style={{ background: "rgba(11,15,20,0.55)", padding: "2px 8px", borderRadius: 6 }}>{name}</span>
        <span style={{ display: "flex", gap: 6, background: "rgba(11,15,20,0.55)", padding: 4, borderRadius: 6 }}>
          <Icon name={on > 0.5 ? "Mic" : "MicOff"} size={h * 0.12} color={on > 0.5 ? COLOR.cream : COLOR.coral} strokeWidth={2} />
          <Icon name={on > 0.5 ? "Video" : "VideoOff"} size={h * 0.12} color={on > 0.5 ? COLOR.cream : COLOR.coral} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
};

// 참여도 미터 — level 0이면 평평한 선(S1), 1이면 살아 있는 파형(S3·S7)
export const EngagementMeter: React.FC<{ level: number; frame: number; width?: number }> = ({
  level,
  frame,
  width = 360,
}) => {
  const bars = 18;
  return (
    <div style={{ ...card, padding: "16px 20px", width }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, color: COLOR.muted, marginBottom: 12 }}>
        <Icon name="Activity" size={22} color={level > 0.05 ? COLOR.coral : COLOR.muted} />
        참여도
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64 }}>
        {Array.from({ length: bars }, (_, i) => {
          const wiggle = (noise2D("meter", i * 0.35, frame * 0.06) + 1) / 2;
          const hgt = 3 + level * (14 + wiggle * 50);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: hgt,
                borderRadius: 3,
                background: level > 0.05 ? COLOR.coral : COLOR.muted,
                opacity: level > 0.05 ? 0.55 + wiggle * 0.45 : 0.4,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// '회의' 취소선 → '수업'
export const StrikeBadge: React.FC<{ progress: number }> = ({ progress }) => {
  const strike = interpolate(progress, [0, 0.5], [0, 1], clamp);
  const reveal = interpolate(progress, [0.4, 1], [0, 1], clamp);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: SANS, fontWeight: 900, fontSize: 64 }}>
      <span style={{ position: "relative", color: COLOR.muted }}>
        회의
        <span
          style={{
            position: "absolute",
            left: -6,
            top: "52%",
            height: 7,
            width: `calc(${strike * 100}% + 12px)`,
            background: COLOR.coral,
            borderRadius: 4,
          }}
        />
      </span>
      <Icon name="ArrowRight" size={44} color={COLOR.muted} progress={reveal} strokeWidth={2.5} />
      <span style={{ color: COLOR.coral, opacity: reveal, transform: `scale(${interpolate(reveal, [0, 1], [1.4, 1])})` }}>
        수업
      </span>
    </div>
  );
};

// 상호작용 칩 — S3에서 하나씩 점등
const INTERACTIONS: { icon: IconName; label: string }[] = [
  { icon: "Hand", label: "무대" },
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
            background: on ? COLOR.emerald : card.background,
            borderColor: on ? COLOR.emeraldLight : "rgba(242,239,232,0.10)",
            color: on ? COLOR.cream : COLOR.muted,
          }}
        >
          <Icon name={c.icon} size={24} color={on ? COLOR.cream : COLOR.muted} />
          {c.label}
        </div>
      );
    })}
  </div>
);

// 자동 녹화 체크 배지
export const CheckBadge: React.FC<{ progress: number }> = ({ progress }) => {
  const items = ["판서", "화면", "음성"];
  return (
    <div style={{ ...card, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20 }}>
        <Icon name="CircleDot" size={24} color={COLOR.coral} />
        <span>녹화 버튼</span>
        <b style={{ marginLeft: "auto", fontFamily: MONO, color: COLOR.coral }}>0번</b>
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: 20, color: COLOR.cream }}>
        {items.map((t, i) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="Check" size={22} color={COLOR.coral} strokeWidth={2.5} progress={interpolate(progress, [i * 0.2, i * 0.2 + 0.5], [0, 1], clamp)} />
            {t}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: COLOR.muted }}>
        <Icon name="CloudCheck" size={20} color={COLOR.muted} /> 수업 종료와 동시에 자동 저장
      </div>
    </div>
  );
};

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
    <div style={{ width: 44, height: 44, borderRadius: 12, background: COLOR.emerald, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={icon} size={26} progress={progress} />
    </div>
    <div>
      <div style={{ fontSize: 15, color: COLOR.muted }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
        {(value * interpolate(progress, [0, 1], [0, 1], clamp)).toFixed(decimals)}
        {suffix}
      </div>
    </div>
  </div>
);

// 48 → 1 수렴 (교실 월)
export const ClassroomWall: React.FC<{ progress: number; cell?: number }> = ({ progress, cell = 26 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(8, ${cell}px)`, gap: 4 }}>
      {Array.from({ length: 48 }, (_, i) => {
        const shown = interpolate(progress, [i / 60, i / 60 + 0.2], [0, 1], clamp);
        const mine = i === 19;
        return (
          <div
            key={i}
            style={{
              height: (cell * 9) / 16,
              borderRadius: 3,
              background: mine ? COLOR.coral : COLOR.emerald,
              opacity: shown,
              boxShadow: mine ? `0 0 0 2px ${COLOR.cream}` : undefined,
            }}
          />
        );
      })}
    </div>
    <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 56, color: COLOR.cream, whiteSpace: "nowrap" }}>
      48 <span style={{ color: COLOR.muted }}>→</span> <span style={{ color: COLOR.coral }}>1</span>
      <div style={{ fontSize: 18, fontWeight: 500, color: COLOR.muted }}>교실 48개, 화면 1개</div>
    </div>
  </div>
);

// AI 강의 평가 점수 링
export const ScoreRing: React.FC<{ score: number; progress: number; size?: number }> = ({ score, progress, size = 200 }) => {
  const r = 80;
  const c = 2 * Math.PI * r;
  const shown = score * progress;
  return (
    <div style={{ position: "relative", width: size, height: size, fontFamily: SANS }}>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(242,239,232,0.10)" strokeWidth={14} />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={COLOR.coral}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.3, fontWeight: 900, color: COLOR.cream, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {Math.round(shown)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: size * 0.075, color: COLOR.muted, marginTop: 6 }}>
          <Icon name="Sparkles" size={size * 0.09} color={COLOR.coral} /> AI 강의 평가
        </div>
      </div>
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
        <polygon key={k} points={poly(() => k)} fill="none" stroke="rgba(242,239,232,0.12)" />
      ))}
      {RADAR_AXES.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(242,239,232,0.12)" />;
      })}
      <polygon points={poly((i) => values[i] * progress)} fill={`${COLOR.coral}55`} stroke={COLOR.coral} strokeWidth={2.5} />
      {RADAR_AXES.map((label, i) => {
        const [x, y] = pt(i, 1.28);
        return (
          <text key={label} x={x} y={y} fill={COLOR.muted} fontSize={14} textAnchor="middle" dominantBaseline="middle">
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
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.muted }}>
        <Icon name="Eye" size={20} color={COLOR.muted} /> 원장님이 직접 본 수업
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: COLOR.muted, fontVariantNumeric: "tabular-nums" }}>0</div>
    </div>
    <div style={{ width: 1, background: "rgba(242,239,232,0.12)" }} />
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.cream }}>
        <Icon name="ClipboardCheck" size={20} color={COLOR.coral} /> AI가 평가한 수업
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: COLOR.coral, fontVariantNumeric: "tabular-nums" }}>
        {Math.round(48 * progress)}
      </div>
    </div>
  </div>
);
