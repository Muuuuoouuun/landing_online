import { loadFont } from "@remotion/fonts";
import pretendardVariable from "pretendard/dist/web/variable/woff2/PretendardVariable.woff2";
import mono400 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2";
import mono700 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2";
import dokdoUnicode from "@fontsource/east-sea-dokdo/unicode.json";

// 폰트는 전부 node_modules에서 번들링 — 렌더 시 네트워크가 필요 없다.
loadFont({ family: "Pretendard", url: pretendardVariable, weight: "45 920" });
loadFont({ family: "JetBrains Mono", url: mono400, weight: "400" });
loadFont({ family: "JetBrains Mono", url: mono700, weight: "700" });

export const SANS = "Pretendard, sans-serif";
export const MONO = "'JetBrains Mono', Pretendard, monospace";

// 손글씨 강조 = 동해 독도(OFL). 카피의 강조 단어에만 쓴다.
// 한글은 유니코드 구간별로 쪼개진 파일이라, 실제로 쓰는 글자가 들어 있는 조각만 로드한다.
const HAND_FAMILY = "East Sea Dokdo";
const handFiles = require.context("../node_modules/@fontsource/east-sea-dokdo/files", false, /-400-normal\.woff2$/);
export const HAND = `'${HAND_FAMILY}', ${SANS}`;

const loaded = new Set<string>();
const inRange = (cp: number, range: string) =>
  range.split(",").some((r) => {
    const [a, b] = r.trim().replace(/U\+/g, "").split("-");
    const lo = parseInt(a, 16);
    return cp >= lo && cp <= (b ? parseInt(b, 16) : lo);
  });

export const loadHand = (text: string) => {
  const cps = [...new Set(text)].map((c) => c.codePointAt(0)!);
  for (const [subset, range] of Object.entries(dokdoUnicode as Record<string, string>)) {
    const id = subset.replace(/[[\]]/g, "");
    if (loaded.has(id) || !cps.some((cp) => inRange(cp, range))) continue;
    loaded.add(id);
    loadFont({
      family: HAND_FAMILY,
      url: handFiles(`./east-sea-dokdo-${id}-400-normal.woff2`),
      unicodeRange: range,
      weight: "400",
    });
  }
};
