import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { MONO, SANS } from "../fonts";
import { emphasisTiming, HandWord, Mark, MARK_FRAMES, MarkKind, parseEmphasis } from "../hand";
import { Icon, IconName } from "../icons";
import { Cue, CueStyle } from "../timeline";

// 본편 공통 키트 — 이징 · 씬 셸 · 키네틱 카피 · 작은 UI 부품.

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

export const ramp = (frame: number, start: number, len: number, easing = EASE_OUT) =>
  interpolate(frame, [start, start + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// v6: 씬을 Sequence로 자르지 않고 전역 프레임에서 겹쳐 그린다(전환 동안 앞뒤 장면이 함께 보임).
// 카피는 timeline의 절대 프레임을 쓰므로 그대로 전역 프레임을 읽는다.
export const useAbsFrame = () => useCurrentFrame();

// 장면 하나의 레이어 — 페이드 없이, 전환은 각 장면이 직접 그린다.
export const Layer: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ fontFamily: SANS, color: COLOR.ink, ...style }}>{children}</AbsoluteFill>
);

// 카피 스크롤 — 다음 장면이 시작되면 이전 카피는 위로 밀려나며 흐려진다.
export const COPY_OUT = 12;
// 카메라 팬 길이 (S5 → S6)
export const PAN = 18;

