import { loadFont } from "@remotion/fonts";
import pretendardVariable from "pretendard/dist/web/variable/woff2/PretendardVariable.woff2";
import mono400 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2";
import mono700 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2";
import penUnicode from "@fontsource/nanum-pen-script/unicode.json";
import brushUnicode from "@fontsource/nanum-brush-script/unicode.json";
import gaeguUnicode from "@fontsource/gaegu/unicode.json";
import dokdoUnicode from "@fontsource/east-sea-dokdo/unicode.json";

// 폰트는 전부 node_modules에서 번들링 — 렌더 시 네트워크가 필요 없다.
loadFont({ family: "Pretendard", url: pretendardVariable, weight: "45 920" });
loadFont({ family: "JetBrains Mono", url: mono400, weight: "400" });
loadFont({ family: "JetBrains Mono", url: mono700, weight: "700" });

export const SANS = "Pretendard, sans-serif";
export const MONO = "'JetBrains Mono', Pretendard, monospace";

// 손글씨 강조 폰트 후보 (전부 OFL). 한글은 유니코드 구간별로 쪼개진 파일이라,
// 실제로 쓰는 글자가 들어 있는 조각만 골라 로드한다.
const HANDS = {
  pen: {
    family: "Nanum Pen Script",
    prefix: "nanum-pen-script",
    unicode: penUnicode as Record<string, string>,
    files: require.context("../node_modules/@fontsource/nanum-pen-script/files", false, /-400-normal\.woff2$/),
  },
  brush: {
    family: "Nanum Brush Script",
    prefix: "nanum-brush-script",
    unicode: brushUnicode as Record<string, string>,
    files: require.context("../node_modules/@fontsource/nanum-brush-script/files", false, /-400-normal\.woff2$/),
  },
  gaegu: {
    family: "Gaegu",
    prefix: "gaegu",
    unicode: gaeguUnicode as Record<string, string>,
    files: require.context("../node_modules/@fontsource/gaegu/files", false, /-700-normal\.woff2$/),
  },
  dokdo: {
    family: "East Sea Dokdo",
    prefix: "east-sea-dokdo",
    unicode: dokdoUnicode as Record<string, string>,
    files: require.context("../node_modules/@fontsource/east-sea-dokdo/files", false, /-400-normal\.woff2$/),
  },
};

export type HandKey = keyof typeof HANDS;
export const HAND_LABEL: Record<HandKey, string> = {
  pen: "나눔손글씨 펜",
  brush: "나눔손글씨 붓",
  gaegu: "개구",
  dokdo: "동해 독도",
};

// 영상 기본 손글씨. 다른 후보로 바꿀 때는 여기만 수정.
export const DEFAULT_HAND: HandKey = "dokdo";

const loaded = new Set<string>();
const inRange = (cp: number, range: string) =>
  range.split(",").some((r) => {
    const [a, b] = r.trim().replace(/U\+/g, "").split("-");
    const lo = parseInt(a, 16);
    return cp >= lo && cp <= (b ? parseInt(b, 16) : lo);
  });

export const loadHand = (key: HandKey, text: string) => {
  const hand = HANDS[key];
  const weight = key === "gaegu" ? "700" : "400";
  const cps = [...new Set(text)].map((c) => c.codePointAt(0)!);
  for (const [subset, range] of Object.entries(hand.unicode)) {
    const id = subset.replace(/[[\]]/g, "");
    if (loaded.has(key + id) || !cps.some((cp) => inRange(cp, range))) continue;
    loaded.add(key + id);
    loadFont({
      family: hand.family,
      url: hand.files(`./${hand.prefix}-${id}-${weight}-normal.woff2`),
      unicodeRange: range,
      weight,
    });
  }
};

export const handFamily = (key: HandKey = DEFAULT_HAND) => `'${HANDS[key].family}', ${SANS}`;
