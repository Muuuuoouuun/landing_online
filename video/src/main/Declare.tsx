import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { COLOR } from "../brand";
import { sceneById } from "../timeline";
import { WIN, Wireframe } from "./Classroom";
import { CopyLine, EASE_IN_OUT, FocusBrackets, Layer, lerp, ramp, Shaded } from "./kit";

// S3 선언 — "ClassIn은, 온라인 수업에 딱 맞는 교실이에요."
// S2의 음영 칠판 아이콘이 날아가 선으로 그린 ClassIn 교실 창이 되고, '딱 맞는'에 맞춰 초점 브래킷이 창에 딱 맞게 스냅한다.
// 선 그림 창은 S4에서 같은 자리에 실제 UI로 채워진다.

const BOARD_CENTER = { x: WIN.x + 24 + 380, y: WIN.y + 48 + 126 + 222 };
const SNAP_AT = 48; // 브래킷 스냅 시작 (스냅 완료 = 클릭 효과음)

export const S3Declare: React.FC<{ t: number }> = ({ t }) => {
  const s = sceneById("S3");
  const end = s.from + s.duration;
  const live = t < s.duration;
  const morph = ramp(t, 0, 22, EASE_IN_OUT);
  const [brand, line1, line2] = s.cues;
  return (
    <Layer>
      {live && (
        <>
          {/* 음영 칠판 아이콘 → 교실 창의 칠판 자리로 날아가며 선 그림이 된다 */}
          <AbsoluteFill style={{ pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: lerp(960, BOARD_CENTER.x, morph) - 300,
                top: lerp(540, BOARD_CENTER.y, morph) - 300,
                opacity: 0.42 * (1 - ramp(t, 8, 14)),
                transform: `scale(${lerp(1, 0.3, morph)})`,
              }}
            >
              <Shaded name="Presentation" size={600} shade={COLOR.lime} ink={`${COLOR.ink}33`} />
            </div>
          </AbsoluteFill>
          <Wireframe p={ramp(t, 4, 32, Easing.linear)} />
        </>
      )}
      <FocusBrackets
        rect={{ x: WIN.x, y: WIN.y, w: WIN.w, h: WIN.h }}
        p={ramp(t, SNAP_AT, 10, Easing.linear)}
        fade={ramp(t, s.duration, 10)}
      />

      <div style={{ position: "absolute", left: 120, top: 286 }}>
        <CopyLine cue={brand} out={end} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 368 }}>
        <CopyLine cue={line1} size={92} out={end} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 484 }}>
        <CopyLine cue={line2} size={92} out={end} />
      </div>
    </Layer>
  );
};
