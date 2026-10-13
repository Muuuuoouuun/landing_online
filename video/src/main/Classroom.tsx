import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLOR } from "../brand";
import { MONO } from "../fonts";
import { Mark, MARK_FRAMES } from "../hand";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import {
  arc,
  Avatar,
  Chip,
  CopyLine,
  Cursor,
  EASE_IN_OUT,
  Eyebrow,
  Layer,
  lerp,
  PAN,
  ramp,
  RealShot,
  shadow,
  Spotlight,
  WindowFrame,
} from "./kit";

// S4 수업 · S5 기록 — ClassIn 교실 창에서 상호작용이 일어나고, 수업이 끝나면 전부 기록으로 쌓인다.
// S3(선언)이 같은 자리에 선으로 그려 둔 창을 S4가 실제 UI로 채운다.

export const WIN = { x: 820, y: 196, w: 1000, h: 640 };
const TITLE_H = 48;
const SEAT = { w: 136, h: 86, gap: 12, x0: 24, y0: 20 };
const BOARD = { x: 24, y: 126, w: 760, h: 444 };
const TOOLS: { icon: IconName; label: string }[] = [
  { icon: "Presentation", label: "무대" },
  { icon: "PenLine", label: "판서" },
  { icon: "ListChecks", label: "퀴즈" },
  { icon: "Trophy", label: "트로피" },
  { icon: "Timer", label: "타이머" },
  { icon: "Users", label: "소그룹" },
];
// 동사 타이밍 (S4 로컬): 무대 · 판서 · 퀴즈 · 트로피 — 음악 박자(20f)마다. timeline의 동사 cue + 4f(쓰기 시작)와 같다
const BEATS = [20, 40, 60, 80];
const seatX = (i: number) => SEAT.x0 + i * (SEAT.w + SEAT.gap);
const toolY = (i: number) => BOARD.y + 8 + i * 70;

const Seat: React.FC<{ i: number; children?: React.ReactNode; empty?: boolean; ring?: number }> = ({ i, children, empty, ring = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: seatX(i),
      top: SEAT.y0,
      width: SEAT.w,
      height: SEAT.h,
      borderRadius: 14,
      background: empty ? "transparent" : "#F3F4F0",
      border: empty ? `2px dashed ${COLOR.line}` : `1px solid ${COLOR.line}`,
      boxShadow: ring ? `0 0 0 ${3 * ring}px ${COLOR.lime}` : undefined,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    }}
  >
    {children}
  </div>
);

const SeatPerson: React.FC<{ name: string; label: string; tone: number }> = ({ name, label, tone }) => (
  <>
    <Avatar name={name} size={42} tone={tone} />
    <span style={{ fontSize: 14, color: COLOR.sub, fontWeight: 600 }}>{label}</span>
  </>
);

// 칠판 위 판서 — 선생님(잉크)과 학생(연두)이 동시에 쓴다. 글씨가 아니라 선으로 그린다.
const BoardDrawing: React.FC<{ t: number }> = ({ t }) => {
  const teacher = ramp(t, BEATS[1], 14, EASE_IN_OUT);
  const student = ramp(t, BEATS[1] + 8, 10, EASE_IN_OUT);
  return (
    <svg width={BOARD.w} height={BOARD.h} style={{ position: "absolute", left: 0, top: 0 }}>
      <g stroke={COLOR.ink} strokeWidth={4} strokeLinecap="round" fill="none">
        <path d="M70 360 L 520 360" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(teacher, 0, 0.35, EASE_IN_OUT)} />
        <path d="M290 410 L 290 120" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(teacher, 0.15, 0.35, EASE_IN_OUT)} />
        <path d="M150 150 Q 290 520 430 150" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(teacher, 0.4, 0.6, EASE_IN_OUT)} />
      </g>
      <g stroke={COLOR.limeInk} strokeWidth={5} strokeLinecap="round" fill="none">
        <ellipse cx={290} cy={335} rx={38} ry={26} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(student, 0, 0.7)} />
        <path d="M335 330 L 420 300" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(student, 0.6, 0.4)} />
      </g>
      <text x={70} y={70} fontSize={30} fontWeight={700} fill={COLOR.ink} opacity={ramp(t, BEATS[1], 8)} fontStyle="italic">
        y = x² − 4x + 3
      </text>
      <g opacity={ramp(t, BEATS[1] + 12, 8)}>
        <rect x={428} y={278} width={96} height={36} rx={18} fill={COLOR.limeSoft} stroke={COLOR.lime} />
        <text x={476} y={302} fontSize={18} fontWeight={700} fill={COLOR.ink} textAnchor="middle">
          서연 · 꼭짓점
        </text>
      </g>
    </svg>
  );
};

