import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLOR } from "../brand";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import { S7Frame } from "./Manage";
import { Chip, CopyLine, EASE_IN_OUT, Eyebrow, Layer, lerp, Pt, quadMatrix, ramp, shadow } from "./kit";

// S8 사무실은 선택 · S9 엔딩
// S8은 S7 화면이 카피째 기울며 작아져 실제 노트북 사진의 화면 속으로 들어가는 줌 아웃 매치 컷으로 시작한다.

// 노트북 수업 사진(1098×618)과 사진 속 화면의 네 꼭짓점(원본 픽셀, 좌상단부터 시계 방향)
const PHOTO = { x: 600, y: 408, w: 720 };
const NATIVE = { w: 1098, h: 618 };
const K = PHOTO.w / NATIVE.w;
const PHOTO_H = NATIVE.h * K;
const HUB = { x: PHOTO.x + PHOTO.w / 2, y: PHOTO.y + PHOTO_H / 2 };
const SCREEN: [Pt, Pt, Pt, Pt] = (
  [
    [125, 99],
    [776, -4],
    [860, 398],
    [283, 612],
  ] as Pt[]
).map(([x, y]) => [PHOTO.x + x * K, PHOTO.y + y * K]) as [Pt, Pt, Pt, Pt];

// 줌 아웃 출발점: 사진 속 화면 중심에 놓인 16:9 사각형이 화면 전체를 채우는 카메라
const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const SC: Pt = [SCREEN.reduce((a, p) => a + p[0], 0) / 4, SCREEN.reduce((a, p) => a + p[1], 0) / 4];
const RECT_W = (dist(SCREEN[0], SCREEN[1]) + dist(SCREEN[3], SCREEN[2])) / 2;
const RECT_H = (RECT_W * 9) / 16;
const SCREEN_RECT: [Pt, Pt, Pt, Pt] = [
  [SC[0] - RECT_W / 2, SC[1] - RECT_H / 2],
  [SC[0] + RECT_W / 2, SC[1] - RECT_H / 2],
  [SC[0] + RECT_W / 2, SC[1] + RECT_H / 2],
  [SC[0] - RECT_W / 2, SC[1] + RECT_H / 2],
];
const Z0 = 1920 / RECT_W;
const ZOOM = 26;

const PINS: { x: number; y: number; icon: IconName; label: string }[] = [
  { x: 330, y: 440, icon: "House", label: "강사 · 서울 자택" },
  { x: 290, y: 690, icon: "MapPin", label: "학생 · 부산" },
  { x: 470, y: 880, icon: "MapPin", label: "학생 · 제주" },
  { x: 1450, y: 880, icon: "House", label: "강사 · 대전" },
  { x: 1630, y: 690, icon: "Globe", label: "학생 · 뉴욕" },
  { x: 1590, y: 440, icon: "Wifi", label: "원장 · 어디서나" },
];

