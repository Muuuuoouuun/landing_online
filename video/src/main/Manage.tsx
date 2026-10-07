import React from "react";
import { useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { CompareCounter, RadarChart, ScoreRing } from "../elements";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import { Avatar, Chip, CopyLine, Cursor, EASE_IN_OUT, Eyebrow, lerp, ramp, RealShot, SceneShell, shadow } from "./kit";

// S5 관리 · S6 AI 강의 평가 — 쌓인 데이터가 강사 표를 채우고, 클릭 한 번에 강사 카드가 펼쳐진다.
// 표의 숫자는 화면 연출용 예시다.

const TEACHERS = [
  { name: "김지현", initial: "김", cls: "중1 영어 · 2개 반", classes: 42, att: 98.6, ai: 92, trend: [5, 6, 6, 7, 8, 8, 9] },
  { name: "박서준", initial: "박", cls: "중2 수학 · 3개 반", classes: 38, att: 99.1, ai: 91, trend: [4, 5, 7, 6, 8, 9, 9] },
  { name: "이하은", initial: "이", cls: "고1 국어 · 2개 반", classes: 45, att: 97.8, ai: 88, trend: [6, 6, 5, 7, 7, 8, 8] },
  { name: "최민호", initial: "최", cls: "중3 과학 · 2개 반", classes: 36, att: 98.2, ai: 90, trend: [5, 5, 6, 6, 7, 7, 8] },
  { name: "정유나", initial: "정", cls: "초6 수학 · 3개 반", classes: 40, att: 99.4, ai: 93, trend: [6, 7, 7, 8, 8, 9, 9] },
];
const TABLE = { x: 150, y: 430, w: 1000, head: 58, rowH: 86 };
const COLS = [330, 150, 150, 160, 160]; // 강사 · 수업 · 출결 · AI 평가 · 추이
const rowY = (i: number) => TABLE.y + TABLE.head + i * TABLE.rowH;

const Spark: React.FC<{ values: number[]; p: number }> = ({ values, p }) => {
  const w = 120;
  const h = 36;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / 10) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={COLOR.limeInk} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
    </svg>
  );
};

