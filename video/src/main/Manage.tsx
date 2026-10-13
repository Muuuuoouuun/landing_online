import React from "react";
import { AbsoluteFill } from "remotion";
import { COLOR } from "../brand";
import { ClassroomWall, CompareCounter, RadarChart, ScoreRing } from "../elements";
import { Icon, IconName } from "../icons";
import { sceneById } from "../timeline";
import { Avatar, Chip, CopyLine, Cursor, EASE_IN_OUT, Eyebrow, Layer, lerp, PAN, ramp, RealShot, Rect, shadow, Spotlight } from "./kit";

// S6 관리 · S7 AI 강의 평가 — 쌓인 데이터가 강사 표를 채우고, 클릭 한 번에 강사 카드가 펼쳐진다.
// 강사 카드의 'AI 강의 평가' 타일이 그대로 커져 S7의 평가 카드가 된다(공유 요소 줌).
// 표의 숫자는 화면 연출용 예시다.

const TEACHERS = [
  { name: "김지현", initial: "김", cls: "중1 영어 · 2개 반", classes: 42, att: 98.6, ai: 90, trend: [5, 6, 6, 7, 8, 8, 9] },
  { name: "박서준", initial: "박", cls: "중2 수학 · 3개 반", classes: 38, att: 99.1, ai: 92, trend: [4, 5, 7, 6, 8, 9, 9] },
  { name: "이하은", initial: "이", cls: "고1 국어 · 2개 반", classes: 45, att: 97.8, ai: 88, trend: [6, 6, 5, 7, 7, 8, 8] },
  { name: "최민호", initial: "최", cls: "중3 과학 · 2개 반", classes: 36, att: 98.2, ai: 89, trend: [5, 5, 6, 6, 7, 7, 8] },
  { name: "정유나", initial: "정", cls: "초6 수학 · 3개 반", classes: 40, att: 99.4, ai: 93, trend: [6, 7, 7, 8, 8, 9, 9] },
];
const TABLE = { x: 150, y: 430, w: 1000, head: 58, rowH: 86 };
const COLS = [330, 150, 150, 160, 160]; // 강사 · 수업 · 출결 · AI 평가 · 추이
const rowY = (i: number) => TABLE.y + TABLE.head + i * TABLE.rowH;
const PICK = 1; // 박서준

// 강사 카드 — 내용 폭 600, 안쪽 여백 28, 지표 칸 높이 고정(공유 요소 줌의 출발 사각형을 정확히 알기 위해)
const CARD = { x: 1196, y: 340, w: 600, pad: 28 };
const STAT_H = 96;
const AI_TILE: Rect = {
  x: CARD.x + 1 + CARD.pad,
  y: CARD.y + 1 + CARD.pad + 68 + 22 + STAT_H + 12,
  w: (CARD.w - 12) / 2,
  h: STAT_H,
};
// S7 AI 강의 평가 카드
const AI_CARD: Rect = { x: 870, y: 340, w: 910, h: 444 };

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

const Stat: React.FC<{ icon: IconName; label: string; value: string; style?: React.CSSProperties }> = ({ icon, label, value, style }) => (
  <div
    style={{
      flex: 1,
      height: STAT_H,
      boxSizing: "border-box",
      padding: "16px 18px",
      borderRadius: 16,
      background: "#F6F7F3",
      border: `1px solid ${COLOR.line}`,
      ...style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.sub }}>
      <Icon name={icon} size={18} color={COLOR.limeInk} /> {label}
    </div>
    <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{value}</div>
  </div>
);

const RECENT = [
  { date: "3월 12일", cls: "중2 수학 A반", len: "52:10" },
  { date: "3월 11일", cls: "중2 수학 B반", len: "50:42" },
];


// ── S6 ───────────────────────────────────────────────────────

const SHOT6 = 18; // 실제 과정 화면 (S6 로컬)

