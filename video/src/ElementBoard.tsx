import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLOR } from "./brand";
import {
  card,
  CheckBadge,
  ClassroomWall,
  CompareCounter,
  EngagementMeter,
  InteractionChips,
  KpiChip,
  MeetingGrid,
  RadarChart,
  ScoreRing,
} from "./elements";
import { MONO, SANS } from "./fonts";
import { EmphLine, HandWord, Mark, MarkKind } from "./hand";
import { Icon } from "./icons";
import { SCENES } from "./timeline";

// v3 스타일 보드 — 밝은 테마 · 연두 강조 · 손글씨 강조 · 슥슥 효과음 · 아이콘 · 장점 요소. 마지막 프레임을 스틸로 뽑는다.
export const BOARD_DURATION = 90;
export const BOARD_HEIGHT = 2260;

const Section: React.FC<{ tag: string; title: string; note?: string; children: React.ReactNode }> = ({ tag, title, note, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div>
      <div style={{ fontFamily: MONO, fontSize: 15, color: COLOR.limeInk }}>{tag}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: COLOR.ink, letterSpacing: "-0.02em" }}>{title}</div>
      {note && <div style={{ fontSize: 17, color: COLOR.sub, marginTop: 2 }}>{note}</div>}
    </div>
    {children}
  </div>
);

const SWATCHES: [keyof typeof COLOR, string][] = [
  ["paper", "배경"],
  ["surface", "카드"],
  ["ink", "본문"],
  ["sub", "보조"],
  ["line", "보더"],
  ["lime", "강조 마크·형광펜"],
  ["limeInk", "손글씨 글자"],
  ["limeSoft", "강조 칩 배경"],
];

const MARKS: { kind: MarkKind; word: string; sfx: string; where: string }[] = [
  { kind: "circle", word: "수업", sfx: "circle.wav · 0.43s", where: "S1 의심 · S8 확신" },
  { kind: "underline", word: "아니니까", sfx: "underline.wav · 0.27s", where: "S2 · S6 · S7 · S9" },
  { kind: "check", word: "클릭 한 번", sfx: "check.wav · 0.30s", where: "S5" },
  { kind: "highlight", word: "데이터", sfx: "highlight.wav · 0.35s", where: "S4" },
  { kind: "strike", word: "회의", sfx: "strike.wav · 0.42s", where: "S2 회의 그리드 지우기" },
];

