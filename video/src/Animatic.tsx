import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR } from "./brand";
import { MONO, SANS } from "./fonts";
import { Icon } from "./icons";
import { BEAT, Cue, CueStyle, DURATION, FPS, Scene, SCENES } from "./timeline";

// 대본 타이밍 검토용 애니매틱. 최종 모션이 아니라 '몇 프레임에 어떤 카피가 뜨는지'만 보여준다.

const STYLE: Record<CueStyle, React.CSSProperties> = {
  story: { fontSize: 72, fontWeight: 600, color: COLOR.cream },
  slam: { fontSize: 120, fontWeight: 900, color: COLOR.cream, letterSpacing: "-0.03em" },
  accent: { fontSize: 140, fontWeight: 900, color: COLOR.coral, letterSpacing: "-0.03em" },
  verb: { fontSize: 130, fontWeight: 800, color: COLOR.cream, letterSpacing: "-0.03em" },
  kpi: { fontSize: 44, fontWeight: 800, color: COLOR.coral, fontVariantNumeric: "tabular-nums" },
  tag: { fontSize: 30, fontWeight: 500, color: COLOR.muted },
  logo: { fontSize: 160, fontWeight: 800, color: COLOR.cream, letterSpacing: "-0.04em" },
  cta: { fontSize: 32, fontWeight: 700, color: COLOR.cream, fontFamily: MONO },
};

const timecode = (f: number) => {
  const s = Math.floor(f / FPS);
  const ff = f % FPS;
  return `00:${String(s).padStart(2, "0")}:${String(ff).padStart(2, "0")}  ·  f${String(f).padStart(3, "0")}`;
};

const CueText: React.FC<{ cue: Cue; local: number }> = ({ cue, local }) => {
  const { fps } = useVideoConfig();
  const t = spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } });
  const big = cue.style === "slam" || cue.style === "accent" || cue.style === "logo";
  return (
    <div
      style={{
        ...STYLE[cue.style],
        lineHeight: 1.1,
        opacity: t,
        transform: big
          ? `scale(${interpolate(t, [0, 1], [1.5, 1])})`
          : `translateY(${interpolate(t, [0, 1], [40, 0])}px)`,
      }}
    >
      {cue.text}
    </div>
  );
};

const SceneSlate: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const abs = scene.from + frame;
  const shown = scene.cues.filter((c) => c.at <= abs);
  const lastVerb = [...shown].reverse().find((c) => c.style === "verb");
  const main = shown.filter(
    (c) => !["kpi", "tag", "verb"].includes(c.style) || c === lastVerb,
  );
  const kpis = shown.filter((c) => c.style === "kpi");
  const tags = shown.filter((c) => c.style === "tag");

  return (
    <AbsoluteFill style={{ padding: "64px 96px 120px", fontFamily: SANS }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 24 }}>
        <span style={{ color: COLOR.muted }}>
          {scene.id} — {scene.title}
        </span>
        <span style={{ color: COLOR.coral }}>{scene.eyebrow ?? ""}</span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          textAlign: "center",
        }}
      >
        {main.map((c) => (
          <CueText key={c.at} cue={c} local={abs - c.at} />
        ))}
        {kpis.length > 0 && (
          <div style={{ display: "flex", gap: 56, marginTop: 16 }}>
            {kpis.map((c) => (
              <CueText key={c.at} cue={c} local={abs - c.at} />
            ))}
          </div>
        )}
        {tags.map((c) => (
          <CueText key={c.at} cue={c} local={abs - c.at} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
        {scene.icons.map((name, i) => (
          <Icon key={name + i} name={name} size={36} progress={interpolate(frame, [i * 2, i * 2 + 12], [0, 1], { extrapolateRight: "clamp" })} />
        ))}
      </div>
      <div style={{ color: COLOR.muted, fontSize: 22, lineHeight: 1.6, opacity: 0.85 }}>
        <div>
          <b style={{ color: COLOR.cream }}>화면</b> {scene.visual}
        </div>
        <div>
          <b style={{ color: COLOR.cream }}>장점</b> {scene.benefit}
        </div>
        <div>
          <b style={{ color: COLOR.cream }}>사운드</b> {scene.sound}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TimelineBar: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.floor(frame / BEAT);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 96px 24px", fontFamily: MONO }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {SCENES.map((s) => {
          const active = frame >= s.from && frame < s.from + s.duration;
          return (
            <div
              key={s.id}
              style={{
                flex: s.duration,
                height: 6,
                borderRadius: 3,
                background: active ? COLOR.coral : frame >= s.from ? COLOR.emeraldLight : COLOR.meetingGray,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: DURATION / BEAT }, (_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 2,
                background: i === beat ? COLOR.cream : i % 4 === 0 ? COLOR.emerald : COLOR.meetingGray,
              }}
            />
          ))}
        </div>
        <span style={{ color: COLOR.cream, fontSize: 24 }}>{timecode(frame)}</span>
      </div>
    </AbsoluteFill>
  );
};

const HITS = [60, 412];

export const Animatic: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = Math.max(...HITS.map((h) => interpolate(frame, [h, h + 1, h + 4], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const bg = frame < 60 ? COLOR.meetingGray : COLOR.ink;
  return (
    <AbsoluteFill style={{ background: bg }}>
      {SCENES.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration} layout="none">
          <SceneSlate scene={s} />
        </Sequence>
      ))}
      <TimelineBar />
      <AbsoluteFill style={{ background: COLOR.cream, opacity: flash }} />
    </AbsoluteFill>
  );
};