export const S6Manage: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S6");
  const end = s.from + s.duration;
  const panIn = 1 - ramp(t, 0, PAN, EASE_IN_OUT); // S5에서 카메라 팬으로 들어온다
  const leave = ramp(t, s.duration, 10, EASE_IN_OUT); // S7 줌이 시작되면 뒤로 물러남
  const count = ramp(t, 10, 24, EASE_IN_OUT);

  // 커서: 강사 한 명 클릭 → 카드의 AI 강의 평가 타일 클릭
  const toRow = ramp(t, 46, 9, EASE_IN_OUT);
  const pressRow = ramp(t, 55, 8);
  const picked = t >= 56;
  const card = ramp(t, 58, 12);
  const toTile = ramp(t, 64, 11, EASE_IN_OUT);
  const pressTile = ramp(t, 77, 8);
  const tileOn = ramp(t, 78, 3);
  const row = { x: TABLE.x + 250, y: rowY(PICK) + 40 };
  const tile = { x: AI_TILE.x + AI_TILE.w / 2, y: AI_TILE.y + AI_TILE.h / 2 + 8 };
  const cx = t < 64 ? lerp(1150, row.x, toRow) : lerp(row.x, tile.x, toTile);
  const cy = t < 64 ? lerp(900, row.y, toRow) : lerp(row.y, tile.y, toTile);

  return (
    <Layer>
      {leave < 1 && (
        <AbsoluteFill
          style={{
            transform: `translateX(${panIn * 1920}px) scale(${lerp(1, 0.97, leave)})`,
            opacity: 1 - leave,
          }}
        >
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
              const on = picked && i === PICK;
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
                    opacity: ramp(t, 2 + i * 3, 10),
                    fontSize: 24,
                    fontWeight: 800,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <span style={{ width: COLS[0], display: "flex", alignItems: "center", gap: 14 }}>
                    <Avatar name={tc.initial} size={46} tone={i} ring={on ? 1 : 0} />
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

          {/* 표로 흘러 들어가는 기록 */}
          {TEACHERS.flatMap((_, i) =>
            [0, 1, 2].map((k) => {
              const p = ramp(t, 6 + i * 3 + k * 5, 18, EASE_IN_OUT);
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
          <div style={{ position: "absolute", right: 1920 - TABLE.x - TABLE.w, top: TABLE.y - 54, opacity: ramp(t, 16, 10) }}>
            <Chip icon="Database" label="수업 기록 1,284건 · 자동 집계" on size={18} />
          </div>

          <Spotlight
            rect={{ x: TABLE.x + 12, y: rowY(PICK), w: TABLE.w - 24, h: TABLE.rowH }}
            p={ramp(t, 46, 6) * (1 - ramp(t, 58, 6))}
            radius={18}
            pad={6}
          />

          {/* 클릭 한 번 → 강사 카드 */}
          <div
            style={{
              position: "absolute",
              left: CARD.x,
              top: CARD.y,
              width: CARD.w,
              padding: CARD.pad,
              background: COLOR.surface,
              borderRadius: 24,
              border: `1px solid ${COLOR.line}`,
              boxShadow: shadow,
              opacity: card,
              transform: `translateX(${(1 - card) * 80}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, height: 68 }}>
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
              <Stat
                icon="Sparkles"
                label="AI 강의 평가"
                value="92"
                style={{ background: tileOn ? COLOR.limeSoft : undefined, boxShadow: tileOn ? `inset 0 0 0 2px ${COLOR.lime}` : undefined }}
              />
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
          {t >= 44 && t < s.duration && (
            <Cursor x={cx} y={cy} press={t < 64 ? pressRow : pressTile} opacity={ramp(t, 44, 5)} />
          )}

          {/* 실제 과정 화면 — 정규·보강(결석자) 반, 일일 과제, 채점까지 한 과정에 */}
          <RealShot
            src="img/lms-course-special.png"
            native={[1391, 832]}
            width={960}
            x={810}
            y={330}
            t={t - SHOT6}
            exit={26}
            label="실제 ClassIn 과정 화면"
            spots={[
              { x: 30, y: 205, w: 98, h: 35, kind: "circle", at: 8 },
              { x: 986, y: 653, w: 84, h: 39, kind: "circle", at: 11 },
              { x: 383, y: 684, w: 84, h: 12, kind: "underline", at: 14 },
            ]}
          />
        </AbsoluteFill>
      )}

      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow index={3} text={s.eyebrow!} at={s.from + 8} out={end} />
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

// ── S7 ───────────────────────────────────────────────────────

const Metric: React.FC<{ icon: IconName; label: string; value: string; p: number }> = ({ icon, label, value, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, height: 52, borderTop: `1px solid ${COLOR.line}`, opacity: p }}>
    <Icon name={icon} size={22} color={COLOR.limeInk} />
    <span style={{ fontSize: 18, color: COLOR.sub }}>{label}</span>
    <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 800 }}>{value}</span>
  </div>
);

const WALL = { x: 150, y: 410, cell: 44 };
const WALL_W = 8 * WALL.cell + 7 * 5;
const WALL_H = 6 * ((WALL.cell * 9) / 16 + 2) + 5 * 5;

// S7 화면(카피 제외). S8 줌 아웃 때 노트북 화면 속으로 그대로 들어간다.
export const S7Body: React.FC<{ t: number }> = ({ t }) => {
  const m = ramp(t, 0, 16, EASE_IN_OUT);
  const box = {
    x: lerp(AI_TILE.x, AI_CARD.x, m),
    y: lerp(AI_TILE.y, AI_CARD.y, m),
    w: lerp(AI_TILE.w, AI_CARD.w, m),
    h: lerp(AI_TILE.h, AI_CARD.h, m),
  };
  const content = ramp(t, 8, 8);
  const score = ramp(t, 16, 24, EASE_IN_OUT);
  const checked = ramp(t, 18, 30, EASE_IN_OUT);
  const scan = checked > 0 && checked < 1;
  return (
    <>
      {/* 이번 달 수업 48개를 AI가 전부 훑는다 */}
      <div style={{ position: "absolute", left: WALL.x, top: WALL.y, opacity: ramp(t, 6, 10) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 19, fontWeight: 600, color: COLOR.sub, height: 24 }}>
          <Icon name="ScanLine" size={22} color={COLOR.limeInk} /> 이번 달 수업 48개 · AI가 전부 평가
        </div>
        <div style={{ position: "relative", marginTop: 14 }}>
          <ClassroomWall shown={ramp(t, 6, 16)} checked={checked} cell={WALL.cell} />
          {scan && (
            <div
              style={{
                position: "absolute",
                left: -10,
                top: Math.min(1, checked / 0.93) * WALL_H - 2,
                width: WALL_W + 20,
                height: 4,
                borderRadius: 2,
                background: COLOR.lime,
                boxShadow: `0 0 18px ${COLOR.lime}`,
              }}
            />
          )}
        </div>
      </div>
      <div style={{ position: "absolute", left: WALL.x, top: 660, opacity: ramp(t, 22, 10) }}>
        <CompareCounter progress={ramp(t, 24, 26, EASE_IN_OUT)} />
      </div>

      {/* 강사 카드의 타일이 커져 평가 카드가 된다 */}
      <div
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.w,
          height: box.h,
          boxSizing: "border-box",
          background: COLOR.surface,
          borderRadius: lerp(16, 24, m),
          border: `1px solid ${COLOR.line}`,
          boxShadow: m < 1 ? `0 ${lerp(4, 40, m)}px ${lerp(10, 90, m)}px rgba(21,24,28,${lerp(0.06, 0.16, m)})` : shadow,
        }}
      >
        <div style={{ padding: "16px 18px", opacity: 1 - ramp(t, 0, 6) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: COLOR.sub }}>
            <Icon name="Sparkles" size={18} color={COLOR.limeInk} /> AI 강의 평가
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 4 }}>92</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: AI_CARD.x,
          top: AI_CARD.y,
          width: AI_CARD.w,
          height: AI_CARD.h,
          boxSizing: "border-box",
          padding: "26px 30px",
          border: "1px solid transparent",
          opacity: content,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34 }}>
          <Icon name="Sparkles" size={28} color={COLOR.limeInk} />
          <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>AI 강의 평가</span>
          <span style={{ fontSize: 18, color: COLOR.sub, marginLeft: 8 }}>박서준 강사 · 중2 수학 A반 · 3월 12일</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14, height: 280 }}>
          <ScoreRing score={92} progress={score} size={220} label={false} />
          <RadarChart values={[0.92, 0.74, 0.88, 0.8, 0.7]} progress={score} size={280} />
          <div style={{ flex: 1 }}>
            <Metric icon="MessageCircle" label="학생 발화" value="42%" p={ramp(t, 22, 8)} />
            <Metric icon="Hand" label="상호작용" value="38회" p={ramp(t, 26, 8)} />
            <Metric icon="Clock" label="질문 후 대기" value="1.8초" p={ramp(t, 30, 8)} />
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
            opacity: ramp(t, 36, 8),
            transform: `translateY(${(1 - ramp(t, 36, 10)) * 12}px)`,
          }}
        >
          <Icon name="Lightbulb" size={22} color={COLOR.limeInk} />
          <b>개선 포인트</b>
          <span style={{ color: COLOR.sub }}>질문 뒤, 학생이 답할 시간을 조금 더 주세요</span>
        </div>
      </div>
    </>
  );
};

// S7 화면 전체(카피 포함). copyOut이 없으면 카피가 그대로 남는다 — S8 줌 아웃 때 화면째 노트북 속으로 들어간다.
export const S7Frame: React.FC<{ t: number; copyOut?: number }> = ({ t, copyOut }) => {
  const s = sceneById("S7");
  return (
    <>
      <S7Body t={t} />
      <div style={{ position: "absolute", left: 150, top: 96 }}>
        <Eyebrow index={4} text={s.eyebrow!} at={s.from + 6} out={copyOut} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 150 }}>
        <CopyLine cue={s.cues[0]} out={copyOut} />
      </div>
      <div style={{ position: "absolute", left: 150, top: 214 }}>
        <CopyLine cue={s.cues[1]} size={96} out={copyOut} />
      </div>
    </>
  );
};

export const S7AI: React.FC<{ t: number }> = ({ t }) => (
  <Layer>
    <S7Frame t={t} />
  </Layer>
);