const QUIZ = [
  { k: "A", v: "x = 1", pct: 8 },
  { k: "B", v: "x = 2", pct: 76 },
  { k: "C", v: "x = 3", pct: 11 },
  { k: "D", v: "x = 4", pct: 5 },
];
const QuizCard: React.FC<{ t: number }> = ({ t }) => {
  const p = ramp(t, BEATS[2], 10);
  const bars = ramp(t, BEATS[2] + 4, 12);
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 400,
        top: 36,
        width: 336,
        padding: "18px 20px",
        background: COLOR.surface,
        borderRadius: 18,
        border: `1px solid ${COLOR.line}`,
        boxShadow: shadow,
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px) scale(${lerp(0.94, 1, p)})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: COLOR.sub, fontWeight: 600 }}>
        <Icon name="ListChecks" size={20} color={COLOR.limeInk} /> 답변기 · 퀴즈
      </div>
      <div style={{ fontSize: 21, fontWeight: 800, margin: "8px 0 12px" }}>꼭짓점의 x좌표는?</div>
      {QUIZ.map((q) => {
        const right = q.k === "B";
        return (
          <div key={q.k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 16 }}>
            <span style={{ width: 22, fontWeight: 800, color: right ? COLOR.limeInk : COLOR.sub }}>{q.k}</span>
            <span style={{ width: 58, color: COLOR.ink }}>{q.v}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 7, background: "#F0F1ED", overflow: "hidden" }}>
              <div style={{ width: `${q.pct * bars}%`, height: "100%", borderRadius: 7, background: right ? COLOR.lime : "#CDD1CB" }} />
            </div>
            <span style={{ width: 40, textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{Math.round(q.pct * bars)}%</span>
          </div>
        );
      })}
      <div style={{ fontSize: 14, color: COLOR.sub, marginTop: 4 }}>응답 24 / 24</div>
    </div>
  );
};

// 실제 수업 화면을 교실 창 내용 영역(1000×592)에 cover로 맞춘다 — 같은 자리·같은 크기의 매치 컷
const REAL = { w: 1098, h: 618 };
const REAL_K = (WIN.h - TITLE_H) / REAL.h; // 0.958
const REAL_DX = (WIN.w - REAL.w * REAL_K) / 2; // −25.9 (좌우를 조금 잘라냄)
const REAL_SPOTS = [
  { x: 246, y: 38, w: 108, h: 30, at: 2 }, // 학생 트로피 ×3
  { x: 728, y: 318, w: 134, h: 128, at: 4 }, // 학생이 직접 그린 주석
];
const RealClass: React.FC<{ p: number; t: number }> = ({ p, t }) => {
  if (p <= 0) return null;
  const flash = Math.sin(Math.PI * Math.min(1, t / 6)) * (t < 6 ? 1 : 0);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: WIN.w, height: WIN.h - TITLE_H, overflow: "hidden", opacity: p }}>
      <Img
        src={staticFile("img/classroom-live.webp")}
        style={{ position: "absolute", left: REAL_DX, top: 0, width: REAL.w * REAL_K, height: REAL.h * REAL_K }}
      />
      {REAL_SPOTS.map((sp, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: REAL_DX + sp.x * REAL_K, top: sp.y * REAL_K, width: sp.w * REAL_K, height: sp.h * REAL_K }}
        >
          <Mark kind="circle" progress={ramp(t, sp.at, MARK_FRAMES.circle + 2, EASE_IN_OUT)} size={90} />
        </div>
      ))}
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.7 }} />
    </div>
  );
};