export const ElementBoard: React.FC = () => {
  const frame = useCurrentFrame();
  const p = (start: number, len = 40) => interpolate(frame, [start, start + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: COLOR.paper,
        backgroundImage: `linear-gradient(${COLOR.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLOR.grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        padding: "64px 80px",
        fontFamily: SANS,
        color: COLOR.ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48 }}>
        <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.03em" }}>
          ClassIn 20″ 스타일 보드{" "}
          <HandWord text="v4" size={48} write={p(0, 20)} mark="underline" markProgress={p(20, 12)} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 18, color: COLOR.sub }}>밝은 테마 · 연두 강조 · 손글씨 강조 · 슥슥 SFX</div>
      </div>

      <div style={{ display: "flex", gap: 72 }}>
        {/* LEFT — 컬러 · 타이포 · 손글씨 · 마크 */}
        <div style={{ width: 800, display: "flex", flexDirection: "column", gap: 52 }}>
          <Section tag="COLOR" title="밝은 테마 + 연두 하나로 강조" note="밝은 연두는 마크·형광펜, 진한 연두는 손글씨 글자(가독성)">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {SWATCHES.map(([key, label]) => (
                <div key={key} style={{ ...card, padding: 12, boxShadow: "none" }}>
                  <div style={{ height: 56, borderRadius: 10, background: COLOR[key], border: `1px solid ${COLOR.line}` }} />
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>{label}</div>
                  <div style={{ fontFamily: MONO, fontSize: 14, color: COLOR.sub }}>{COLOR[key]}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section tag="TYPE" title="기본은 Pretendard, 강조만 손글씨" note="한 줄에 강조는 하나. 손글씨는 기본 폰트의 1.3배 크기로">
            <div style={{ ...card, padding: "28px 32px", fontSize: 72, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.3 }}>
              <EmphLine text="정말 {수업}이었을까?" size={72} local={frame} mark="circle" />
              <div style={{ fontSize: 44, fontWeight: 900, marginTop: 8 }}>
                <EmphLine text="다 볼 수 없는 수업은, {AI가 평가}한다." size={44} local={frame - 20} mark="underline" />
              </div>
            </div>
          </Section>

          <Section tag="HANDWRITING" title="손글씨 강조 = 동해 독도" note="OFL(상업 사용 가능). 카피의 강조 단어에만 쓰고, 숫자·UI에는 쓰지 않는다">
            <div style={{ ...card, boxShadow: "none", display: "flex", alignItems: "center", gap: 26, padding: "18px 24px", borderColor: COLOR.lime, borderWidth: 2 }}>
              {["수업", "데이터", "클릭 한 번", "AI가 평가", "돌아간다"].map((w, i) => (
                <HandWord key={w} text={w} size={38} write={p(i * 6, 24)} />
              ))}
            </div>
          </Section>

          <Section tag="MARKS + SFX" title="손그림 마크 5종과 '슥슥' 효과음" note="쓰는 순간 write-short / write-long, 마크를 긋는 순간 아래 효과음">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {MARKS.map((m, i) => (
                <div key={m.kind} style={{ ...card, boxShadow: "none", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ height: 76, display: "flex", alignItems: "center", paddingLeft: 24 }}>
                    {m.kind === "strike" ? (
                      <span style={{ position: "relative", display: "inline-block", fontSize: 56, fontWeight: 900, color: COLOR.sub }}>
                        {m.word}
                        <Mark kind="strike" progress={p(10 + i * 6, 14)} size={56} />
                      </span>
                    ) : (
                      <HandWord text={m.word} size={52} write={p(i * 6, 16)} mark={m.kind} markProgress={p(18 + i * 6, 14)} />
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                    <span style={{ fontFamily: MONO, color: COLOR.limeInk }}>{m.kind}</span>
                    <span style={{ fontFamily: MONO, color: COLOR.sub }}>{m.sfx}</span>
                  </div>
                  <div style={{ fontSize: 15, color: COLOR.sub }}>{m.where}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* RIGHT — 아이콘 · 장점 요소 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 52 }}>
          <Section tag="ICONS" title="씬별 아이콘" note="lucide 라인 · 24 그리드 · 기본 잉크, 좋아진 상태만 진한 연두">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SCENES.map((s, row) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 16, borderTop: `1px solid ${COLOR.line}`, padding: "12px 0" }}>
                  <div style={{ width: 130 }}>
                    <span style={{ fontFamily: MONO, fontSize: 15, color: COLOR.limeInk }}>{s.id}</span>{" "}
                    <span style={{ fontSize: 17, fontWeight: 700 }}>{s.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    {s.icons.map((name, i) => (
                      <Icon key={name + i} name={name} size={36} progress={p(row * 4 + i * 2, 24)} color={i === 0 ? COLOR.limeInk : COLOR.ink} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section tag="S1 → S2" title="회의 그리드를 연두 마커로 지운다" note="회의용 툴 → 교육용 툴 전환을 한 획으로">
            <MeetingGrid scribble={p(10, 30)} cols={8} rows={3} cell={64} />
          </Section>

          <div style={{ display: "flex", gap: 40 }}>
            <Section tag="S1 → S7" title="참여도 미터" note="평평한 선 → 살아 있는 파형">
              <div style={{ display: "flex", gap: 14 }}>
                <EngagementMeter level={0} frame={frame} width={210} />
                <EngagementMeter level={p(10)} frame={frame} width={210} />
              </div>
            </Section>
            <Section tag="S4" title="자동 녹화 배지" note="누를 버튼이 없다는 게 장점">
              <CheckBadge progress={p(20)} />
            </Section>
          </div>

          <Section tag="S3" title="상호작용 칩" note="동사가 손글씨로 쓰일 때마다 하나씩 점등">
            <InteractionChips lit={Math.floor(p(10, 60) * 4.99)} />
          </Section>

          <Section tag="S5 · S6 · S7" title="48칸 교실 월 + KPI" note="스캔하며 칸마다 연두 체크 · 숫자는 연출용 예시">
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <ClassroomWall shown={p(0, 40)} checked={p(30, 50)} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <KpiChip icon="MonitorPlay" label="진행 중 수업" value={48} progress={p(20)} />
                <KpiChip icon="UserCheck" label="오늘 출석률" value={97.4} decimals={1} suffix="%" progress={p(25)} />
              </div>
            </div>
          </Section>

          <Section tag="S6" title="AI 강의 평가" note="점수는 기본 폰트(손글씨 아님) · 직접 본 수업 0 vs AI 평가 48">
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <ScoreRing score={92} progress={p(10, 50)} size={190} />
              <RadarChart values={[0.92, 0.7, 0.88, 0.8, 0.75]} progress={p(10, 60)} size={220} />
              <CompareCounter progress={p(20, 60)} />
            </div>
          </Section>
        </div>
      </div>
    </AbsoluteFill>
  );
};
