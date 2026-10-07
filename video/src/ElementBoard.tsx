import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLOR } from "./brand";
import {
  CheckBadge,
  ClassroomWall,
  CompareCounter,
  EngagementMeter,
  InteractionChips,
  KpiChip,
  RadarChart,
  ScoreRing,
  StrikeBadge,
  StudentTile,
} from "./elements";
import { MONO, SANS } from "./fonts";
import { Icon } from "./icons";
import { SCENES } from "./timeline";

// 아이콘 · 그래픽 · 장점 표현 요소를 한 장에 모은 스타일 보드. 마지막 프레임을 스틸로 뽑아 검토한다.
export const BOARD_DURATION = 90;

const Spec: React.FC<{ scene: string; title: string; note: string; children: React.ReactNode }> = ({ scene, title, note, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div>
      <div style={{ fontFamily: MONO, fontSize: 15, color: COLOR.coral }}>{scene}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: COLOR.cream }}>{title}</div>
      <div style={{ fontSize: 16, color: COLOR.muted }}>{note}</div>
    </div>
    {children}
  </div>
);

export const ElementBoard: React.FC = () => {
  const frame = useCurrentFrame();
  const p = (start: number, len = 40) => interpolate(frame, [start, start + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLOR.ink, padding: "56px 72px", fontFamily: SANS, color: COLOR.cream }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em" }}>
          아이콘 · 그래픽 · 장점 요소 <span style={{ color: COLOR.coral }}>보드</span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 18, color: COLOR.muted }}>ClassIn 15″ · v2 · lucide line icons / 24 grid / stroke 1.75</div>
      </div>

      <div style={{ display: "flex", gap: 64 }}>
        <div style={{ width: 700, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: MONO, fontSize: 16, color: COLOR.muted }}>ICONS BY SCENE</div>
          {SCENES.map((s, row) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 18, borderTop: "1px solid rgba(242,239,232,0.08)", paddingTop: 18 }}>
              <div style={{ width: 190 }}>
                <div style={{ fontFamily: MONO, fontSize: 15, color: COLOR.coral }}>{s.id}</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{s.title}</div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", flex: 1 }}>
                {s.icons.map((name, i) => (
                  <div key={name + i} title={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48 }}>
                    <Icon name={name} size={40} progress={p(row * 4 + i * 2, 24)} color={i === 0 ? COLOR.coral : COLOR.cream} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 16, color: COLOR.muted, lineHeight: 1.6, marginTop: 8 }}>
            기본 크림 · 상태가 '좋아진' 순간만 코랄 · 컨테이너는 에메랄드.
            <br />
            등장은 획 드로우온 10f + 스프링 팝, 크기 3단계: 96(히어로) · 48(UI) · 24(칩).
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 40 }}>
          <Spec scene="S1 → S7" title="히어로 오브젝트 — 민준 타일" note="같은 타일이 꺼짐으로 시작해 켜짐으로 끝난다 (수미상관)">
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <StudentTile width={300} on={0} />
              <Icon name="ArrowRight" size={40} color={COLOR.muted} />
              <StudentTile width={300} on={p(20)} highlight />
            </div>
          </Spec>

          <div style={{ display: "flex", gap: 48 }}>
            <Spec scene="S1 → S3 → S7" title="참여도 미터" note="평평한 선 → 상호작용마다 차오름">
              <div style={{ display: "flex", gap: 16 }}>
                <EngagementMeter level={0} frame={frame} width={250} />
                <EngagementMeter level={p(10)} frame={frame} width={250} />
              </div>
            </Spec>
            <Spec scene="S2" title="회의 → 수업 배지" note="콘셉트를 한 장면으로">
              <StrikeBadge progress={p(15, 50)} />
            </Spec>
          </div>

          <div style={{ display: "flex", gap: 48 }}>
            <Spec scene="S3" title="상호작용 칩" note="동사가 나올 때마다 하나씩 점등">
              <InteractionChips lit={Math.floor(p(10, 60) * 4.99)} />
            </Spec>
            <Spec scene="S4" title="자동 녹화 체크 배지" note="누를 버튼이 없다는 게 장점">
              <CheckBadge progress={p(20)} />
            </Spec>
          </div>

          <Spec scene="S5" title="48 → 1 교실 월 + KPI 칩" note="민준의 교실(코랄)을 끝까지 추적 · 숫자는 연출용 예시">
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <ClassroomWall progress={p(0, 60)} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <KpiChip icon="MonitorPlay" label="진행 중 수업" value={48} progress={p(20)} />
                <KpiChip icon="UserCheck" label="오늘 출석률" value={97.4} decimals={1} suffix="%" progress={p(25)} />
              </div>
            </div>
          </Spec>

          <Spec scene="S6" title="AI 강의 평가 + 관리 효율 카운터" note="점수 링 · 5축 레이더 · 직접 본 수업 0 vs AI 평가 48">
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <ScoreRing score={92} progress={p(10, 60)} size={190} />
              <RadarChart values={[0.92, 0.7, 0.88, 0.8, 0.75]} progress={p(10, 60)} size={230} />
              <CompareCounter progress={p(20, 60)} />
            </div>
          </Spec>
        </div>
      </div>
    </AbsoluteFill>
  );
};
