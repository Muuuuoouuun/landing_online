// SCRIPT.md 대본(v6 · 24초 · 해요체 + 선언형 연쇄)을 프레임 단위 데이터로 옮긴 것.
// 본편(ClassIn24)과 애니매틱이 모두 이 데이터를 읽는다. 대본을 고치면 여기만 고친다.
// 모든 프레임 번호는 영상 전체 기준(절대값), 30fps.
// 카피의 {중괄호} = 연두 손글씨 강조(카피에만 사용). mark = 다 쓴 뒤 긋는 손그림 마크.
import { emphasisOf, emphasisTiming, MarkKind } from "./hand";
import type { IconName } from "./icons";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 24 * FPS; // 720f
export const BPM = 90;
export const BEAT = (FPS * 60) / BPM; // 20f
export const DROP = 76; // 음악 드롭 = S2 마커 와이프. 박자는 76 + 20k 프레임에 온다

export type CueStyle = "lead" | "story" | "slam" | "verb" | "kpi" | "tag" | "logo" | "cta";

export type Cue = { at: number; text: string; style: CueStyle; mark?: MarkKind; delay?: number };

export type SfxName =
  | "write-short"
  | "write-long"
  | "write-xl"
  | MarkKind
  | "click"
  | "pop"
  | "tick"
  | "whoosh"
  | "swell"
  | "shutter"
  | "hit"
  | "chime-1"
  | "chime-2"
  | "chime-3"
  | "chime-4"
  | "chime-5";
export type Sfx = { at: number; name: SfxName };

export type Scene = {
  id: string;
  title: string;
  eyebrow?: string;
  from: number;
  duration: number;
  cut: string; // 이 장면으로 들어오는 전환
  visual: string;
  emphasis: string; // 손글씨 강조 + 장점 장치
  sound: string;
  icons: IconName[];
  cues: Cue[];
  sfx?: Sfx[]; // 카피 밖 그래픽에 붙는 효과음
};