export const S8Office: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S8");
  const end = s.from + s.duration;
  const e = ramp(t, 0, ZOOM, EASE_IN_OUT);
  const z = Math.pow(Z0, 1 - e);
  const cam = { x: lerp(SC[0], 960, e), y: lerp(SC[1], 540, e) };
  const body = SCREEN_RECT.map((p, i) => [lerp(p[0], SCREEN[i][0], e), lerp(p[1], SCREEN[i][1], e)]) as [Pt, Pt, Pt, Pt];
  const cv = ramp(t, s.duration, 14, EASE_IN_OUT); // S9로 수렴
  const photoOut = ramp(t, s.duration, 10);

  return (
    <Layer>
      {/* 사진 → 화면 연결선 · 지역 핀 */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        {PINS.map((pin, i) => {
          const p = ramp(t, 18 + i * 4, 10, EASE_IN_OUT);
          const px = lerp(pin.x, HUB.x, cv);
          const py = lerp(pin.y, HUB.y, cv);
          return (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={lerp(HUB.x, px, p)}
              y2={lerp(HUB.y, py, p)}
              stroke={COLOR.lime}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="2 14"
              strokeDashoffset={-t * 1.6}
              opacity={p > 0 ? 1 - cv : 0}
            />
          );
        })}
      </svg>

      {/* 카메라: 노트북 화면을 꽉 채운 상태에서 사진 전체로 빠진다 */}
      {photoOut < 1 && (
        <AbsoluteFill
          style={{
            transform: `translate(960px, 540px) scale(${z}) translate(${-cam.x}px, ${-cam.y}px)`,
            transformOrigin: "0 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: PHOTO.x - 10,
              top: PHOTO.y - 10,
              padding: 10,
              borderRadius: 24,
              background: COLOR.surface,
              border: `1px solid ${COLOR.line}`,
              boxShadow: "0 40px 90px rgba(21,24,28,0.20), 0 4px 10px rgba(21,24,28,0.08)",
              opacity: 1 - photoOut,
              transform: `scale(${lerp(1, 0.6, cv)})`,
              transformOrigin: `${PHOTO.w / 2 + 10}px ${PHOTO_H / 2 + 10}px`,
            }}
          >
            <Img src={staticFile("img/laptop-class.webp")} style={{ width: PHOTO.w, height: PHOTO_H, borderRadius: 16, display: "block" }} />
            <div style={{ position: "absolute", left: 24, top: -22, opacity: ramp(t, 34, 8) }}>
              <Chip icon="Laptop" label="기관 전체 = 노트북 한 대" on size={18} style={{ boxShadow: shadow }} />
            </div>
          </div>
          {/* S7 대시보드가 사진 속 화면 위치·각도로 들어간다 */}
          {t < ZOOM + 2 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 1920,
                height: 1080,
                transform: quadMatrix(1920, 1080, body),
                transformOrigin: "0 0",
                opacity: 1 - ramp(t, ZOOM - 8, 9),
                overflow: "hidden",
                background: COLOR.paper,
                backgroundImage: `linear-gradient(${COLOR.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLOR.grid} 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                borderRadius: lerp(0, 30, e),
              }}
            >
              <S7Frame t={sceneById("S7").duration + t} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {PINS.map((pin, i) => {
        const p = ramp(t, 22 + i * 4, 10);
        if (p <= 0 || cv >= 1) return null;
        return (
          <div
            key={pin.label}
            style={{
              position: "absolute",
              left: lerp(pin.x, HUB.x, cv),
              top: lerp(pin.y, HUB.y, cv),
              transform: `translate(-50%, -50%) scale(${lerp(0.6, 1, p) * lerp(1, 0.5, cv)})`,
              opacity: p * (1 - cv),
            }}
          >
            <Chip icon={pin.icon} label={pin.label} on size={22} style={{ boxShadow: shadow }} />
          </div>
        );
      })}

      <div style={{ position: "absolute", top: 96, width: "100%", display: "flex", justifyContent: "center" }}>
        <Eyebrow index={5} text={s.eyebrow!} at={s.from + 8} out={end} />
      </div>
      <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[0]} out={end} />
      </div>
      <div style={{ position: "absolute", top: 204, width: "100%", textAlign: "center" }}>
        <CopyLine cue={s.cues[1]} out={end} />
      </div>
    </Layer>
  );
};

// ── S9 ───────────────────────────────────────────────────────

export const S9End: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S9");
  const [slogan, logo, , cta] = s.cues;
  const rise = ramp(t, 28, 12, EASE_IN_OUT);
  const hitT = logo.at - s.from;
  const pop = ramp(t, hitT, 10);
  const ring = ramp(t, hitT, 20);
  const burst = ramp(t, hitT, 14);
  const ctaP = ramp(t, cta.at - s.from, 12);

  return (
    <Layer>
      <div style={{ position: "absolute", top: 470, width: "100%", textAlign: "center", transform: `translateY(${-rise * 210}px) scale(${lerp(1, 0.82, rise)})` }}>
        <CopyLine cue={slogan} size={112} />
      </div>

      {/* 로고 히트 — 연두 링 + 방사선 */}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: ring > 0 ? 1 - ring : 0 }}>
        <circle cx={960} cy={505} r={lerp(80, 720, ring)} fill="none" stroke={COLOR.lime} strokeWidth={lerp(14, 2, ring)} />
      </svg>
      {burst > 0 && burst < 1 && (
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 14) * Math.PI * 2 + 0.2;
            const r0 = lerp(330, 470, burst);
            const r1 = lerp(360, 520, burst);
            return (
              <line
                key={i}
                x1={960 + Math.cos(a) * r0}
                y1={505 + Math.sin(a) * r0 * 0.55}
                x2={960 + Math.cos(a) * r1}
                y2={505 + Math.sin(a) * r1 * 0.55}
                stroke={COLOR.lime}
                strokeWidth={6}
                strokeLinecap="round"
                opacity={1 - burst}
              />
            );
          })}
        </svg>
      )}
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
      {/* 태그라인은 체크리스트 바가 변신해서 만든다 (Checklist.tsx) */}
      <div style={{ position: "absolute", top: 744, width: "100%", display: "flex", justifyContent: "center" }}>
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
    </Layer>
  );
};