export const Paper: React.FC<{ tint?: number }> = ({ tint = 0 }) => (
  <AbsoluteFill
    style={{
      background: interpolateColor(COLOR.paper, "#E9EAE6", tint),
      backgroundImage: `linear-gradient(${COLOR.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLOR.grid} 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
    }}
  />
);

function interpolateColor(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], t))).join(",")})`;
}

// ── 키네틱 카피 ───────────────────────────────────────────────

export const COPY: Record<CueStyle, { size: number; css: React.CSSProperties }> = {
  lead: { size: 66, css: { fontWeight: 800, color: COLOR.ink, letterSpacing: "-0.03em" } },
  story: { size: 50, css: { fontWeight: 600, color: COLOR.sub, letterSpacing: "-0.02em" } },
  slam: { size: 100, css: { fontWeight: 900, color: COLOR.ink, letterSpacing: "-0.035em" } },
  verb: { size: 70, css: { fontWeight: 800, color: COLOR.ink, letterSpacing: "-0.03em" } },
  kpi: { size: 44, css: { fontWeight: 800, color: COLOR.ink } },
  tag: { size: 34, css: { fontWeight: 500, color: COLOR.sub } },
  logo: { size: 170, css: { fontWeight: 900, color: COLOR.ink, letterSpacing: "-0.05em" } },
  cta: { size: 30, css: { fontWeight: 700, color: COLOR.ink } },
};

// 단어 하나씩 아래에서 밀려 올라오고, {강조}는 연두 손글씨로 쓰인 뒤 마크가 그어진다.
export const CopyLine: React.FC<{
  cue: Cue;
  size?: number;
  out?: number; // 이 절대 프레임부터 사라짐
  dim?: number; // 0–1, 뒤로 물러난 줄
  style?: React.CSSProperties;
}> = ({ cue, size, out, dim = 0, style }) => {
  const abs = useAbsFrame();
  const local = abs - cue.at;
  if (local < 0) return null;
  const preset = COPY[cue.style];
  const fontSize = size ?? preset.size;
  const segs = parseEmphasis(cue.text);
  const handWord = segs.find((s) => s.hand)?.text;
  const t = handWord ? emphasisTiming(handWord, cue.delay) : undefined;
  const leave = out !== undefined ? ramp(abs, out, COPY_OUT, EASE_IN_OUT) : 0;
  if (leave >= 1) return null;
  const handAt = segs.findIndex((s) => s.hand);
  let wordIndex = 0;

  return (
    <div
      style={{
        ...preset.css,
        fontSize,
        lineHeight: 1.22,
        whiteSpace: "nowrap",
        opacity: (1 - leave) * (1 - dim * 0.72),
        transform: `translateY(${-leave * 56}px)`,
        ...style,
      }}
    >
      {segs.map((seg, si) => {
        if (seg.hand && t) {
          return (
            <HandWord
              key={si}
              text={seg.text}
              size={fontSize}
              write={ramp(local, t.write, t.written - t.write, Easing.linear)}
              mark={cue.mark}
              markProgress={cue.mark ? ramp(local, t.mark, MARK_FRAMES[cue.mark], EASE_IN_OUT) : 0}
            />
          );
        }
        return seg.text.split(/(\s+)/).map((w, wi) => {
          if (/^\s+$/.test(w) || w === "") return <span key={`${si}-${wi}`}>{w}</span>;
          // 강조 단어 뒤의 글자(조사·쉼표)는 손글씨가 다 쓰인 뒤에 붙는다
          const after = t && handAt >= 0 && si > handAt;
          const p = after ? ramp(local, t.written - 2, 10) : ramp(local, wordIndex++ * 3, 16);
          return (
            <span key={`${si}-${wi}`} style={{ display: "inline-block", clipPath: "inset(-40% -20% -10% -20%)" }}>
              <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 105}%)` }}>{w}</span>
            </span>
          );
        });
      })}
    </div>
  );
};

// 씬 상단의 작은 기능 라벨 — 체크리스트 항목과 같은 번호·이름 ("01 실시간 상호작용")
export const Eyebrow: React.FC<{ text: string; at: number; index?: number; out?: number; style?: React.CSSProperties }> = ({
  text,
  at,
  index,
  out,
  style,
}) => {
  const abs = useAbsFrame();
  const p = ramp(abs, at, 14);
  const leave = out !== undefined ? ramp(abs, out, COPY_OUT, EASE_IN_OUT) : 0;
  if (p <= 0 || leave >= 1) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        color: COLOR.limeInk,
        opacity: p * (1 - leave),
        transform: `translate(${(1 - p) * -16}px, ${-leave * 56}px)`,
        ...style,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 5, background: COLOR.lime }} />
      {index !== undefined && (
        <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 600, letterSpacing: "0.04em", color: COLOR.sub }}>
          {String(index).padStart(2, "0")}
        </span>
      )}
      {text}
    </div>
  );
};

// ── UI 부품 ──────────────────────────────────────────────────

export const shadow = "0 24px 60px rgba(21,24,28,0.10), 0 2px 6px rgba(21,24,28,0.05)";

export const WindowFrame: React.FC<{
  title: string;
  width: number;
  height: number;
  right?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, width, height, right, children, style }) => (
  <div
    style={{
      position: "absolute",
      width,
      height,
      background: COLOR.surface,
      borderRadius: 22,
      border: `1px solid ${COLOR.line}`,
      boxShadow: shadow,
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        height: 48,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 18px",
        borderBottom: `1px solid ${COLOR.line}`,
        fontSize: 17,
        fontWeight: 600,
        color: COLOR.sub,
      }}
    >
      {["#E5E7E3", "#E5E7E3", "#E5E7E3"].map((c, i) => (
        <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
      ))}
      <span style={{ marginLeft: 10 }}>{title}</span>
      <span style={{ marginLeft: "auto" }}>{right}</span>
    </div>
    <div style={{ position: "relative", width, height: height - 48 }}>{children}</div>
  </div>
);

const AVATAR_TONES = ["#E8EBE4", "#E4E9EE", "#EEE8E4", "#E9E4EE", "#E4EEEA", "#EEEDE4"];
export const Avatar: React.FC<{ name: string; size: number; tone?: number; ring?: number; style?: React.CSSProperties }> = ({
  name,
  size,
  tone = 0,
  ring = 0,
  style,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: AVATAR_TONES[tone % AVATAR_TONES.length],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 700,
      color: COLOR.ink,
      boxShadow: ring ? `0 0 0 ${3 * ring}px ${COLOR.lime}` : undefined,
      flexShrink: 0,
      ...style,
    }}
  >
    {name}
  </div>
);

export const Cursor: React.FC<{ x: number; y: number; press?: number; opacity?: number }> = ({ x, y, press = 0, opacity = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity, transform: `scale(${1 - press * 0.15})`, transformOrigin: "0 0", zIndex: 50 }}>
    {press > 0 && (
      <div
        style={{
          position: "absolute",
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: 22,
          border: `3px solid ${COLOR.lime}`,
          opacity: 1 - press,
          transform: `scale(${0.4 + press * 1.2})`,
        }}
      />
    )}
    <svg width="34" height="40" viewBox="0 0 34 40" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))" }}>
      <path d="M3 2 L3 32 L11 25 L17 38 L23 35 L17 23 L28 23 Z" fill={COLOR.ink} stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  </div>
);

export const Chip: React.FC<{ icon?: IconName; label: string; on?: boolean; size?: number; style?: React.CSSProperties }> = ({
  icon,
  label,
  on = false,
  size = 20,
  style,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: `${size * 0.45}px ${size * 0.8}px`,
      borderRadius: 999,
      fontSize: size,
      fontWeight: 600,
      background: on ? COLOR.limeSoft : COLOR.surface,
      border: `1.5px solid ${on ? COLOR.lime : COLOR.line}`,
      color: on ? COLOR.ink : COLOR.sub,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {icon && <Icon name={icon} size={size * 1.15} color={on ? COLOR.limeInk : COLOR.sub} />}
    {label}
  </div>
);

// 포물선 비행 (from → to, 높이 h)
export const arc = (p: number, from: [number, number], to: [number, number], h: number): [number, number] => [
  lerp(from[0], to[0], p),
  lerp(from[1], to[1], p) - Math.sin(Math.PI * p) * h,
];

// 음영 아이콘 — 같은 아이콘을 오프셋으로 한 겹 더 깔아 만든 그림자 (마커 톤의 2도 인쇄 느낌)
export const Shaded: React.FC<{ name: IconName; size: number; shade: string; ink: string; offset?: number; p?: number }> = ({
  name,
  size,
  shade,
  ink,
  offset = size * 0.045,
  p = 1,
}) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "absolute", left: offset, top: offset }}>
      <Icon name={name} size={size} color={shade} strokeWidth={2.4} progress={p} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      <Icon name={name} size={size} color={ink} strokeWidth={1.4} progress={p} />
    </div>
  </div>
);

// 실제 화면 컷 — 흰 프레임에 넣어 1초 안팎 띄우고, 연두 손그림 마크로 짚는다.
// spots 좌표는 원본 이미지 픽셀 기준, at은 컷 시작 기준 프레임.
// from이 있으면 그 사각형(화면 좌표)에서 펼쳐져 나온다 — 패널이 그대로 실제 화면이 되는 느낌.
export type Spot = { x: number; y: number; w: number; h: number; kind: MarkKind; at: number };
export type Rect = { x: number; y: number; w: number; h: number };
export const RealShot: React.FC<{
  src: string;
  native: [number, number];
  width: number;
  x: number;
  y: number;
  t: number;
  spots?: Spot[];
  label?: string;
  tilt?: number;
  from?: Rect;
  exit?: number; // 이 로컬 프레임부터 6f 동안 아래로 빠짐
}> = ({ src, native, width, x, y, t, spots = [], label = "실제 ClassIn 화면", tilt = -2.5, from, exit }) => {
  if (t < 0) return null;
  const k = width / native[0];
  const height = native[1] * k;
  const p = ramp(t, 0, from ? 12 : 10, from ? EASE_IN_OUT : EASE_OUT);
  const gone = exit !== undefined ? ramp(t, exit, 7, EASE_IN_OUT) : 0;
  if (gone >= 1) return null;
  const W = width + 20;
  const H = height + 20;
  const transform = from
    ? `translate(${lerp(from.x - x, 0, p)}px, ${lerp(from.y - y, 0, p) + gone * 40}px) scale(${lerp(from.w / W, 1, p)}, ${lerp(from.h / H, 1, p)}) rotate(${tilt * 0.3 * p}deg)`
    : `translateY(${(1 - p) * 50 + gone * 40}px) scale(${lerp(0.92, 1, p)}) rotate(${lerp(tilt, tilt * 0.3, p)}deg)`;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: (from ? ramp(t, 0, 5) : p) * (1 - gone),
        transform,
        transformOrigin: from ? "0 0" : "50% 60%",
        zIndex: 60,
      }}
    >
      <div style={{ padding: 10, borderRadius: 22, background: COLOR.surface, border: `1px solid ${COLOR.line}`, boxShadow: "0 40px 90px rgba(21,24,28,0.22), 0 4px 10px rgba(21,24,28,0.08)" }}>
        <div style={{ position: "relative", width, height, borderRadius: 14, overflow: "hidden" }}>
          <Img src={staticFile(src)} style={{ width, height, display: "block", opacity: from ? ramp(t, 3, 8) : 1 }} />
          {spots.map((sp, i) => (
            <div key={i} style={{ position: "absolute", left: sp.x * k, top: sp.y * k, width: sp.w * k, height: sp.h * k }}>
              <Mark kind={sp.kind} progress={ramp(t, sp.at, MARK_FRAMES[sp.kind] + 2, EASE_IN_OUT)} size={90} />
            </div>
          ))}
        </div>
      </div>
      {label && (
        <div style={{ position: "absolute", left: 22, top: -24, opacity: ramp(t, from ? 10 : 4, 6) }}>
          <Chip icon="Monitor" label={label} on size={18} style={{ boxShadow: shadow }} />
        </div>
      )}
    </div>
  );
};

// ── 강조 장치 ────────────────────────────────────────────────

// 스포트라이트 — 클릭할 곳만 남기고 나머지를 종이색으로 덮어 물러나게 한다.
export const Spotlight: React.FC<{ rect: Rect; p: number; radius?: number; pad?: number }> = ({ rect, p, radius = 14, pad = 10 }) =>
  p <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: rect.x - pad,
        top: rect.y - pad,
        width: rect.w + pad * 2,
        height: rect.h + pad * 2,
        borderRadius: radius,
        boxShadow: `0 0 0 ${3 * p}px ${COLOR.lime}, 0 0 0 4000px rgba(247,247,242,${0.62 * p})`,
        zIndex: 40,
        pointerEvents: "none",
      }}
    />
  );

// 초점 브래킷 — 네 모서리가 크게 벌어져 있다가 대상 크기에 '딱' 맞게 스냅한다.
const SNAP = Easing.bezier(0.34, 1.56, 0.64, 1);
export const FocusBrackets: React.FC<{ rect: Rect; p: number; fade?: number; color?: string; arm?: number; gap?: number }> = ({
  rect,
  p,
  fade = 0,
  color = COLOR.limeInk,
  arm = 46,
  gap = 16,
}) => {
  if (p <= 0 || fade >= 1) return null;
  const e = SNAP(Math.min(1, p));
  const spread = lerp(70, 0, e) + fade * 30;
  const rot = lerp(-4, 0, e);
  const corners: [number, number, number, number][] = [
    [-1, -1, rect.x - gap, rect.y - gap],
    [1, -1, rect.x + rect.w + gap, rect.y - gap],
    [1, 1, rect.x + rect.w + gap, rect.y + rect.h + gap],
    [-1, 1, rect.x - gap, rect.y + rect.h + gap],
  ];
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity: Math.min(1, p * 3) * (1 - fade), zIndex: 45 }}>
      <g transform={`rotate(${rot} ${rect.x + rect.w / 2} ${rect.y + rect.h / 2})`}>
        {corners.map(([sx, sy, cx, cy], i) => {
          const x = cx + sx * spread;
          const y = cy + sy * spread;
          return (
            <path
              key={i}
              d={`M ${x} ${y - sy * arm} L ${x} ${y} L ${x - sx * arm} ${y}`}
              fill="none"
              stroke={color}
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

// 사각형(0,0,w,h)을 임의의 사각형 네 꼭짓점(시계 방향, 좌상단부터)으로 보내는 CSS matrix3d — 원근 매칭용
export type Pt = [number, number];
export const quadMatrix = (w: number, h: number, q: [Pt, Pt, Pt, Pt]) => {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const hh = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + hh * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + hh * y3;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${m.join(",")})`;
};
