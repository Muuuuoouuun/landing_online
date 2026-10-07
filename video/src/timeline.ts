// SCRIPT.md 대본(v4 · 20초 · 원장님 시점 흐름형)을 프레임 단위 데이터로 옮긴 것.
// 본편(ClassIn20)과 애니매틱이 모두 이 데이터를 읽는다. 대본을 고치면 여기만 고친다.
// 모든 프레임 번호는 영상 전체 기준(절대값), 30fps.
// 카피의 {중괄호} = 연두 손글씨 강조(카피에만 사용). mark = 다 쓴 뒤 긋는 손그림 마크.
import { emphasisOf, emphasisTiming, MarkKind } from "./hand";
import type { IconName } from "./icons";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 20 * FPS; // 600f
export const BPM = 100;
export const BEAT = (FPS * 60) / BPM; // 18f

export type CueStyle = "story" | "slam" | "verb" | "kpi" | "tag" | "logo" | "cta";

export type Cue = { at: number; text: string; style: CueStyle; mark?: MarkKind; delay?: number };

export type SfxName =
  | "write-short"
  | "write-long"
  | MarkKind
  | "click"
  | "pop"
  | "tick"
  | "whoosh"
  | "hit";
export type Sfx = { at: number; name: SfxName };

export type Scene = {
  id: string;
  title: string;
  eyebrow?: string;
  from: number;
  duration: number;
  visual: string;
  emphasis: string; // 손글씨 강조 + 장점 장치
  sound: string;
  icons: IconName[];
  cues: Cue[];
  sfx?: Sfx[]; // 카피 밖 그래픽에 붙는 효과음
};