// 장면 경계는 전부 박자(76 + 20k) 위에 있다: 76 · 136 · 216 · 336 · 416 · 496 · 576 · 636
export const SCENES: Scene[] = [
  {
    id: "S1",
    title: "질문",
    from: 0,
    duration: 76,
    cut: "—",
    visual: "옅은 회색 회의 그리드 48칸이 하나씩 켜짐 · 전부 같은 크기 · 카메라 꺼짐·음소거 · 참여도는 평평한 선",
    emphasis: "'수업' 손글씨 + 동그라미",
    sound: "패드 + 물음표 같은 마림바 세 음 · 슥슥 → 슥—",
    icons: ["Grid3x3", "VideoOff", "MicOff", "Activity"],
    cues: [
      { at: 4, text: "원장님, 아직도 회의 툴로", style: "story" },
      { at: 24, text: "{수업}하세요?", style: "slam", mark: "circle" },
    ],
  },
  {
    id: "S2",
    title: "전환",
    from: 76,
    duration: 60,
    cut: "마커 와이프 — 연두 지그재그가 질문째 그리드를 지움 + 음악 드롭",
    visual: "그리드가 접혀 사라짐 → 카피 뒤 큰 음영 아이콘이 회의(카메라)에서 수업(칠판)으로 바뀜",
    emphasis: "'아니니까요' 손글씨 + 밑줄 · 음영 아이콘 회의 → 수업",
    sound: "f76 큰 스크리블 + 드롭 · 슥슥슥 → 슥 · 스우시",
    icons: ["Grid3x3", "Video", "Presentation"],
    cues: [{ at: 86, text: "수업은, 회의가 {아니니까요}.", style: "slam", mark: "underline", delay: 10 }],
    sfx: [
      { at: 76, name: "strike" },
      { at: 114, name: "whoosh" },
    ],
  },
  {
    id: "S3",
    title: "선언",
    from: 136,
    duration: 80,
    cut: "아이콘 모프 — 음영 칠판 아이콘이 날아가 선으로 그린 ClassIn 교실 창이 됨",
    visual: "선으로 그려지는 ClassIn 교실 창 · '딱 맞는'에 맞춰 초점 브래킷이 창 크기에 딱 맞게 스냅 · 하단에 빈 체크리스트 5칸 등장",
    emphasis: "'딱 맞는' 손글씨 + 형광펜 · 브래킷 스냅 · 체크리스트 등장",
    sound: "스우시 · 슥슥 → 스윽 · 스냅 클릭 · 체크리스트 팝",
    icons: ["Presentation", "ScanLine", "ListChecks"],
    cues: [
      { at: 142, text: "ClassIn은,", style: "lead" },
      { at: 148, text: "온라인 수업에", style: "slam" },
      { at: 154, text: "{딱 맞는} 교실이에요.", style: "slam", mark: "highlight" },
    ],
    sfx: [
      { at: 136, name: "whoosh" },
      { at: 194, name: "click" },
      { at: 199, name: "pop" },
    ],
  },
  {
    id: "S4",
    title: "수업",
    eyebrow: "실시간 상호작용",
    from: 216,
    duration: 120,
    cut: "선 → 실체 — 같은 자리의 선 그림 창이 실제 UI로 채워짐 (무컷)",
    visual:
      "ClassIn 교실 창 — 학생을 무대로 · 칠판 동시 판서 · 답변기 · 트로피 → 같은 창 안에서 실제 수업 화면으로 매치 컷(트로피 · 학생 주석)",
    emphasis: "동사 4개 손글씨(박자마다) · 상호작용 칩 순차 점등 · 매치 컷 위 연두 동그라미 · ✓ 실시간 상호작용",
    sound: "동사마다 슥슥 · 착지 팝 · 매치 컷 셔터 · 체크 차임",
    icons: ["Presentation", "MousePointer2", "PenLine", "Hand", "ListChecks", "Trophy", "Users", "Timer"],
    cues: [
      { at: 222, text: "온라인에서도", style: "story" },
      { at: 232, text: "무대로 {부르고},", style: "verb" },
      { at: 252, text: "칠판에 {같이 쓰고},", style: "verb" },
      { at: 272, text: "퀴즈로 {묻고},", style: "verb" },
      { at: 292, text: "트로피로 {칭찬해요}.", style: "verb" },
    ],
    sfx: [
      { at: 248, name: "pop" },
      { at: 308, name: "pop" },
      { at: 316, name: "shutter" },
      { at: 318, name: "circle" },
    ],
  },
  {
    id: "S5",
    title: "기록",
    eyebrow: "자동 기록",
    from: 336,
    duration: 80,
    cut: "클릭 → 축소 — '수업 종료'를 누르면 교실 창이 그대로 녹화 카드가 됨 (무컷)",
    visual: "스포트라이트 → '수업 종료' 클릭 → 교실 창이 녹화 카드로 → 수업 기록 6줄이 쌓임 → 기록 패널이 실제 과정 화면으로 펼쳐짐(녹화·리포트)",
    emphasis: "'기록' 손글씨 + 형광펜 · 스포트라이트 · 실사 위 동그라미 · ✓ 자동 기록",
    sound: "클릭 · 슥슥 → 스윽 · 행마다 틱 · 실사 동그라미 슥 · 체크 차임",
    icons: ["CircleDot", "CirclePlay", "UserCheck", "PenLine", "ListChecks", "Trophy", "MessageCircle", "CloudCheck"],
    cues: [
      { at: 346, text: "끝난 수업은,", style: "story" },
      { at: 358, text: "전부 {기록}이 되고,", style: "slam", mark: "highlight", delay: 6 },
    ],
    sfx: [
      { at: 344, name: "click" },
      { at: 368, name: "tick" },
      { at: 376, name: "tick" },
      { at: 384, name: "tick" },
      { at: 392, name: "circle" },
    ],
  },
  {
    id: "S6",
    title: "관리",
    eyebrow: "강사·수업 관리",
    from: 416,
    duration: 80,
    cut: "카메라 팬 — 화면 전체가 왼쪽으로 흘러 넓은 대시보드를 훑음. 카피는 위로 스크롤",
    visual: "기록이 강사 표로 흘러 들어가 숫자가 채워짐 → 실제 과정 화면(보강-결석자 · 채점하기) → 스포트라이트 → 강사 한 명 클릭 → 강사 카드",
    emphasis: "'클릭 한 번' 손글씨 + 밑줄 · 스포트라이트 · 실사 위 동그라미 · ✓ 강사·수업 관리",
    sound: "스우시 · 슥슥슥 → 슥 · 클릭 → 팝 · 체크 차임 · 클릭",
    icons: ["Users", "UserCheck", "BookOpen", "CalendarDays", "MousePointer2", "CirclePlay", "Gauge", "TrendingUp"],
    cues: [
      { at: 428, text: "쌓인 기록 덕분에,", style: "story" },
      { at: 440, text: "관리는 {클릭 한 번}이면 돼요.", style: "slam", mark: "underline", delay: 8 },
    ],
    sfx: [
      { at: 416, name: "whoosh" },
      { at: 442, name: "circle" },
      { at: 472, name: "click" },
      { at: 474, name: "pop" },
      { at: 494, name: "click" },
    ],
  },
  {
    id: "S7",
    title: "AI 강의 평가",
    eyebrow: "AI 강의 평가",
    from: 496,
    duration: 80,
    cut: "공유 요소 줌 — 강사 카드의 'AI 강의 평가' 타일이 커지며 그대로 AI 강의 평가 카드가 됨",
    visual: "AI 강의 평가 카드(점수 92 · 레이더 · 지표 · 개선 포인트) · 48개 수업을 AI가 훑으며 체크 · 직접 본 수업 0 vs AI 평가 48",
    emphasis: "'AI가 평가' 손글씨 + 밑줄 · 점수는 기본 폰트 · ✓ AI 강의 평가",
    sound: "슥슥슥 → 슥 · 체크 차임",
    icons: ["Sparkles", "Brain", "Gauge", "Radar", "MessageCircle", "Lightbulb", "ClipboardCheck"],
    cues: [
      { at: 504, text: "다 못 보는 수업은,", style: "story" },
      { at: 514, text: "{AI가 평가}해 드려요.", style: "slam", mark: "underline" },
    ],
  },
  {
    id: "S8",
    title: "사무실은 선택",
    eyebrow: "어디서나 운영",
    from: 576,
    duration: 60,
    cut: "줌 아웃 매치 컷 — 대시보드가 기울며 작아져 실제 노트북 사진의 화면 속으로 들어감",
    visual: "노트북 수업 사진이 중심 · 서울·대전 강사, 부산·제주·뉴욕 학생, 어디서나 원장님이 연두 점선으로 연결",
    emphasis: "'선택' 손글씨 + 형광펜 · ✓ 어디서나 운영",
    sound: "낮은 스웰 · 핀마다 틱 · 슥슥 → 스윽 · 체크 차임",
    icons: ["Laptop", "MapPin", "House", "Globe", "Wifi"],
    cues: [
      { at: 588, text: "사무실은 이제,", style: "story" },
      { at: 598, text: "{선택}이에요.", style: "slam", mark: "highlight" },
    ],
    sfx: [
      { at: 576, name: "swell" },
      { at: 596, name: "tick" },
      { at: 604, name: "tick" },
      { at: 612, name: "tick" },
    ],
  },
  {
    id: "S9",
    title: "엔딩",
    from: 636,
    duration: 84,
    cut: "수렴 — 핀·연결선·사진이 중앙으로 모이고, 체크리스트 5칸이 한 줄로 합쳐짐",
    visual: "슬로건 → 연두 링 + 로고 히트 → 체크리스트가 태그라인으로 변신 → CTA",
    emphasis: "'수업' 손글씨 + 밑줄 · 체크리스트 5/5",
    sound: "스우시 · 슥슥 → 슥 · f676 로고 히트(음악 마지막 화음)",
    icons: ["CircleCheck", "ArrowRight"],
    cues: [
      { at: 638, text: "회의 말고, {수업}.", style: "slam", mark: "underline", delay: 8 },
      { at: 676, text: "ClassIn", style: "logo" },
      { at: 684, text: "온라인 수업에 딱 맞는 교실", style: "tag" },
      { at: 694, text: "도입 문의 · [URL]", style: "cta" },
    ],
    sfx: [
      { at: 636, name: "whoosh" },
      { at: 676, name: "hit" },
    ],
  },
];

