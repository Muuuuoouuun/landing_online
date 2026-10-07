import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLOR } from "../brand";
import { Icon } from "../icons";
import { CopyLine, EASE_IN_OUT, lerp, Paper, ramp, SceneShell, Shaded } from "../main/kit";

// 기획 시안 — S2 '수업은, 회의가 아니니까.'에 회의/수업 아이콘을 음영으로 붙이는 두 가지 안.

const CUE = { at: 0, text: "수업은, 회의가 {아니니까}.", style: "slam" as const, mark: "underline" as const };

const Label: React.FC<{ text: string; color: string; strike?: number }> = ({ text, color, strike = 0 }) => (
  <div style={{ position: "relative", fontSize: 40, fontWeight: 900, color, letterSpacing: "-0.02em" }}>
    {text}
    {strike > 0 && (
      <div style={{ position: "absolute", left: -8, right: -8, top: "52%", height: 6, borderRadius: 3, background: COLOR.lime, transform: `scaleX(${strike})`, transformOrigin: "0 50%" }} />
    )}
  </div>
);

// A안 — 좌우 대비: 회의(회색 음영, 흐려지며 지워짐) ↔ 수업(연두 음영, 또렷해짐)
export const S2ShadeA: React.FC = () => {
  const t = useCurrentFrame();
  const meetingFade = ramp(t, 16, 14, EASE_IN_OUT);
  const classUp = ramp(t, 10, 18);
  return (
    <AbsoluteFill>
      <Paper />
      <SceneShell from={0} duration={60} enter={0} exit={0}>
        <div style={{ position: "absolute", left: 230, top: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: lerp(1, 0.45, meetingFade) }}>
          <div style={{ position: "relative", width: 420, height: 360 }}>
            <div style={{ position: "absolute", left: 60, top: 0 }}>
              <Shaded name="Video" size={300} shade="#D9DCD6" ink="#AEB2AC" />
            </div>
            <div style={{ position: "absolute", left: 0, top: 230 }}>
              <Shaded name="Users" size={110} shade="#E1E3DE" ink="#B9BDB8" />
            </div>
            <div style={{ position: "absolute", left: 300, top: 250 }}>
              <Shaded name="Briefcase" size={96} shade="#E1E3DE" ink="#B9BDB8" />
            </div>
          </div>
          <Label text="회의" color="#AEB2AC" strike={meetingFade} />
        </div>
        <div style={{ position: "absolute", right: 230, top: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: classUp, transform: `translateY(${(1 - classUp) * 30}px)` }}>
          <div style={{ position: "relative", width: 420, height: 360 }}>
            <div style={{ position: "absolute", left: 60, top: 0 }}>
              <Shaded name="Presentation" size={300} shade={COLOR.lime} ink={COLOR.ink} p={classUp} />
            </div>
            <div style={{ position: "absolute", left: 0, top: 230 }}>
              <Shaded name="GraduationCap" size={110} shade={COLOR.lime} ink={COLOR.ink} p={classUp} />
            </div>
            <div style={{ position: "absolute", left: 300, top: 250 }}>
              <Shaded name="PenLine" size={96} shade={COLOR.lime} ink={COLOR.ink} p={classUp} />
            </div>
          </div>
          <Label text="수업" color={COLOR.ink} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 16, alignItems: "center", fontSize: 120, color: COLOR.sub, fontWeight: 300 }}>
          ≠
        </div>
        <div style={{ position: "absolute", top: 760, width: "100%", textAlign: "center" }}>
          <CopyLine cue={CUE} size={104} />
        </div>
      </SceneShell>
    </AbsoluteFill>
  );
};

// B안 — 카피 뒤 대형 음영 아이콘이 회의 → 수업으로 바뀐다 (스틸은 바뀌는 중간 + 끝 상태)
export const S2ShadeB: React.FC = () => {
  const t = useCurrentFrame();
  const swap = ramp(t, 18, 14, EASE_IN_OUT);
  return (
    <AbsoluteFill>
      <Paper />
      <SceneShell from={0} duration={60} enter={0} exit={0}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", opacity: lerp(0.7, 0, swap), transform: `translate(${-swap * 380}px, 0) scale(${lerp(1, 0.55, swap)})` }}>
            <Shaded name="Video" size={560} shade="#E4E6E1" ink="#CDD1CB" />
          </div>
          <div style={{ position: "absolute", opacity: swap * 0.42, transform: `scale(${lerp(0.8, 1, swap)})` }}>
            <Shaded name="Presentation" size={600} shade={COLOR.lime} ink={`${COLOR.ink}33`} p={swap} />
          </div>
        </AbsoluteFill>
        <div style={{ position: "absolute", top: 470, width: "100%", textAlign: "center" }}>
          <CopyLine cue={CUE} size={112} />
        </div>
        <div style={{ position: "absolute", left: 120, bottom: 110, display: "flex", alignItems: "center", gap: 14, opacity: 1 - swap }}>
          <Icon name="Video" size={36} color="#AEB2AC" /> <span style={{ fontSize: 22, color: COLOR.sub }}>회의</span>
        </div>
      </SceneShell>
    </AbsoluteFill>
  );
};