export const SCENES: Scene[] = [
  {
    id: "S1",
    title: "고민",
    from: 0,
    duration: 66,
    visual: "옅은 회색 회의 그리드 48칸이 하나씩 켜짐 · 전부 같은 크기 · 카메라 꺼짐·음소거 · 참여도는 평평한 선",
    emphasis: "'수업' 손글씨 + 동그라미 — 의심",
    sound: "조용한 룸톤 · 슥슥 → 슥—",
    icons: ["Grid3x3", "VideoOff", "MicOff", "MonitorUp", "WifiOff", "Moon", "FaceNeutral", "Activity"],
    cues: [
      { at: 6, text: "회의 툴로 여는 48개의 수업.", style: "story" },
      { at: 28, text: "정말 {수업}이었을까?", style: "slam", mark: "circle" },
    ],
  },
  {
    id: "S2",
    title: "전환",
    from: 66,
    duration: 42,
    visual: "연두 마커가 회의 그리드를 지그재그로 지워 버림 → 그리드가 접히며 밝은 종이로",
    emphasis: "회의 그리드 지우기 · '아니니까' 손글씨 + 밑줄",
    sound: "f66 큰 스크리블 · 슥슥슥 → 슥 · 스우시",
    icons: ["Grid3x3", "PenLine", "Presentation", "Sparkles"],
    cues: [{ at: 76, text: "수업은, 회의가 {아니니까}.", style: "slam", mark: "underline" }],
    sfx: [
      { at: 66, name: "strike" },
      { at: 104, name: "whoosh" },
    ],
  },
  {
    id: "S3",
    title: "수업",
    eyebrow: "INTERACTIVE CLASSROOM",
    from: 108,
    duration: 90,
    visual: "ClassIn 교실 창 — 강단 좌석 · 칠판 · 도구바. 학생이 강단으로 · 칠판 동시 판서 · 답변기 · 트로피",
    emphasis: "동사 4개 손글씨 · 상호작용 칩 순차 점등",
    sound: "동사마다 슥슥 · 착지마다 팝",
    icons: ["Presentation", "MousePointer2", "PenLine", "Hand", "ListChecks", "Trophy", "Users", "Timer"],
    cues: [
      { at: 110, text: "온라인에서도,", style: "story" },
      { at: 124, text: "무대로 {부르고},", style: "verb", delay: 2 },
      { at: 142, text: "칠판에 {같이 쓰고},", style: "verb", delay: 2 },
      { at: 160, text: "퀴즈로 {묻고},", style: "verb", delay: 2 },
      { at: 178, text: "트로피로 {칭찬하고}.", style: "verb", delay: 2 },
    ],
    sfx: [
      { at: 134, name: "pop" },
      { at: 166, name: "pop" },
      { at: 190, name: "pop" },
    ],
  },
  {
    id: "S4",
    title: "데이터",
    eyebrow: "AUTO RECORDING · CLASS RECORD",
    from: 198,
    duration: 78,
    visual: "'수업 종료' 클릭 → 교실 창이 녹화 카드로 → 녹화·출결·판서·퀴즈·트로피·질문이 데이터 행으로 날아가 '수업 기록'에 쌓임",
    emphasis: "'데이터' 손글씨 + 형광펜 · 수업 기록 6행이 자동으로 채워짐",
    sound: "클릭 · 슥슥 → 스윽 · 행마다 틱",
    icons: ["CircleDot", "CirclePlay", "UserCheck", "PenLine", "ListChecks", "Trophy", "MessageCircle", "CloudCheck"],
    cues: [
      { at: 200, text: "수업이 끝나도,", style: "story" },
      { at: 216, text: "모든 것이 {데이터}로 남는다.", style: "slam", mark: "highlight" },
    ],
    sfx: [
      { at: 202, name: "click" },
      { at: 246, name: "tick" },
      { at: 251, name: "tick" },
      { at: 256, name: "tick" },
      { at: 261, name: "tick" },
      { at: 266, name: "tick" },
      { at: 271, name: "tick" },
    ],
  },
  {
    id: "S5",
    title: "관리",
    eyebrow: "TEACHER · CLASS MANAGEMENT",
    from: 276,
    duration: 90,
    visual: "데이터가 강사 표로 흘러 들어가 숫자가 자동으로 채워짐 → 커서가 강사 한 명 클릭 → 수업 기록·녹화·평가가 담긴 강사 카드가 펼쳐짐",
    emphasis: "'클릭 한 번' 손글씨 + 체크 · 데이터 흐름 → 강사 카드",
    sound: "스우시 · 슥슥슥 → 슥 · 클릭 → 팝 · 카운터 틱",
    icons: ["Users", "UserCheck", "BookOpen", "CalendarDays", "MousePointer2", "CirclePlay", "Gauge", "TrendingUp"],
    cues: [
      { at: 278, text: "강사 관리도, 수업 관리도,", style: "story" },
      { at: 296, text: "{클릭 한 번}이면 된다.", style: "slam", mark: "check" },
    ],
    sfx: [
      { at: 280, name: "whoosh" },
      { at: 336, name: "click" },
      { at: 340, name: "pop" },
    ],
  },
  {
    id: "S6",
    title: "AI 강의 평가",
    eyebrow: "AI LECTURE EVALUATION",
    from: 366,
    duration: 66,
    visual: "스캔 라인이 48칸을 훑고 칸마다 연두 체크 → AI 강의 평가 카드(점수 92 · 레이더 5축 · 개선 포인트)",
    emphasis: "'AI가 평가' 손글씨 + 밑줄 · 점수는 기본 폰트(손글씨 아님) · 직접 본 수업 0 vs AI 평가 48",
    sound: "스캔 스윕 · 슥슥슥 → 슥 · 팝 · 카운터 틱",
    icons: ["ScanLine", "Sparkles", "Brain", "Gauge", "Radar", "MessageCircle", "Lightbulb", "ClipboardCheck"],
    cues: [
      { at: 368, text: "다 볼 수 없는 수업은,", style: "story" },
      { at: 384, text: "{AI가 평가}한다.", style: "slam", mark: "underline" },
    ],
    sfx: [
      { at: 370, name: "whoosh" },
      { at: 404, name: "pop" },
    ],
  },
  {
    id: "S7",
    title: "사무실 없이",
    eyebrow: "NO OFFICE NEEDED",
    from: 432,
    duration: 66,
    visual: "사무실 건물이 접혀 사라지고 노트북 하나에 기관 전체 · 서울·부산·제주·해외의 강사와 학생이 선으로 연결",
    emphasis: "'돌아간다' 손글씨 + 밑줄",
    sound: "스우시 · 핀마다 틱 · 슥슥슥 → 슥",
    icons: ["Building", "Laptop", "MapPin", "House", "Globe", "Wifi", "LayoutDashboard", "Users"],
    cues: [
      { at: 434, text: "사무실 없이도,", style: "story" },
      { at: 450, text: "기관이 {돌아간다}.", style: "slam", mark: "underline" },
    ],
    sfx: [
      { at: 438, name: "whoosh" },
      { at: 462, name: "tick" },
      { at: 470, name: "tick" },
      { at: 478, name: "tick" },
    ],
  },
  {
    id: "S8",
    title: "해소",
    from: 498,
    duration: 36,
    visual: "48칸이 전부 연두 체크로 밝아진 대시보드가 뒤에 옅게",
    emphasis: "'수업' 손글씨 + 동그라미 — S1의 의심이 확신으로 (카피 수미상관)",
    sound: "음악 반 박자 쉼 → 슥슥 → 슥—",
    icons: ["Eye", "CircleCheck", "Activity", "TrendingUp"],
    cues: [{ at: 500, text: "이제야, {수업}이 보인다.", style: "slam", mark: "circle" }],
  },
  {
    id: "S9",
    title: "LOCKUP",
    from: 534,
    duration: 66,
    visual: "영상에 나온 아이콘이 궤도를 돌며 중앙으로 빨려 들어가 로고 · 태그라인 · CTA",
    emphasis: "'수업' 손글씨 + 밑줄",
    sound: "스우시 · 슥슥 → 슥 · f560 로고 히트 · (선택 VO) \"회의 말고, 수업. 클래스인.\"",
    icons: ["Presentation", "PenLine", "Trophy", "CircleDot", "LayoutDashboard", "Sparkles", "ArrowRight"],
    cues: [
      { at: 536, text: "회의 말고, {수업}.", style: "slam", mark: "underline" },
      { at: 560, text: "ClassIn", style: "logo" },
      { at: 570, text: "교육을 위해 만든 온라인 교실", style: "tag" },
      { at: 578, text: "도입 문의 · [URL]", style: "cta" },
    ],
    sfx: [
      { at: 536, name: "whoosh" },
      { at: 560, name: "hit" },
    ],
  },
];

export const sceneById = (id: string) => SCENES.find((s) => s.id === id)!;

// 카피의 손글씨 강조와 마크에서 '슥슥' 효과음 일정을 뽑는다 + 씬별 추가 효과음.
export const SFX: Sfx[] = SCENES.flatMap((s) => [
  ...(s.sfx ?? []),
  ...s.cues.flatMap((c): Sfx[] => {
    const word = emphasisOf(c.text);
    if (!word) return [];
    const t = emphasisTiming(word, c.delay);
    const out: Sfx[] = [{ at: c.at + t.write, name: word.length <= 3 ? "write-short" : "write-long" }];
    if (c.mark) out.push({ at: c.at + t.mark, name: c.mark });
    return out;
  }),
]).sort((a, b) => a.at - b.at);

// 믹스: 손글씨 소리가 주인공, UI 소리는 한 단계 아래
export const SFX_VOLUME: Record<SfxName, number> = {
  "write-short": 0.9,
  "write-long": 0.9,
  underline: 0.85,
  circle: 0.85,
  check: 0.85,
  highlight: 0.85,
  strike: 0.95,
  click: 0.5,
  pop: 0.35,
  tick: 0.22,
  whoosh: 0.35,
  hit: 0.8,
};