export const sceneById = (id: string) => SCENES.find((s) => s.id === id)!;

// '온라인 수업 체크리스트' — S3에서 빈 칸으로 등장해 장면마다 하나씩 증명된다.
// from = 증거 토큰이 출발하는 화면 좌표, land = 칩에 닿아 체크되는 프레임(차임).
export const CHECKLIST_IN = 198;
export const TOKEN_FLIGHT = 16;
export type CheckItem = { label: string; icon: IconName; scene: string; from: [number, number]; land: number };
export const CHECKLIST: CheckItem[] = [
  { label: "실시간 상호작용", icon: "Presentation", scene: "S4", from: [1081, 295], land: 336 },
  { label: "자동 기록", icon: "CircleDot", scene: "S5", from: [1530, 780], land: 412 },
  { label: "강사·수업 관리", icon: "Users", scene: "S6", from: [201, 617], land: 490 },
  { label: "AI 강의 평가", icon: "Sparkles", scene: "S7", from: [1011, 555], land: 568 },
  { label: "어디서나 운영", icon: "Laptop", scene: "S8", from: [960, 610], land: 630 },
];

const writeSound = (word: string): SfxName => {
  const n = word.replace(/\s/g, "").length;
  return n <= 2 ? "write-short" : n <= 4 ? "write-long" : "write-xl";
};

