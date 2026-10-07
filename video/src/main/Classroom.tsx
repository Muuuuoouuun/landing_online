import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { MONO } from "../fonts";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import { arc, Avatar, Chip, CopyLine, Cursor, EASE_IN_OUT, Eyebrow, lerp, ramp, SceneShell, shadow, WindowFrame } from "./kit";

// S3 수업 · S4 데이터 — ClassIn 교실 창에서 상호작용이 일어나고, 수업이 끝나면 전부 기록으로 쌓인다.

const WIN = { x: 820, y: 196, w: 1000, h: 640 };
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
// 동사 타이밍 (S3 로컬): 무대 · 판서 · 퀴즈 · 트로피
const BEATS = [16, 34, 52, 70];
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
  const teacher = ramp(t, 34, 14, EASE_IN_OUT);
  const student = ramp(t, 42, 10, EASE_IN_OUT);
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
      <text x={70} y={70} fontSize={30} fontWeight={700} fill={COLOR.ink} opacity={ramp(t, 34, 8)} fontStyle="italic">
        y = x² − 4x + 3
      </text>
      <g opacity={ramp(t, 46, 8)}>
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
  const p = ramp(t, 52, 10);
  const bars = ramp(t, 56, 12);
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

// ClassIn 교실 창. t = S3 로컬 프레임 (S4에서는 끝 상태 t=90으로 다시 그린다)
export const ClassroomWindow: React.FC<{ t: number; endPress?: number }> = ({ t, endPress = 0 }) => {
  const called = ramp(t, BEATS[0], 12, EASE_IN_OUT);
  const handChip = ramp(t, 6, 8) * (1 - ramp(t, BEATS[0], 4));
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
            transform: `translateY(${(1 - ramp(t, 6, 8)) * 16}px)`,
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
    </WindowFrame>
  );
};

const CHIP_ROW: { icon: IconName; label: string }[] = [
  { icon: "Presentation", label: "무대" },
  { icon: "PenLine", label: "판서" },
  { icon: "ListChecks", label: "퀴즈" },
  { icon: "Trophy", label: "트로피" },
];

export const S3Classroom: React.FC = () => {
  const s = sceneById("S3");
  const t = useCurrentFrame();
  const enter = ramp(t, 0, 16);
  const [lead, ...verbs] = s.cues;
  return (
    <SceneShell from={s.from} duration={s.duration} enter={6} exit={0}>
      <div style={{ position: "absolute", left: 120, top: 236 }}>
        <Eyebrow text={s.eyebrow!} at={s.from + 2} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 292 }}>
        <CopyLine cue={lead} />
      </div>
      {verbs.map((cue, i) => {
        const next = verbs[i + 1];
        return (
          <div key={cue.at} style={{ position: "absolute", left: 120, top: 374 + i * 98 }}>
            <CopyLine cue={cue} dim={next && s.from + t >= next.at ? 1 : 0} />
          </div>
        );
      })}

      <div style={{ position: "absolute", left: WIN.x, top: WIN.y, opacity: enter, transform: `translateY(${(1 - enter) * 60}px)` }}>
        <div style={{ position: "relative", width: WIN.w, height: WIN.h }}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <ClassroomWindow t={t} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: WIN.x, top: WIN.y + WIN.h + 34, display: "flex", gap: 12 }}>
        {CHIP_ROW.map((c, i) => (
          <Chip key={c.label} icon={c.icon} label={c.label} on={t >= BEATS[i]} style={{ opacity: ramp(t, 8 + i * 2, 10) }} />
        ))}
      </div>
    </SceneShell>
  );
};

// ── S4 ───────────────────────────────────────────────────────

const RECORDS: { icon: IconName; label: string; value: string }[] = [
  { icon: "CirclePlay", label: "수업 녹화", value: "52:10" },
  { icon: "UserCheck", label: "출결", value: "24 / 24" },
  { icon: "PenLine", label: "판서", value: "12장" },
  { icon: "ListChecks", label: "퀴즈 정답률", value: "76%" },
  { icon: "Trophy", label: "트로피", value: "9개" },
  { icon: "MessageCircle", label: "질문 · 채팅", value: "31건" },
];
const PANEL = { x: 790, y: 372, w: 990, rowH: 72 };
const THUMB = { x: 150, y: 470, scale: 0.46 };

