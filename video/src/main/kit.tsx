import React, { createContext, useContext } from "react";
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

// 씬의 시작 프레임(절대값). 카피는 timeline의 절대 프레임을 쓰므로 이걸로 로컬 프레임을 계산한다.
const SceneFrom = createContext(0);
export const useAbsFrame = () => useCurrentFrame() + useContext(SceneFrom);

export const SceneShell: React.FC<{
  from: number;
  duration: number;
  enter?: number; // 페이드 인 프레임 (0 = 없음)
  exit?: number; // 페이드 아웃 프레임 (0 = 없음)
  children: React.ReactNode;
}> = ({ from, duration, enter = 8, exit = 8, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = enter ? ramp(frame, 0, enter) : 1;
  const fadeOut = exit ? 1 - ramp(frame, duration - exit, exit, EASE_IN_OUT) : 1;
  return (
    <SceneFrom.Provider value={from}>
      <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut), fontFamily: SANS, color: COLOR.ink }}>{children}</AbsoluteFill>
    </SceneFrom.Provider>
  );
};

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
  const leave = out !== undefined ? ramp(abs, out, 8, EASE_IN_OUT) : 0;
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
        transform: `translateY(${-leave * 24}px)`,
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
          const p = after ? ramp(local, t.written - 2, 8) : ramp(local, wordIndex++ * 2, 12);
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

// 씬 상단의 작은 기능 라벨
export const Eyebrow: React.FC<{ text: string; at: number; style?: React.CSSProperties }> = ({ text, at, style }) => {
  const abs = useAbsFrame();
  const p = ramp(abs, at, 12);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: MONO,
        fontSize: 18,
        letterSpacing: "0.08em",
        color: COLOR.limeInk,
        opacity: p,
        transform: `translateX(${(1 - p) * -16}px)`,
        ...style,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 4, background: COLOR.lime }} />
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

// 실제 화면 컷 — 흰 프레임에 넣어 0.6–0.8초 띄우고, 연두 손그림 마크로 짚는다.
// spots 좌표는 원본 이미지 픽셀 기준, at은 컷 시작 기준 프레임.
export type Spot = { x: number; y: number; w: number; h: number; kind: MarkKind; at: number };
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
}> = ({ src, native, width, x, y, t, spots = [], label = "실제 ClassIn 화면", tilt = -2.5 }) => {
  if (t < 0) return null;
  const k = width / native[0];
  const p = ramp(t, 0, 10);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: p,
        transform: `translateY(${(1 - p) * 50}px) scale(${lerp(0.92, 1, p)}) rotate(${lerp(tilt, tilt * 0.3, p)}deg)`,
        transformOrigin: "50% 60%",
        zIndex: 60,
      }}
    >
      <div style={{ padding: 10, borderRadius: 22, background: COLOR.surface, border: `1px solid ${COLOR.line}`, boxShadow: "0 40px 90px rgba(21,24,28,0.22), 0 4px 10px rgba(21,24,28,0.08)" }}>
        <div style={{ position: "relative", width, height: native[1] * k, borderRadius: 14, overflow: "hidden" }}>
          <Img src={staticFile(src)} style={{ width, height: native[1] * k, display: "block" }} />
          {spots.map((sp, i) => (
            <div key={i} style={{ position: "absolute", left: sp.x * k, top: sp.y * k, width: sp.w * k, height: sp.h * k }}>
              <Mark kind={sp.kind} progress={ramp(t, sp.at, MARK_FRAMES[sp.kind] + 2, EASE_IN_OUT)} size={90} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 22, top: -24, opacity: ramp(t, 4, 6) }}>
        <Chip icon="Monitor" label={label} on size={18} style={{ boxShadow: shadow }} />
      </div>
    </div>
  );
};