// 카피의 손글씨 강조와 마크에서 '슥슥' 효과음 일정을 뽑는다 + 씬별 추가 효과음 + 체크 차임.
export const SFX: Sfx[] = [
  ...SCENES.flatMap((s) => [
    ...(s.sfx ?? []),
    ...s.cues.flatMap((c): Sfx[] => {
      const word = emphasisOf(c.text);
      if (!word) return [];
      const t = emphasisTiming(word, c.delay);
      const out: Sfx[] = [{ at: c.at + t.write, name: writeSound(word) }];
      if (c.mark) out.push({ at: c.at + t.mark, name: c.mark });
      return out;
    }),
  ]),
  ...CHECKLIST.map((c, i): Sfx => ({ at: c.land, name: `chime-${i + 1}` as SfxName })),
].sort((a, b) => a.at - b.at);

// 믹스: BGM 위에 '슥슥'이 또렷이 얹히되 튀지 않게, UI 소리는 그보다 한 단계 아래
export const SFX_VOLUME: Record<SfxName, number> = {
  "write-short": 0.45,
  "write-long": 0.45,
  "write-xl": 0.45,
  underline: 0.42,
  circle: 0.42,
  check: 0.42,
  highlight: 0.42,
  strike: 0.5,
  click: 0.4,
  pop: 0.3,
  tick: 0.16,
  whoosh: 0.28,
  swell: 0.34,
  shutter: 0.36,
  hit: 0.4,
  "chime-1": 0.24,
  "chime-2": 0.24,
  "chime-3": 0.24,
  "chime-4": 0.24,
  "chime-5": 0.24,
};

// 전체 음량 — 효과음·음악 비율은 그대로 두고 믹스를 약 −16 LUFS(웹 영상 기준)로 맞춘다
export const MASTER = 1.48;

// BGM — scripts/make-bgm.py로 만든 오리지널 음원. 손글씨 소리가 날 때는 살짝 비켜 준다(덕킹).
export const MUSIC_VOLUME = 0.5;
const SCRIBBLES: SfxName[] = ["write-short", "write-long", "write-xl", "underline", "circle", "check", "highlight", "strike"];
const DUCKS = SFX.filter((s) => SCRIBBLES.includes(s.name)).map((s) => s.at);
export const musicVolume = (frame: number) => {
  const duck = DUCKS.reduce((d, at) => {
    const x = frame - at;
    const w = x < -2 || x > 22 ? 0 : x < 0 ? (x + 2) / 2 : x > 16 ? (22 - x) / 6 : 1;
    return Math.max(d, w);
  }, 0);
  return MASTER * MUSIC_VOLUME * (1 - 0.25 * duck);
};
