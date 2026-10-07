import React from "react";
import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR } from "./brand";
import { MONO, SANS } from "./fonts";
import { EmphLine } from "./hand";
import { Icon } from "./icons";
import { BEAT, Cue, CueStyle, DURATION, FPS, Scene, SCENES, SFX } from "./timeline";

// 대본 타이밍 검토용 애니매틱 — 카피 · 손글씨 강조 · '슥슥' 효과음 싱크만 보여준다. 최종 모션 아님.

const STYLE: Record<CueStyle, { size: number; css: React.CSSProperties }> = {
  story: { size: 60, css: { fontWeight: 600, color: COLOR.sub } },
  slam: { size: 112, css: { fontWeight: 900, color: COLOR.ink, letterSpacing: "-0.03em" } },
  verb: { size: 120, css: { fontWeight: 800, color: COLOR.ink, letterSpacing: "-0.03em" } },
  kpi: { size: 44, css: { fontWeight: 800, color: COLOR.ink, fontVariantNumeric: "tabular-nums" } },
  tag: { size: 28, css: { fontWeight: 500, color: COLOR.sub } },
  logo: { size: 150, css: { fontWeight: 800, color: COLOR.ink, letterSpacing: "-0.04em" } },
  cta: { size: 30, css: { fontWeight: 700, color: COLOR.ink, fontFamily: MONO } },
};

const timecode = (f: number) => {
  const s = Math.floor(f / FPS);
  const ff = f % FPS;
  return `00:${String(s).padStart(2, "0")}:${String(ff).padStart(2, "0")}  ·  f${String(f).padStart(3, "0")}`;
};

const CueText: React.FC<{ cue: Cue; local: number }> = ({ cue, local }) => {
  const { fps } = useVideoConfig();
  const t = spring({ frame: local, fps, config: { damping: 16, stiffness: 240 } });
  const { size, css } = STYLE[cue.style];
  return (
    <div
      style={{
        ...css,
        fontSize: size,
        lineHeight: 1.25,
        opacity: t,
        transform: `translateY(${interpolate(t, [0, 1], [30, 0])}px)`,
      }}
    >
      <EmphLine text={cue.text} size={size} local={local} mark={cue.mark} delay={cue.delay} />
    </div>
  );
};

const SceneSlate: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const abs = scene.from + frame;
  const shown = scene.cues.filter((c) => c.at <= abs);
  const lastVerb = [...shown].reverse().find((c) => c.style === "verb");
  const main = shown.filter((c) => !["kpi", "tag", "verb", "cta"].includes(c.style) || c === lastVerb);
  const kpis = shown.filter((c) => c.style === "kpi");
  const tags = shown.filter((c) => c.style === "tag" || c.style === "cta");

  return (
    <AbsoluteFill style={{ padding: "64px 96px 120px", fontFamily: SANS }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 24 }}>
        <span style={{ color: COLOR.sub }}>
          {scene.id} — {scene.title}
        </span>
        <span style={{ color: COLOR.limeInk }}>{scene.eyebrow ?? ""}</span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        {main.map((c) => (
          <CueText key={c.at} cue={c} local={abs - c.at} />
        ))}
        {kpis.length > 0 && (
          <div style={{ display: "flex", gap: 56, marginTop: 12 }}>
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
          <Icon
            key={name + i}
            name={name}
            size={34}
            color={COLOR.sub}
            progress={interpolate(frame, [i * 2, i * 2 + 12], [0, 1], { extrapolateRight: "clamp" })}
          />
        ))}
      </div>
      <div style={{ color: COLOR.sub, fontSize: 21, lineHeight: 1.6 }}>
        <div>
          <b style={{ color: COLOR.ink }}>화면</b> {scene.visual}
        </div>
        <div>
          <b style={{ color: COLOR.ink }}>강조</b> {scene.emphasis}
        </div>
        <div>
          <b style={{ color: COLOR.ink }}>사운드</b> {scene.sound}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TimelineBar: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.floor(frame / BEAT);
  const lastSfx = [...SFX].reverse().find((s) => s.at <= frame);
  const sfxOn = lastSfx && frame - lastSfx.at < 8;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 96px 24px", fontFamily: MONO }}>
      <div style={{ position: "relative", height: 10, marginBottom: 8 }}>
        {SFX.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(s.at / DURATION) * 100}%`,
              top: 0,
              width: 3,
              height: 10,
              borderRadius: 2,
              background: s.at <= frame ? COLOR.limeInk : COLOR.line,
            }}
          />
        ))}
      </div>
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
                background: active ? COLOR.lime : frame >= s.from ? COLOR.limeInk : COLOR.line,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {Array.from({ length: DURATION / BEAT }, (_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 2,
                background: i === beat ? COLOR.ink : i % 4 === 0 ? COLOR.lime : COLOR.line,
              }}
            />
          ))}
          <span style={{ marginLeft: 16, fontSize: 20, color: sfxOn ? COLOR.limeInk : COLOR.line }}>
            ✎ {sfxOn ? lastSfx.name : "sfx"}
          </span>
        </div>
        <span style={{ color: COLOR.ink, fontSize: 24 }}>{timecode(frame)}</span>
      </div>
    </AbsoluteFill>
  );
};

export const Animatic: React.FC = () => {
  const frame = useCurrentFrame();
  // S1은 회의 화면 톤(회색), S2 스크리블부터 밝은 종이
  const bg = frame < 60 ? "#ECEDEA" : COLOR.paper;
  return (
    <AbsoluteFill
      style={{
        background: bg,
        backgroundImage: `linear-gradient(${COLOR.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLOR.grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    >
      {SCENES.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration} layout="none">
          <SceneSlate scene={s} />
        </Sequence>
      ))}
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.at} layout="none">
          <Html5Audio src={staticFile(`sfx/${s.name}.wav`)} volume={0.9} />
        </Sequence>
      ))}
      <TimelineBar />
    </AbsoluteFill>
  );
};
