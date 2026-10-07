import { loadFont } from "@remotion/fonts";
import pretendardVariable from "pretendard/dist/web/variable/woff2/PretendardVariable.woff2";
import mono400 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2";
import mono700 from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2";

// 폰트는 전부 node_modules에서 번들링 — 렌더 시 네트워크가 필요 없다.
loadFont({ family: "Pretendard", url: pretendardVariable, weight: "45 920" });
loadFont({ family: "JetBrains Mono", url: mono400, weight: "400" });
loadFont({ family: "JetBrains Mono", url: mono700, weight: "700" });

export const SANS = "Pretendard, sans-serif";
export const MONO = "'JetBrains Mono', Pretendard, monospace";
