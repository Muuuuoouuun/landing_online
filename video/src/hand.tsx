import React from "react";
import { interpolate } from "remotion";
import { COLOR } from "./brand";
import { HAND, loadHand } from "./fonts";

// 손글씨 강조 시스템.
// 카피에서 {중괄호} 부분이 강조 — 연두 손글씨로 '쓰이고', 다 쓰이면 마크(밑줄·동그라미…)가 그어진다.
// 쓰는 순간과 마크 순간에 '슥슥' 효과음이 붙는다(cueSfx).

export type MarkKind = "underline" | "circle" | "strike" | "check" | "highlight";

export const MARK_FRAMES: Record<MarkKind, number> = {
  underline: 8,
  circle: 10,
  strike: 10,
  check: 8,
  highlight: 10,
};

export const WRITE_DELAY = 4; // 줄이 뜬 뒤 손글씨가 시작되기까지
const MARK_GAP = 2; // 다 쓰고 마크까지

export type Segment = { text: string; hand: boolean };
export const parseEmphasis = (text: string): Segment[] =>
  text
    .split(/(\{[^}]+\})/)
    .filter(Boolean)
    .map((s) => (s.startsWith("{") ? { text: s.slice(1, -1), hand: true } : { text: s, hand: false }));

export const emphasisOf = (text: string) => parseEmphasis(text).find((s) => s.hand)?.text;
export const writeFrames = (word: string) => Math.round(5 + 2.2 * word.length);

// 강조 타이밍: 쓰기 시작 · 쓰기 끝 · 마크 시작 (cue 기준 상대 프레임)
export const emphasisTiming = (word: string, delay = WRITE_DELAY) => {
  const write = delay;
  const written = write + writeFrames(word);
  return { write, written, mark: written + MARK_GAP };
};

// 마크 경로 — 0 0 100 40 박스를 강조 단어 크기에 맞춰 늘려 쓴다.
const MARK_PATH: Record<MarkKind, string> = {
  underline: "M2 22 C 28 14, 58 28, 98 15",
  circle:
    "M72 4 C 96 6, 103 31, 70 37 C 40 42, 1 36, 3 19 C 5 5, 36 0, 63 3 C 72 4, 80 7, 85 11",
  strike: "M2 24 C 30 18, 60 26, 98 16 C 70 22, 40 21, 5 28 C 40 25, 70 17, 97 22",
  check: "M10 22 L 38 36 L 92 2",
  highlight: "M0 22 C 30 19, 70 25, 100 20",
};

const MARK_BOX: Record<MarkKind, React.CSSProperties> = {
  underline: { left: "-4%", width: "108%", top: "74%", height: "34%" },
  circle: { left: "-16%", width: "132%", top: "-20%", height: "140%" },
  strike: { left: "-6%", width: "112%", top: "28%", height: "44%" },
  check: { left: "-0.82em", width: "0.68em", top: "6%", height: "0.68em" },
  highlight: { left: "-4%", width: "108%", top: "38%", height: "56%" },
};

// 마크는 늘어난 박스 안에서도 획 두께가 일정하도록 non-scaling-stroke로 그리고,
// 드로잉은 마스크 스윕으로 드러낸다 — 동그라미는 시계 방향, 나머지는 왼쪽 → 오른쪽.
const markMask = (kind: MarkKind, p: number) => {
  if (kind === "circle") {
    const a = p * 370;
    return `conic-gradient(from 20deg, #000 ${a}deg, transparent ${a + 6}deg)`;
  }
  const x = p * 104;
  return `linear-gradient(90deg, #000 ${x - 4}%, transparent ${x}%)`;
};

export const Mark: React.FC<{ kind: MarkKind; progress: number; size: number; color?: string }> = ({
  kind,
  progress,
  size,
  color = COLOR.lime,
}) => {
  const isHighlight = kind === "highlight";
  const mask = markMask(kind, progress);
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        overflow: "visible",
        zIndex: isHighlight ? 0 : 2,
        pointerEvents: "none",
        WebkitMaskImage: mask,
        maskImage: mask,
        ...MARK_BOX[kind],
      }}
    >
      <path
        d={MARK_PATH[kind]}
        fill="none"
        stroke={color}
        strokeWidth={isHighlight ? size * 0.42 : Math.max(4, size * 0.07)}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={isHighlight ? 0.55 : 1}
      />
    </svg>
  );
};

// 손글씨 단어. write 0→1로 왼쪽부터 잉크가 번지듯 드러난다.
export const HandWord: React.FC<{
  text: string;
  size: number;
  write: number;
  mark?: MarkKind;
  markProgress?: number;
  color?: string;
}> = ({ text, size, write, mark, markProgress = 0, color = COLOR.limeInk }) => {
  loadHand(text);
  const edge = write * 112 - 6;
  const mask = `linear-gradient(90deg, #000 ${edge - 6}%, transparent ${edge + 6}%)`;
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 0.12em 0 0.06em", whiteSpace: "nowrap" }}>
      {mark && <Mark kind={mark} progress={markProgress} size={size} />}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: HAND,
          fontWeight: 400,
          fontSize: size * 1.3,
          lineHeight: 1,
          color,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        {text}
      </span>
    </span>
  );
};

// 한 줄 카피: 기본 폰트 + {강조} 손글씨. local = 줄이 뜬 뒤 지난 프레임.
export const EmphLine: React.FC<{
  text: string;
  size: number;
  local: number;
  mark?: MarkKind;
  delay?: number;
}> = ({ text, size, local, mark, delay }) => {
  const word = emphasisOf(text);
  const t = word ? emphasisTiming(word, delay) : undefined;
  return (
    <>
      {parseEmphasis(text).map((seg, i) =>
        seg.hand && t ? (
          <HandWord
            key={i}
            text={seg.text}
            size={size}
            write={interpolate(local, [t.write, t.written], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            mark={mark}
            markProgress={
              mark
                ? interpolate(local, [t.mark, t.mark + MARK_FRAMES[mark]], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : 0
            }
          />
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
};