const Stat: React.FC<{ icon: IconName; label: string; value: string }> = ({ icon, label, value }) => (
  <div style={{ flex: 1, padding: "16px 18px", borderRadius: 16, background: "#F6F7F3", border: `1px solid ${COLOR.line}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.sub }}>
      <Icon name={icon} size={18} color={COLOR.limeInk} /> {label}
    </div>
    <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </div>
);

const RECENT = [
  { date: "3월 12일", cls: "중2 수학 A반", len: "52:10" },
  { date: "3월 11일", cls: "중2 수학 B반", len: "50:42" },
  { date: "3월 10일", cls: "중2 수학 C반", len: "51:05" },
];

export const S5Manage: React.FC = () => {
  const s = sceneById("S5");
  const t = useCurrentFrame();
  const count = ramp(t, 10, 24, EASE_IN_OUT);
  const move = ramp(t, 36, 14, EASE_IN_OUT);
  const press = ramp(t, 52, 10);
  const picked = t >= 54;
  const card = ramp(t, 56, 14);
  const SHOT = 70; // 실사 컷 등장
  const cx = lerp(1180, TABLE.x + 250, move);
  const cy = lerp(1000, rowY(1) + 40, move);

  return (
    <SceneShell from={s.from} duration={s.duration} enter={8} exit={5}>
      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow text={s.eyebrow!} at={s.from + 4} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 150 }}>
        <CopyLine cue={s.cues[0]} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 214 }}>
        <CopyLine cue={s.cues[1]} size={96} />
      </div>

      {/* 강사 표 */}
      <div
        style={{
          position: "absolute",
          left: TABLE.x,
          top: TABLE.y,
          width: TABLE.w,
          height: TABLE.head + TEACHERS.length * TABLE.rowH + 14,
          background: COLOR.surface,
          borderRadius: 22,
          border: `1px solid ${COLOR.line}`,
          boxShadow: shadow,
          opacity: ramp(t, 2, 12),
          transform: `translateY(${(1 - ramp(t, 2, 16)) * 30}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: TABLE.head, padding: "0 28px", fontSize: 17, color: COLOR.sub, fontWeight: 600 }}>
          {["강사", "이번 달 수업", "출결률", "AI 강의 평가", "수업 추이"].map((h, i) => (
            <span key={h} style={{ width: COLS[i] }}>
              {h}
            </span>
          ))}
        </div>
        {TEACHERS.map((tc, i) => {
          const on = picked && i === 1;
          return (
            <div
              key={tc.name}
              style={{
                display: "flex",
                alignItems: "center",
                height: TABLE.rowH,
                margin: "0 12px",
                padding: "0 16px",
                borderRadius: 14,
                borderTop: on ? "none" : `1px solid ${COLOR.line}`,
                background: on ? COLOR.limeSoft : "transparent",
                boxShadow: on ? `inset 0 0 0 2px ${COLOR.lime}` : undefined,
                opacity: ramp(t, 4 + i * 3, 10),
                fontSize: 24,
                fontWeight: 800,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ width: COLS[0], display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar name={tc.initial} size={46} tone={i} />
                <span>
                  <div style={{ fontSize: 22 }}>{tc.name}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: COLOR.sub }}>{tc.cls}</div>
                </span>
              </span>
              <span style={{ width: COLS[1] }}>{Math.round(tc.classes * count)}회</span>
              <span style={{ width: COLS[2] }}>{(tc.att * count).toFixed(1)}%</span>
              <span style={{ width: COLS[3] }}>{Math.round(tc.ai * count)}</span>
              <span style={{ width: COLS[4] }}>
                <Spark values={tc.trend} p={count} />
              </span>
            </div>
          );
        })}
      </div>

      {/* 표로 흘러 들어가는 데이터 */}
      {TEACHERS.flatMap((_, i) =>
        [0, 1, 2].map((k) => {
          const p = ramp(t, 4 + i * 3 + k * 5, 18, EASE_IN_OUT);
          if (p <= 0 || p >= 1) return null;
          return (
            <div
              key={`${i}-${k}`}
              style={{
                position: "absolute",
                left: lerp(TABLE.x - 120, TABLE.x + 360 + k * 150, p) - 7,
                top: rowY(i) + TABLE.rowH / 2 - 7,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: COLOR.lime,
                opacity: Math.sin(Math.PI * p),
                boxShadow: `0 0 0 5px ${COLOR.lime}40`,
              }}
            />
          );
        }),
      )}
      <div style={{ position: "absolute", right: 1920 - TABLE.x - TABLE.w, top: TABLE.y - 54, opacity: ramp(t, 20, 10) }}>
        <Chip icon="Database" label="수업 기록 1,284건 · 자동 집계" on size={18} />
      </div>

      {/* 클릭 한 번 → 강사 카드 */}
      {t >= 34 && <Cursor x={cx} y={cy} press={press} opacity={ramp(t, 34, 6)} />}
      <div
        style={{
          position: "absolute",
          left: 1196,
          top: 380,
          width: 600,
          padding: 28,
          background: COLOR.surface,
          borderRadius: 24,
          border: `1px solid ${COLOR.line}`,
          boxShadow: shadow,
          opacity: card,
          transform: `translateX(${(1 - card) * 80}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar name="박" size={68} tone={1} ring={1} />
          <div>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.03em" }}>박서준 강사</div>
            <div style={{ fontSize: 17, color: COLOR.sub }}>중2 수학 · 3개 반 · 학생 72명</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <Stat icon="CalendarDays" label="이번 달 수업" value="38회" />
          <Stat icon="UserCheck" label="출결률" value="99.1%" />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Stat icon="Sparkles" label="AI 강의 평가" value="91" />
          <Stat icon="CirclePlay" label="녹화 · 판서" value="38건" />
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: COLOR.sub, margin: "22px 0 6px" }}>최근 수업 기록</div>
        {RECENT.map((r, i) => (
          <div
            key={r.date}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              height: 54,
              borderTop: `1px solid ${COLOR.line}`,
              fontSize: 19,
              opacity: ramp(t, 64 + i * 4, 8),
            }}
          >
            <Icon name="CirclePlay" size={24} color={COLOR.limeInk} />
            <span style={{ fontWeight: 700 }}>{r.date}</span>
            <span style={{ color: COLOR.sub }}>{r.cls}</span>
            <span style={{ marginLeft: "auto", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.len}</span>
          </div>
        ))}
      </div>

      {/* 실제 과정 화면 — 정규·보강(결석자) 반, 일일 과제, 채점까지 한 과정에 */}
      <RealShot
        src="img/lms-course-special.png"
        native={[1391, 832]}
        width={1000}
        x={800}
        y={392}
        t={t - SHOT}
        label="실제 ClassIn 과정 화면"
        spots={[
          { x: 30, y: 205, w: 98, h: 35, kind: "circle", at: 6 },
          { x: 986, y: 653, w: 84, h: 39, kind: "circle", at: 9 },
          { x: 383, y: 684, w: 84, h: 12, kind: "underline", at: 12 },
        ]}
      />
    </SceneShell>
  );
};

// ── S6 ───────────────────────────────────────────────────────


const Metric: React.FC<{ icon: IconName; label: string; value: string; p: number }> = ({ icon, label, value, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, height: 52, borderTop: `1px solid ${COLOR.line}`, opacity: p }}>
    <Icon name={icon} size={22} color={COLOR.limeInk} />
    <span style={{ fontSize: 18, color: COLOR.sub }}>{label}</span>
    <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 800 }}>{value}</span>
  </div>
);

// ClassIn 과정 화면 사이드바의 '에이전트' 영역을 그대로 옮긴 것 (원본 캡처는 확대하기엔 해상도가 낮다)
const AGENTS = [
  { name: "AI 튜터", tone: 0 },
  { name: "AI 평가", tone: 1, isNew: true },
  { name: "레전드 공부 친구", tone: 2 },
  { name: "ClassIn Math Guide KR", tone: 3 },
];
const AGENT = { x: 150, y: 410, w: 560, rowH: 64 };

export const S6AI: React.FC = () => {
  const s = sceneById("S6");
  const t = useCurrentFrame();
  const move = ramp(t, 0, 7, EASE_IN_OUT);
  const press = ramp(t, 8, 8);
  const picked = t >= 9;
  const card = ramp(t, 14, 14);
  const score = ramp(t, 20, 20, EASE_IN_OUT);
  const target = { x: AGENT.x + 150, y: AGENT.y + 70 + AGENT.rowH * 1 + 34 };

  return (
    <SceneShell from={s.from} duration={s.duration} enter={6} exit={8}>
      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow text={s.eyebrow!} at={s.from + 2} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 150 }}>
        <CopyLine cue={s.cues[0]} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 214 }}>
        <CopyLine cue={s.cues[1]} size={96} />
      </div>

      {/* 사이드바 › 에이전트 › AI 평가 */}
      <div
        style={{
          position: "absolute",
          left: AGENT.x,
          top: AGENT.y,
          width: AGENT.w,
          padding: "18px 14px",
          background: COLOR.surface,
          borderRadius: 22,
          border: `1px solid ${COLOR.line}`,
          boxShadow: shadow,
          opacity: ramp(t, 0, 8),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 12px 10px", fontSize: 18, color: COLOR.sub, fontWeight: 600 }}>
          에이전트
          <span style={{ marginLeft: "auto", display: "flex", gap: 14 }}>
            <Icon name="Sparkles" size={20} color={COLOR.sub} />
          </span>
        </div>
        {AGENTS.map((ag, i) => {
          const on = picked && ag.isNew;
          return (
            <div
              key={ag.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                height: AGENT.rowH,
                padding: "0 12px",
                borderRadius: 14,
                fontSize: 22,
                fontWeight: 600,
                background: on ? COLOR.limeSoft : "transparent",
                boxShadow: on ? `inset 0 0 0 2px ${COLOR.lime}` : undefined,
                opacity: ramp(t, 2 + i * 2, 6),
              }}
            >
              <Avatar name={ag.name.slice(0, 1)} size={38} tone={ag.tone} />
              {ag.name}
              {ag.isNew && (
                <span style={{ padding: "2px 9px", borderRadius: 999, background: "#F04E3A", color: "#fff", fontSize: 13, fontWeight: 800 }}>NEW</span>
              )}
            </div>
          );
        })}
      </div>
      {t < 30 && <Cursor x={lerp(target.x + 260, target.x, move)} y={lerp(target.y + 120, target.y, move)} press={press} opacity={1 - ramp(t, 24, 6)} />}

      <div style={{ position: "absolute", left: AGENT.x, top: AGENT.y + 380, opacity: ramp(t, 28, 10) }}>
        <CompareCounter progress={ramp(t, 30, 20, EASE_IN_OUT)} />
      </div>

      {/* AI 강의 평가 카드 — 점수는 기본 폰트 */}
      <div
        style={{
          position: "absolute",
          left: 870,
          top: 360,
          width: 910,
          padding: "26px 30px",
          background: COLOR.surface,
          borderRadius: 24,
          border: `1px solid ${COLOR.line}`,
          boxShadow: shadow,
          opacity: card,
          transform: `translateY(${(1 - card) * 40}px) scale(${lerp(0.96, 1, card)})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="Sparkles" size={28} color={COLOR.limeInk} />
          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>AI 강의 평가</span>
          <span style={{ fontSize: 18, color: COLOR.sub, marginLeft: 8 }}>박서준 강사 · 중2 수학 A반 · 3월 12일</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
          <ScoreRing score={92} progress={score} size={220} label={false} />
          <RadarChart values={[0.92, 0.74, 0.88, 0.8, 0.7]} progress={score} size={280} />
          <div style={{ flex: 1 }}>
            <Metric icon="MessageCircle" label="학생 발화" value="42%" p={ramp(t, 26, 8)} />
            <Metric icon="Hand" label="상호작용" value="38회" p={ramp(t, 30, 8)} />
            <Metric icon="Clock" label="질문 후 대기" value="1.8초" p={ramp(t, 34, 8)} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
            padding: "14px 18px",
            borderRadius: 14,
            background: COLOR.limeSoft,
            fontSize: 19,
            opacity: ramp(t, 38, 8),
          }}
        >
          <Icon name="Lightbulb" size={22} color={COLOR.limeInk} />
          <b>개선 포인트</b>
          <span style={{ color: COLOR.sub }}>질문 뒤, 학생이 답할 시간을 조금 더 주세요</span>
        </div>
      </div>
    </SceneShell>
  );
};