export const S4Data: React.FC = () => {
  const s = sceneById("S4");
  const t = useCurrentFrame();
  const press = ramp(t, 4, 8);
  const shrink = ramp(t, 8, 18, EASE_IN_OUT);
  const thumbCx = THUMB.x + (WIN.w * THUMB.scale) / 2;
  const thumbCy = THUMB.y + (WIN.h * THUMB.scale) / 2;

  return (
    <SceneShell from={s.from} duration={s.duration} enter={0} exit={8}>
      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow text={s.eyebrow!} at={s.from + 10} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 150 }}>
        <CopyLine cue={s.cues[0]} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 214 }}>
        <CopyLine cue={s.cues[1]} size={96} />
      </div>

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
        <ClassroomWindow t={90} endPress={press} />
        <AbsoluteFill
          style={{
            borderRadius: 22,
            background: "rgba(247,247,242,0.72)",
            opacity: ramp(t, 18, 10),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 170, height: 170, borderRadius: 85, background: COLOR.lime, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: shadow }}>
            <Icon name="Play" size={84} color={COLOR.ink} strokeWidth={2.4} />
          </div>
        </AbsoluteFill>
      </div>
      {t < 10 && <Cursor x={WIN.x + WIN.w - 70} y={WIN.y + 30} press={press} opacity={ramp(t, 0, 3)} />}
      <div
        style={{
          position: "absolute",
          left: THUMB.x,
          top: THUMB.y + WIN.h * THUMB.scale + 22,
          opacity: ramp(t, 24, 10),
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
          padding: "22px 28px",
          background: COLOR.surface,
          borderRadius: 22,
          border: `1px solid ${COLOR.line}`,
          boxShadow: shadow,
          opacity: ramp(t, 30, 10),
          transform: `translateY(${(1 - ramp(t, 30, 14)) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
          <span style={{ fontSize: 28, fontWeight: 800 }}>수업 기록</span>
          <span style={{ fontSize: 18, color: COLOR.sub }}>중2 수학 A반 · 3월 12일 19:00 – 19:52 · 박서준 강사</span>
        </div>
        {RECORDS.map((r, i) => {
          const fill = ramp(t, 48 + i * 5, 8);
          return (
            <div
              key={r.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                height: PANEL.rowH,
                borderTop: `1px solid ${COLOR.line}`,
                opacity: lerp(0.35, 1, fill),
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: fill > 0.5 ? COLOR.limeSoft : "#F3F4F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={r.icon} size={24} color={fill > 0.5 ? COLOR.limeInk : COLOR.sub} />
              </div>
              <span style={{ fontSize: 22, fontWeight: 600 }}>{r.label}</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 26,
                  fontWeight: 800,
                  fontVariantNumeric: "tabular-nums",
                  opacity: fill,
                  transform: `translateX(${(1 - fill) * 20}px)`,
                }}
              >
                {r.value}
              </span>
              <Icon name="Check" size={26} color={COLOR.limeInk} strokeWidth={3} progress={ramp(t, 52 + i * 5, 6)} />
            </div>
          );
        })}
      </div>

      {/* 녹화 카드 → 기록 행으로 날아가는 데이터 */}
      {RECORDS.map((_, i) => {
        const p = ramp(t, 40 + i * 5, 9, EASE_IN_OUT);
        if (p <= 0 || p >= 1) return null;
        const rowY = PANEL.y + 22 + 48 + i * PANEL.rowH + PANEL.rowH / 2;
        const [x, y] = arc(p, [thumbCx, thumbCy], [PANEL.x + 50, rowY], 60);
        return <div key={i} style={{ position: "absolute", left: x - 9, top: y - 9, width: 18, height: 18, borderRadius: 9, background: COLOR.lime, boxShadow: `0 0 0 6px ${COLOR.lime}40` }} />;
      })}
    </SceneShell>
  );
};
