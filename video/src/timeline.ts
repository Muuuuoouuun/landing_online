// SCRIPT.md 대본(v5 · 20초 · 해요체 + 선언형 연쇄)을 프레임 단위 데이터로 옮긴 것.
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
    title: "질문",
    from: 0,
    duration: 57,
    visual: "옅은 회색 회의 그리드 48칸이 하나씩 켜짐 · 전부 같은 크기 · 카메라 꺼짐·음소거 · 참여도는 평평한 선",
    emphasis: "'수업' 손글씨 + 동그라미",
    sound: "조용한 룸톤 · 슥슥 → 슥—",
    icons: ["Grid3x3", "VideoOff", "MicOff", "MonitorUp", "WifiOff", "Moon", "FaceNeutral", "Activity"],
    cues: [
      { at: 4, text: "원장님, 아직도 회의 툴로", style: "story" },
      { at: 22, text: "{수업}하세요?", style: "slam", mark: "circle" },
    ],
  },
  {
    id: "S2",
    title: "전환",
    from: 57,
    duration: 51,
    visual: "연두 마커가 회의 그리드를 지움 → 카피 뒤 큰 음영 아이콘이 회의(카메라)에서 수업(칠판)으로 바뀜",
    emphasis: "'아니니까요' 손글씨 + 밑줄 · 음영 아이콘 회의 → 수업",
    sound: "f57 큰 스크리블 · 슥슥슥 → 슥 · 스우시",
    icons: ["Grid3x3", "Video", "Presentation", "PenLine"],
    cues: [{ at: 74, text: "수업은, 회의가 {아니니까요}.", style: "slam", mark: "underline" }],
    sfx: [
      { at: 57, name: "strike" },
      { at: 102, name: "whoosh" },
    ],
  },
  {
    id: "S3",
    title: "수업",
    eyebrow: "INTERACTIVE CLASSROOM",
    from: 108,
    duration: 99,
    visual: "ClassIn 교실 창 — 학생을 강단으로 · 칠판 동시 판서 · 답변기 · 트로피 → 실제 수업 화면 컷(트로피 ×3 · 학생 주석)",
    emphasis: "동사 4개 손글씨 · 상호작용 칩 순차 점등 · 실사 컷 위 연두 동그라미",
    sound: "동사마다 슥슥 · 착지마다 팝 · 실사 컷 클릭 + 슥—",
    icons: ["Presentation", "MousePointer2", "PenLine", "Hand", "ListChecks", "Trophy", "Users", "Timer"],
    cues: [
      { at: 110, text: "온라인에서도", style: "story" },
      { at: 122, text: "무대로 {부르고},", style: "verb", delay: 2 },
      { at: 138, text: "칠판에 {같이 쓰고},", style: "verb", delay: 1 },
      { at: 154, text: "퀴즈로 {묻고},", style: "verb", delay: 2 },
      { at: 170, text: "트로피로 {칭찬해요}.", style: "verb", delay: 2 },
    ],
    sfx: [
      { at: 134, name: "pop" },
      { at: 156, name: "pop" },
      { at: 182, name: "pop" },
      { at: 186, name: "click" },
      { at: 192, name: "circle" },
    ],
  },
  {
    id: "S4",
    title: "기록",
    eyebrow: "AUTO RECORDING · CLASS RECORD",
    from: 207,
    duration: 78,
    visual: "'수업 종료' 클릭 → 교실 창이 녹화 카드로 → 출결·판서·퀴즈·트로피·질문이 '수업 기록'에 쌓임 → 실제 과정 화면 컷(녹화·리포트 버튼)",
    emphasis: "'기록' 손글씨 + 형광펜 · 실사 컷 위 녹화·리포트에 동그라미",
    sound: "클릭 · 슥슥 → 스윽 · 행마다 틱 · 실사 컷 클릭 + 슥—",
    icons: ["CircleDot", "CirclePlay", "UserCheck", "PenLine", "ListChecks", "Trophy", "MessageCircle", "CloudCheck"],
    cues: [
      { at: 209, text: "끝난 수업은,", style: "story" },
      { at: 221, text: "전부 {기록}이 되고,", style: "slam", mark: "highlight" },
    ],
    sfx: [
      { at: 211, name: "click" },
      { at: 241, name: "tick" },
      { at: 245, name: "tick" },
      { at: 249, name: "tick" },
      { at: 253, name: "tick" },
      { at: 257, name: "tick" },
      { at: 261, name: "tick" },
      { at: 261, name: "click" },
      { at: 267, name: "circle" },
    ],
  },
  {
    id: "S5",
    title: "관리",
    eyebrow: "TEACHER · CLASS MANAGEMENT",
    from: 285,
    duration: 96,
    visual: "데이터가 강사 표로 흘러 들어가 숫자가 채워짐 → 강사 한 명 클릭 → 강사 카드 → 실제 과정 화면 컷(보강-결석자 반 · 채점하기)",
    emphasis: "'클릭 한 번' 손글씨 + 밑줄 · 실사 컷 위 동그라미",
    sound: "스우시 · 슥슥슥 → 슥 · 클릭 → 팝 · 실사 컷 클릭 + 슥—",
    icons: ["Users", "UserCheck", "BookOpen", "CalendarDays", "MousePointer2", "CirclePlay", "Gauge", "TrendingUp"],
    cues: [
      { at: 287, text: "쌓인 기록 덕분에,", style: "story" },
      { at: 299, text: "관리는 {클릭 한 번}이면 돼요.", style: "slam", mark: "underline" },
    ],
    sfx: [
      { at: 289, name: "whoosh" },
      { at: 337, name: "click" },
      { at: 341, name: "pop" },
      { at: 355, name: "click" },
      { at: 361, name: "circle" },
    ],
  },
  {
    id: "S6",
    title: "AI 강의 평가",
    eyebrow: "AI LECTURE EVALUATION",
    from: 381,
    duration: 60,
    visual: "사이드바 '에이전트 › AI 평가 NEW' 클릭 → AI 강의 평가 카드(점수 92 · 레이더 · 개선 포인트) · 직접 본 수업 0 vs AI 평가 48",
    emphasis: "'AI가 평가' 손글씨 + 밑줄 · 점수는 기본 폰트",
    sound: "클릭 · 팝 · 슥슥슥 → 슥",
    icons: ["Sparkles", "MousePointer2", "Brain", "Gauge", "Radar", "MessageCircle", "Lightbulb", "ClipboardCheck"],
    cues: [
      { at: 383, text: "다 못 보는 수업은,", style: "story" },
      { at: 395, text: "{AI가 평가}해 드려요.", style: "slam", mark: "underline" },
    ],
    sfx: [
      { at: 389, name: "click" },
      { at: 397, name: "pop" },
    ],
  },
  {
    id: "S7",
    title: "사무실은 선택",
    eyebrow: "NO OFFICE NEEDED",
    from: 441,
    duration: 60,
    visual: "사무실 건물이 접혀 사라지고, 실제 노트북 수업 사진 한 장에 기관 전체 · 서울·부산·제주·뉴욕의 강사와 학생이 선으로 연결",
    emphasis: "'선택' 손글씨 + 형광펜",
    sound: "스우시 · 핀마다 틱 · 슥슥 → 스윽",
    icons: ["Building", "Laptop", "MapPin", "House", "Globe", "Wifi", "LayoutDashboard", "Users"],
    cues: [
      { at: 443, text: "사무실은 이제,", style: "story" },
      { at: 457, text: "{선택}이에요.", style: "slam", mark: "highlight" },
    ],
    sfx: [
      { at: 445, name: "whoosh" },
      { at: 467, name: "tick" },
      { at: 475, name: "tick" },
      { at: 483, name: "tick" },
    ],
  },
  {
    id: "S8",
    title: "해소",
    from: 501,
    duration: 33,
    visual: "48칸이 전부 연두 체크로 밝아진 대시보드가 뒤에 옅게",
    emphasis: "'수업' 손글씨 + 동그라미 — S1의 질문 동그라미에 대한 답",
    sound: "슥슥 → 슥—",
    icons: ["Eye", "CircleCheck", "Activity", "TrendingUp"],
    cues: [{ at: 503, text: "이제 원장님은, {수업}만 보세요.", style: "slam", mark: "circle" }],
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
      { at: 534, name: "whoosh" },
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