// ClassIn 교실 창. t = S4 로컬 프레임 (S5에서는 끝 상태로 다시 그린다). real = 실제 화면 매치 컷 0→1
export const ClassroomWindow: React.FC<{ t: number; endPress?: number; real?: number; realT?: number }> = ({
  t,
  endPress = 0,
  real = 0,
  realT = 0,
}) => {
  const called = ramp(t, BEATS[0], 12, EASE_IN_OUT);
  const handChip = ramp(t, BEATS[0] - 10, 8) * (1 - ramp(t, BEATS[0], 4));
  const [ax, ay] = arc(called, [96, 532], [seatX(4) + SEAT.w / 2, SEAT.y0 + 36], 140);
  const trophyFly = ramp(t, BEATS[3], 12, EASE_IN_OUT);
  const [tx, ty] = arc(trophyFly, [BOARD.x + BOARD.w + 52, toolY(3) + 26], [seatX(4) + SEAT.w / 2, SEAT.y0 + 30], 170);
  const burst = ramp(t, BEATS[3] + 12, 10);
  const activeTool = t >= BEATS[3] ? 3 : t >= BEATS[2] ? 2 : t >= BEATS[1] ? 1 : t >= BEATS[0] ? 0 : -1;

  return (
    <WindowFrame
      title="중2 수학 A반 · 이차함수"
      width={WIN.w}
      height={WIN.h}
      right={
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 15, color: COLOR.ink }}>
            <span style={{ width: 9, height: 9, borderRadius: 5, background: COLOR.lime }} /> LIVE 52:10
          </span>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 700,
              color: endPress > 0 ? COLOR.ink : COLOR.sub,
              background: endPress > 0 ? COLOR.lime : "#F0F1ED",
            }}
          >
            수업 종료
          </span>
        </span>
      }
    >
      <Seat i={0}>
        <SeatPerson name="박" label="선생님" tone={0} />
      </Seat>
      <Seat i={1}>
        <SeatPerson name="지" label="지우" tone={1} />
      </Seat>
      <Seat i={2}>
        <SeatPerson name="민" label="민서" tone={2} />
      </Seat>
      <Seat i={3}>
        <SeatPerson name="하" label="하준" tone={3} />
      </Seat>
      <Seat i={4} empty={called < 1} ring={ramp(t, BEATS[0] + 10, 6)}>
        {called >= 1 && <SeatPerson name="서" label="서연" tone={4} />}
      </Seat>
      <Seat i={5} empty />

      <div
        style={{
          position: "absolute",
          left: BOARD.x,
          top: BOARD.y,
          width: BOARD.w,
          height: BOARD.h,
          borderRadius: 16,
          border: `1px solid ${COLOR.line}`,
          background: COLOR.surface,
          backgroundImage: `linear-gradient(${COLOR.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLOR.grid} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          overflow: "hidden",
        }}
      >
        <BoardDrawing t={t} />
        <QuizCard t={t} />
        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 22,
            opacity: handChip,
            transform: `translateY(${(1 - ramp(t, BEATS[0] - 10, 8)) * 16}px)`,
          }}
        >
          <Chip icon="Hand" label="서연 손들기" on size={18} />
        </div>
      </div>

      {TOOLS.map((tool, i) => {
        const on = i === activeTool;
        return (
          <div
            key={tool.label}
            style={{
              position: "absolute",
              left: BOARD.x + BOARD.w + 20,
              top: toolY(i),
              width: 172,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
              fontSize: 18,
              fontWeight: 600,
              background: on ? COLOR.limeSoft : "transparent",
              border: `1.5px solid ${on ? COLOR.lime : "transparent"}`,
              color: on ? COLOR.ink : COLOR.sub,
            }}
          >
            <Icon name={tool.icon} size={26} color={on ? COLOR.limeInk : COLOR.sub} />
            {tool.label}
          </div>
        );
      })}

      {/* 강단으로 불려 올라가는 학생 */}
      {called > 0 && called < 1 && (
        <div style={{ position: "absolute", left: ax - 21, top: ay - 21 }}>
          <Avatar name="서" size={42} tone={4} ring={1} />
        </div>
      )}
      {called > 0 && called < 1 && <Cursor x={ax + 10} y={ay + 12} />}

      {/* 트로피 */}
      {trophyFly > 0 && trophyFly < 1 && (
        <div style={{ position: "absolute", left: tx - 26, top: ty - 26, transform: `rotate(${lerp(-20, 0, trophyFly)}deg)` }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: COLOR.lime, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Trophy" size={30} color={COLOR.ink} strokeWidth={2} />
          </div>
        </div>
      )}
      {burst > 0 && (
        <svg style={{ position: "absolute", left: seatX(4) + SEAT.w / 2 - 90, top: SEAT.y0 + 43 - 90, overflow: "visible" }} width={180} height={180}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r0 = lerp(30, 70, burst);
            const r1 = lerp(40, 92, burst);
            return (
              <line
                key={i}
                x1={90 + Math.cos(a) * r0}
                y1={90 + Math.sin(a) * r0}
                x2={90 + Math.cos(a) * r1}
                y2={90 + Math.sin(a) * r1}
                stroke={COLOR.lime}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={1 - burst}
              />
            );
          })}
        </svg>
      )}
      {burst > 0 && (
        <div
          style={{
            position: "absolute",
            left: seatX(4) + SEAT.w - 30,
            top: SEAT.y0 - 10,
            padding: "4px 10px",
            borderRadius: 999,
            background: COLOR.ink,
            color: COLOR.lime,
            fontSize: 16,
            fontWeight: 800,
            opacity: ramp(t, BEATS[3] + 12, 4),
            transform: `scale(${lerp(0.6, 1, ramp(t, BEATS[3] + 12, 8))})`,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icon name="Trophy" size={16} color={COLOR.lime} strokeWidth={2.4} />
          +1
        </div>
      )}
      <RealClass p={real} t={realT} />
    </WindowFrame>
  );
};


// ── 선 그림 창 (S3에서 그려지고, S4에서 실제 UI로 채워진다) ──────────────

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;

const WIRE: { d: string; at: number; len: number; main?: boolean }[] = [
  { d: rr(0, 0, WIN.w, WIN.h, 22), at: 0, len: 0.45, main: true },
  { d: `M 0 ${TITLE_H} H ${WIN.w}`, at: 0.25, len: 0.3, main: true },
  ...Array.from({ length: 6 }, (_, i) => ({ d: rr(seatX(i), TITLE_H + SEAT.y0, SEAT.w, SEAT.h, 14), at: 0.3 + i * 0.05, len: 0.25 })),
  { d: rr(BOARD.x, TITLE_H + BOARD.y, BOARD.w, BOARD.h, 16), at: 0.45, len: 0.35 },
  ...TOOLS.map((_, i) => ({ d: rr(BOARD.x + BOARD.w + 20, TITLE_H + toolY(i), 172, 56, 14), at: 0.55 + i * 0.05, len: 0.2 })),
];

export const Wireframe: React.FC<{ p: number; label?: number }> = ({ p, label = 1 }) => (
  <svg width={WIN.w + 20} height={WIN.h + 20} style={{ position: "absolute", left: WIN.x - 10, top: WIN.y - 10, overflow: "visible" }}>
    <g transform="translate(10 10)" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {WIRE.map((w, i) => (
        <path
          key={i}
          d={w.d}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - ramp(p, w.at, w.len, EASE_IN_OUT)}
          stroke={w.main ? COLOR.limeInk : `${COLOR.ink}40`}
          strokeWidth={w.main ? 3 : 2}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={26 + i * 20} cy={TITLE_H / 2} r={6} fill={COLOR.line} opacity={ramp(p, 0.3 + i * 0.05, 0.1)} />
      ))}
      <text x={96} y={31} fontSize={19} fontWeight={800} fill={COLOR.ink} opacity={label * ramp(p, 0.5, 0.2)}>
        ClassIn
        <tspan fontWeight={500} fill={COLOR.sub}>
          {"  ·  온라인 교실"}
        </tspan>
      </text>
    </g>
  </svg>
);

// ── S4 ───────────────────────────────────────────────────────

const CHIP_ROW: { icon: IconName; label: string }[] = [
  { icon: "Presentation", label: "무대" },
  { icon: "PenLine", label: "판서" },
  { icon: "ListChecks", label: "퀴즈" },
  { icon: "Trophy", label: "트로피" },
];
const FILL = 18; // 선 그림 → 실제 UI로 채워지는 시간
const REAL_AT = 100; // 실제 수업 화면 매치 컷 (S4 로컬)

// 교실 창 + 아래 기능 칩. S4 끝 상태를 S5가 그대로 이어받는다.
const LiveWindow: React.FC<{ t: number; endPress?: number; label?: number }> = ({ t, endPress = 0, label = 1 }) => {
  const real = ramp(t, REAL_AT, 8, EASE_IN_OUT);
  return (
    <div style={{ position: "relative", width: WIN.w, height: WIN.h }}>
      <ClassroomWindow t={t} endPress={endPress} real={real} realT={t - REAL_AT} />
      <div style={{ position: "absolute", left: 22, top: -24, opacity: ramp(t, REAL_AT + 2, 6) * label, zIndex: 5 }}>
        <Chip icon="Monitor" label="실제 ClassIn 수업 화면" on size={18} style={{ boxShadow: shadow }} />
      </div>
    </div>
  );
};

export const S4Class: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S4");
  const end = s.from + s.duration;
  const live = t < s.duration;
  const fill = ramp(t, 0, FILL, EASE_IN_OUT);
  const [lead, ...verbs] = s.cues;
  return (
    <Layer>
      {live && (
        <>
          {/* 선 그림 창이 같은 자리에서 실제 UI로 채워진다 */}
          <div style={{ opacity: 1 - ramp(t, FILL - 4, 8) }}>
            <Wireframe p={1} />
          </div>
          <div
            style={{
              position: "absolute",
              left: WIN.x,
              top: WIN.y,
              clipPath: `inset(-40px ${(1 - fill) * 100}% -40px -40px round 22px)`,
            }}
          >
            <LiveWindow t={t} />
          </div>
          {fill > 0 && fill < 1 && (
            <div
              style={{
                position: "absolute",
                left: WIN.x + fill * WIN.w - 3,
                top: WIN.y - 12,
                width: 6,
                height: WIN.h + 24,
                borderRadius: 3,
                background: COLOR.lime,
                boxShadow: `0 0 24px ${COLOR.lime}`,
              }}
            />
          )}
          <div style={{ position: "absolute", left: WIN.x, top: WIN.y + WIN.h + 34, display: "flex", gap: 12 }}>
            {CHIP_ROW.map((c, i) => {
              const on = ramp(t, BEATS[i], 6);
              return (
                <Chip
                  key={c.label}
                  icon={c.icon}
                  label={c.label}
                  on={on > 0}
                  style={{ opacity: ramp(t, 10 + i * 3, 10), transform: `scale(${1 + 0.12 * Math.sin(Math.PI * on)})` }}
                />
              );
            })}
          </div>
        </>
      )}

      <div style={{ position: "absolute", left: 120, top: 236 }}>
        <Eyebrow index={1} text={s.eyebrow!} at={s.from + 10} out={end} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 292 }}>
        <CopyLine cue={lead} out={end} />
      </div>
      {verbs.map((cue, i) => {
        const next = verbs[i + 1];
        return (
          <div key={cue.at} style={{ position: "absolute", left: 120, top: 374 + i * 98 }}>
            <CopyLine cue={cue} out={end} dim={next ? ramp(s.from + t, next.at, 8) : 0} />
          </div>
        );
      })}
    </Layer>
  );
};

// ── S5 ───────────────────────────────────────────────────────

const RECORDS: { icon: IconName; label: string; value: string }[] = [
  { icon: "CirclePlay", label: "수업 녹화", value: "52:10" },
  { icon: "UserCheck", label: "출결", value: "24 / 24" },
  { icon: "PenLine", label: "판서", value: "12장" },
  { icon: "ListChecks", label: "퀴즈 정답률", value: "76%" },
  { icon: "Trophy", label: "트로피", value: "9개" },
  { icon: "MessageCircle", label: "질문 · 채팅", value: "31건" },
];
const PANEL = { x: 790, y: 372, w: 990, rowH: 72, head: 66 };
const PANEL_H = 22 * 2 + PANEL.head + RECORDS.length * PANEL.rowH;
const THUMB = { x: 150, y: 470, scale: 0.46 };
const END_BTN = { x: WIN.x + WIN.w - 18 - 92, y: WIN.y + 9, w: 92, h: 30 }; // 교실 창 '수업 종료' 버튼
const SHOT = 52; // 기록 패널 → 실제 과정 화면
const S4_END = 140; // S4의 모든 동작이 끝난 상태

export const S5Record: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S5");
  const end = s.from + s.duration;
  const reach = ramp(t, 0, 7, EASE_IN_OUT);
  const press = ramp(t, 7, 8);
  const shrink = ramp(t, 10, 18, EASE_IN_OUT);
  const thumbCx = THUMB.x + (WIN.w * THUMB.scale) / 2;
  const thumbCy = THUMB.y + (WIN.h * THUMB.scale) / 2;
  const pan = ramp(t, s.duration, PAN, EASE_IN_OUT); // S6로 카메라 팬
  const recCircle = ramp(t, 44, MARK_FRAMES.circle, EASE_IN_OUT);

  return (
    <Layer>
      {pan < 1 && (
        <AbsoluteFill style={{ transform: `translateX(${-pan * 1920}px)` }}>
          {/* 교실 창 → 녹화 카드 */}
          <div
            style={{
              position: "absolute",
              left: lerp(WIN.x, THUMB.x, shrink),
              top: lerp(WIN.y, THUMB.y, shrink),
              width: WIN.w,
              height: WIN.h,
              transform: `scale(${lerp(1, THUMB.scale, shrink)})`,
              transformOrigin: "0 0",
            }}
          >
            <LiveWindow t={S4_END} endPress={press} label={1 - ramp(t, 8, 6)} />
            <AbsoluteFill
              style={{
                borderRadius: 22,
                background: "rgba(247,247,242,0.72)",
                opacity: ramp(t, 20, 10),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 85,
                  background: COLOR.lime,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: shadow,
                  transform: `scale(${lerp(0.6, 1, ramp(t, 20, 10))})`,
                }}
              >
                <Icon name="Play" size={84} color={COLOR.ink} strokeWidth={2.4} />
              </div>
            </AbsoluteFill>
          </div>
          <Spotlight rect={END_BTN} p={ramp(t, 0, 6) * (1 - ramp(t, 10, 6))} radius={20} pad={8} />
          {t < 13 && (
            <Cursor
              x={lerp(1540, END_BTN.x + 46, reach)}
              y={lerp(430, END_BTN.y + 18, reach)}
              press={press}
              opacity={ramp(t, 0, 3) * (1 - ramp(t, 10, 3))}
            />
          )}
          <div
            style={{
              position: "absolute",
              left: THUMB.x,
              top: THUMB.y + WIN.h * THUMB.scale + 22,
              opacity: ramp(t, 26, 10),
              display: "flex",
              gap: 10,
            }}
          >
            <Chip icon="CircleDot" label="자동 녹화" on size={18} />
            <Chip icon="CloudCheck" label="수업 종료와 동시에 저장" size={18} />
          </div>

          {/* 수업 기록 패널 */}
          <div
            style={{
              position: "absolute",
              left: PANEL.x,
              top: PANEL.y,
              width: PANEL.w,
              height: PANEL_H,
              boxSizing: "border-box",
              padding: "22px 28px",
              background: COLOR.surface,
              borderRadius: 22,
              border: `1px solid ${COLOR.line}`,
              boxShadow: shadow,
              opacity: ramp(t, 22, 10),
              transform: `translateY(${(1 - ramp(t, 22, 14)) * 30}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, height: PANEL.head }}>
              <span style={{ fontSize: 28, fontWeight: 800 }}>수업 기록</span>
              <span style={{ fontSize: 18, color: COLOR.sub }}>중2 수학 A반 · 3월 12일 19:00 – 19:52 · 박서준 강사</span>
            </div>
            {RECORDS.map((r, i) => {
              const fill = ramp(t, 28 + i * 4, 6);
              return (
                <div
                  key={r.label}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    height: PANEL.rowH,
                    borderTop: `1px solid ${COLOR.line}`,
                    opacity: lerp(0.35, 1, fill),
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: fill > 0.5 ? COLOR.limeSoft : "#F3F4F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={r.icon} size={24} color={fill > 0.5 ? COLOR.limeInk : COLOR.sub} />
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 600 }}>{r.label}</span>
                  <span
                    style={{
                      position: "relative",
                      marginLeft: "auto",
                      fontSize: 26,
                      fontWeight: 800,
                      fontVariantNumeric: "tabular-nums",
                      opacity: fill,
                      transform: `translateX(${(1 - fill) * 20}px)`,
                    }}
                  >
                    {/* 녹화 줄 — 실제 화면의 녹화 버튼과 같은 것을 먼저 벡터에서 짚는다 */}
                    {i === 0 && <Mark kind="circle" progress={recCircle} size={60} />}
                    {r.value}
                  </span>
                  <Icon name="Check" size={26} color={COLOR.limeInk} strokeWidth={3} progress={ramp(t, 30 + i * 4, 6)} />
                </div>
              );
            })}
          </div>

          {/* 녹화 카드 → 기록 행으로 날아가는 데이터 */}
          {RECORDS.map((_, i) => {
            const p = ramp(t, 22 + i * 4, 9, EASE_IN_OUT);
            if (p <= 0 || p >= 1) return null;
            const rowY = PANEL.y + 22 + PANEL.head + i * PANEL.rowH + PANEL.rowH / 2;
            const [x, y] = arc(p, [thumbCx, thumbCy], [PANEL.x + 50, rowY], 60);
            return (
              <div
                key={i}
                style={{ position: "absolute", left: x - 9, top: y - 9, width: 18, height: 18, borderRadius: 9, background: COLOR.lime, boxShadow: `0 0 0 6px ${COLOR.lime}40` }}
              />
            );
          })}

          {/* 기록 패널이 그대로 실제 과정 화면으로 펼쳐진다 — 끝난 수업마다 녹화·리포트 */}
          <RealShot
            src="img/lms-course-winter.png"
            native={[1391, 832]}
            width={960}
            x={810}
            y={330}
            t={t - SHOT}
            from={{ x: PANEL.x, y: PANEL.y, w: PANEL.w, h: PANEL_H }}
            label="실제 ClassIn 과정 화면"
            spots={[
              { x: 986, y: 618, w: 84, h: 40, kind: "circle", at: 4 },
              { x: 755, y: 641, w: 50, h: 16, kind: "underline", at: 9 },
            ]}
          />
        </AbsoluteFill>
      )}

      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow index={2} text={s.eyebrow!} at={s.from + 6} out={end} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 150 }}>
        <CopyLine cue={s.cues[0]} out={end} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 214 }}>
        <CopyLine cue={s.cues[1]} size={96} out={end} />
      </div>
    </Layer>
  );
};
