import React from "react";
import { useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { MONO, SANS } from "../fonts";
import { Icon } from "../icons";
import { CheckItem, CHECKLIST, CHECKLIST_IN, sceneById, TOKEN_FLIGHT } from "../timeline";
import { arc, EASE_IN_OUT, lerp, ramp, shadow } from "./kit";

// '온라인 수업 체크리스트' 바 — 화면 하단 중앙에 떠 있는 HUD.
// S3에서 빈 칸 5개로 등장 → 장면마다 증거 토큰이 날아와 하나씩 체크(차임) → S9에서 5/5가 되면
// 한 줄로 합쳐져 로고 아래 태그라인 "온라인 수업에 딱 맞는 교실"이 된다.

const BAR = { cy: 1000, h: 62, pad: 8, title: 250, chip: 190, gap: 10 };
const BAR_W = BAR.pad * 2 + BAR.title + BAR.gap + CHECKLIST.length * BAR.chip + (CHECKLIST.length - 1) * BAR.gap;
const BAR_X = 960 - BAR_W / 2;
const CHIP_H = BAR.h - BAR.pad * 2;
const chipCx = (i: number) => BAR_X + BAR.pad + BAR.title + BAR.gap + i * (BAR.chip + BAR.gap) + BAR.chip / 2;
const TITLE_CX = BAR_X + BAR.pad + BAR.title / 2;
const PILL = { w: 580, h: 70, cy: 680 };

const CheckChip: React.FC<{ item: CheckItem; frame: number; appear: number }> = ({ item, frame, appear }) => {
  const on = frame >= item.land;
  const pop = 1 + 0.14 * Math.sin(Math.PI * ramp(frame, item.land, 12));
  const pulse = ramp(frame, item.land, 18);
  return (
    <div
      style={{
        position: "relative",
        width: BAR.chip,
        height: CHIP_H,
        boxSizing: "border-box",
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 12px 0 9px",
        background: on ? COLOR.limeSoft : "#F5F6F2",
        border: `1.5px solid ${on ? COLOR.lime : COLOR.line}`,
        opacity: appear,
        transform: `scale(${lerp(0.8, 1, appear) * pop})`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          boxSizing: "border-box",
          background: on ? COLOR.lime : "transparent",
          border: on ? "none" : `2px solid #D3D6D0`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {on ? (
          <Icon name="Check" size={20} color={COLOR.ink} strokeWidth={3.4} progress={ramp(frame, item.land + 1, 8)} />
        ) : (
          <Icon name={item.icon} size={15} color="#A9AEA6" strokeWidth={2} />
        )}
      </div>
      <span style={{ fontSize: 19, fontWeight: on ? 800 : 600, color: on ? COLOR.ink : COLOR.sub, whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>
        {item.label}
      </span>
      {pulse > 0 && pulse < 1 && (
        <div
          style={{
            position: "absolute",
            left: -2,
            top: -2,
            width: BAR.chip + 4,
            height: CHIP_H + 4,
            boxSizing: "border-box",
            borderRadius: 999,
            border: `3px solid ${COLOR.lime}`,
            opacity: 1 - pulse,
            transform: `scale(${1 + 0.3 * pulse}, ${1 + 0.9 * pulse})`,
          }}
        />
      )}
    </div>
  );
};

// 장면의 증거에서 출발해 칩으로 날아가는 연두 토큰
const Token: React.FC<{ item: CheckItem; i: number; frame: number }> = ({ item, i, frame }) => {
  const start = item.land - TOKEN_FLIGHT;
  if (frame < start - 6 || frame >= item.land) return null;
  const grow = ramp(frame, start - 6, 8);
  const p = ramp(frame, start, TOKEN_FLIGHT, EASE_IN_OUT);
  const to: [number, number] = [chipCx(i), BAR.cy];
  const at = (q: number) => arc(Math.max(0, q), item.from, to, 160);
  const [x, y] = at(p);
  const ring = ramp(frame, start - 6, 14);
  return (
    <>
      {ring < 1 && (
        <div
          style={{
            position: "absolute",
            left: item.from[0] - 40,
            top: item.from[1] - 40,
            width: 80,
            height: 80,
            borderRadius: 40,
            border: `4px solid ${COLOR.lime}`,
            opacity: 1 - ring,
            transform: `scale(${lerp(0.4, 1.6, ring)})`,
          }}
        />
      )}
      {p > 0 &&
        [4, 3, 2, 1].map((k) => {
          const [gx, gy] = at(p - k * 0.05);
          const r = 22 - k * 3.5;
          return (
            <div
              key={k}
              style={{ position: "absolute", left: gx - r, top: gy - r, width: r * 2, height: r * 2, borderRadius: r, background: COLOR.lime, opacity: 0.4 - k * 0.08 }}
            />
          );
        })}
      <div
        style={{
          position: "absolute",
          left: x - 26,
          top: y - 26,
          width: 52,
          height: 52,
          borderRadius: 26,
          boxSizing: "border-box",
          background: COLOR.lime,
          border: "3px solid #fff",
          boxShadow: `0 10px 24px rgba(21,24,28,0.22), 0 0 0 6px ${COLOR.lime}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${grow * lerp(1, 0.62, p)})`,
        }}
      >
        <Icon name={item.icon} size={26} color={COLOR.ink} strokeWidth={2.4} />
      </div>
    </>
  );
};

export const Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < CHECKLIST_IN) return null;
  const end = sceneById("S9");
  const t9 = frame - end.from;
  const appear = ramp(frame, CHECKLIST_IN, 12);
  const done = CHECKLIST.filter((c) => frame >= c.land).length;
  const lastLand = [...CHECKLIST].reverse().find((c) => frame >= c.land)?.land ?? -99;
  const countPop = 1 + 0.25 * Math.sin(Math.PI * ramp(frame, lastLand, 10));

  // S9: 5/5 → 한 줄로 합쳐져 태그라인으로
  const shine = ramp(t9, 2, 16, EASE_IN_OUT);
  const c = ramp(t9, 16, 12, EASE_IN_OUT);
  const chipsOut = ramp(t9, 18, 8);
  const pillIn = ramp(t9, 24, 8);
  const rise = ramp(t9, 42, 14, EASE_IN_OUT);
  const w = lerp(BAR_W, PILL.w, c);
  const h = lerp(BAR.h, PILL.h, c);
  const cy = lerp(BAR.cy, PILL.cy, rise);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 960 - w / 2,
          top: cy - h / 2,
          width: w,
          height: h,
          boxSizing: "border-box",
          borderRadius: 999,
          background: COLOR.surface,
          border: `1.5px solid ${done === CHECKLIST.length && t9 >= 0 ? COLOR.lime : COLOR.line}`,
          boxShadow: shadow,
          overflow: "hidden",
          opacity: appear,
          transform: `translateY(${(1 - appear) * 50}px) scale(${lerp(1, 1.06, rise)})`,
          fontFamily: SANS,
          color: COLOR.ink,
        }}
      >
        {chipsOut < 1 && (
          <div style={{ position: "absolute", left: BAR.pad - (BAR_W - w) / 2, top: BAR.pad + (h - BAR.h) / 2, display: "flex", gap: BAR.gap, opacity: 1 - chipsOut }}>
            <div
              style={{
                width: BAR.title,
                height: CHIP_H,
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingLeft: 14,
                boxSizing: "border-box",
                transform: `translateX(${(960 - TITLE_CX) * c * 0.8}px)`,
                opacity: ramp(frame, CHECKLIST_IN + 2, 8),
              }}
            >
              <Icon name="ListChecks" size={22} color={COLOR.limeInk} />
              <span style={{ fontSize: 17, fontWeight: 700, color: COLOR.sub, whiteSpace: "nowrap" }}>온라인 수업 체크리스트</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  fontWeight: 700,
                  color: done ? COLOR.limeInk : COLOR.sub,
                  transform: `scale(${countPop})`,
                  display: "inline-block",
                }}
              >
                {done}/5
              </span>
            </div>
            {CHECKLIST.map((item, i) => (
              <div key={item.label} style={{ transform: `translateX(${(960 - chipCx(i)) * c * 0.8}px)` }}>
                <CheckChip item={item} frame={frame} appear={ramp(frame, CHECKLIST_IN + 4 + i * 3, 8)} />
              </div>
            ))}
          </div>
        )}
        {/* 5/5 반짝임 */}
        {shine > 0 && shine < 1 && (
          <div
            style={{
              position: "absolute",
              left: lerp(-300, BAR_W + 100, shine) - (BAR_W - w) / 2,
              top: 0,
              width: 220,
              height: "100%",
              background: `linear-gradient(100deg, transparent, ${COLOR.lime}66, transparent)`,
            }}
          />
        )}
        {pillIn > 0 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              opacity: pillIn,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 20, background: COLOR.lime, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Check" size={26} color={COLOR.ink} strokeWidth={3.4} progress={ramp(t9, 26, 8)} />
            </div>
            <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: COLOR.limeInk }}>5/5</span>
            <span style={{ width: 2, height: 30, background: COLOR.line }} />
            <span style={{ fontSize: 31, fontWeight: 800, letterSpacing: "-0.03em" }}>온라인 수업에 딱 맞는 교실</span>
          </div>
        )}
      </div>
      {CHECKLIST.map((item, i) => (
        <Token key={item.label} item={item} i={i} frame={frame} />
      ))}
    </>
  );
};
