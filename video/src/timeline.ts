// SCRIPT.md 대본(v3 · 원장님 시점 흐름형)을 프레임 단위 데이터로 옮긴 것. 대본을 고치면 여기도 같이 고친다.
// 모든 프레임 번호는 영상 전체 기준(절대값), 30fps.
// 카피의 {중괄호} = 연두 손글씨 강조. mark = 다 쓴 뒤 긋는 손그림 마크.
import { emphasisOf, emphasisTiming, MarkKind } from "./hand";
import type { IconName } from "./icons";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 15 * FPS; // 450f
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM; // 15f

export type CueStyle = "story" | "slam" | "verb" | "kpi" | "tag" | "logo" | "cta";

export type Cue = { at: number; text: string; style: CueStyle; mark?: MarkKind; delay?: number };

export type SfxName = "write-short" | "write-long" | MarkKind;
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
  sfx?: Sfx[]; // 카피 밖 그래픽에 붙는 슥슥 (그리드 낙서, 점수 동그라미 등)
};

export const SCENES: Scene[] = [
  {
    id: "S1",
    title: "고민",
    from: 0,
    duration: 60,
    visual: "옅은 회색 회의 그리드 48칸 · 전부 같은 크기 · 카메라 꺼짐·음소거 아이콘 · 참여도 선은 평평",
    emphasis: "'수업' 손글씨 + 흔들리는 동그라미 — 의심의 표시",
    sound: "조용한 룸톤 · 단어 틱 · 슥슥(쓰기) → 슥—(동그라미)",
    icons: ["Grid3x3", "VideoOff", "MicOff", "MonitorUp", "WifiOff", "Moon", "FaceNeutral", "Activity"],
    cues: [
      { at: 4, text: "회의 툴로 여는 48개의 수업.", style: "story" },
      { at: 24, text: "정말 {수업}이었을까?", style: "slam", mark: "circle" },
    ],
  },
  {
    id: "S2",
    title: "전환",
    from: 60,
    duration: 36,
    visual: "연두 마커가 회의 그리드를 지그재그로 지워 버림 → 지운 자리에 ClassIn 교실(강단·칠판·도구바)이 그려지듯 등장",
    emphasis: "그리드 위 연두 스크리블 · '아니니까' 손글씨 + 밑줄",
    sound: "f60 큰 스크리블(슥슥슥) + 킥 → 음악 인",
    icons: ["Grid3x3", "PenLine", "Presentation", "Sparkles"],
    cues: [{ at: 64, text: "수업은, 회의가 {아니니까}.", style: "slam", mark: "underline" }],
    sfx: [{ at: 60, name: "strike" }],
  },
  {
    id: "S3",
    title: "수업",
    eyebrow: "01 / INTERACTIVE CLASSROOM",
    from: 96,
    duration: 84,
    visual: "밝은 교실 UI — 강단 좌석 · 칠판 · 답변기 · 트로피. 동사마다 그 기능이 작동하고, 칠판 판서도 같은 연두 손글씨",
    emphasis: "동사 4개를 손글씨로 · 상호작용 칩이 하나씩 연두로 점등",
    sound: "동사마다 슥슥 · 비트 위 가벼운 클랩",
    icons: ["Presentation", "MousePointer2", "PenLine", "Hand", "ListChecks", "Trophy", "Users", "Timer"],
    cues: [
      { at: 98, text: "온라인에서도,", style: "story" },
      { at: 108, text: "무대로 {부르고},", style: "verb", delay: 2 },
      { at: 126, text: "칠판에 {같이 쓰고},", style: "verb", delay: 2 },
      { at: 144, text: "퀴즈로 {묻고},", style: "verb", delay: 2 },
      { at: 162, text: "트로피로 {칭찬하고}.", style: "verb", delay: 2 },
    ],
  },
  {
    id: "S4",
    title: "녹화",
    eyebrow: "02 / AUTO RECORDING",
    from: 180,
    duration: 45,
    visual: "'수업 종료' 클릭 → 화면이 필름 스트립처럼 접혀 다시보기 카드로 · 타임라인에 판서·퀴즈·트로피 챕터 마커",
    emphasis: "'녹화 완료'를 칠판에 정답 쓰듯 손글씨 + 체크 · 녹화 버튼 0번 배지",
    sound: "클릭 · 테이프 리와인드 · 슥슥(쓰기) → 슥(체크)",
    icons: ["CircleDot", "Film", "CirclePlay", "CloudCheck", "RotateCcw", "Check", "Smartphone"],
    cues: [
      { at: 182, text: "수업 종료 = {녹화 완료}", style: "slam", mark: "check", delay: 8 },
      { at: 214, text: "자동 녹화 · 판서까지 그대로 · 바로 다시보기", style: "tag" },
    ],
  },
  {
    id: "S5",
    title: "관리",
    eyebrow: "03 / INSTITUTION ADMIN",
    from: 225,
    duration: 60,
    visual: "돌리아웃 — 교실이 8×6 교실 월의 한 칸으로 → 사이드바·KPI 카드가 붙어 관리자 대시보드 · 커서 클릭 → '순찰 중' 배지",
    emphasis: "'한 화면' 손글씨 + 연두 형광펜 · 48 → 1 수렴 · KPI 칩",
    sound: "베이스 스웰 · 카운터 틱 · 슥슥(쓰기) → 스윽(형광펜)",
    icons: ["LayoutDashboard", "School", "BookOpen", "CalendarDays", "UserCheck", "Users", "Eye", "MonitorPlay"],
    cues: [
      { at: 227, text: "48개 교실을,", style: "story" },
      { at: 241, text: "{한 화면}에서.", style: "slam", mark: "highlight" },
      { at: 264, text: "진행 중 수업 48", style: "kpi" },
      { at: 270, text: "오늘 출석률 97.4%", style: "kpi" },
      { at: 276, text: "순찰 · 출결 · 시간표 · 강사·학생 계정", style: "tag" },
    ],
  },
  {
    id: "S6",
    title: "AI",
    eyebrow: "04 / AI LECTURE EVALUATION",
    from: 285,
    duration: 75,
    visual: "스캔 라인이 48칸을 훑고 칸마다 연두 체크 → AI 강의 평가 카드(점수 · 레이더 5축 · 발화 비율 · 개선 포인트)",
    emphasis: "'AI가 평가' 손글씨 + 밑줄 · 점수 '92'는 채점하듯 손글씨 + 동그라미 · 직접 본 수업 0 vs AI 평가 48",
    sound: "디지털 스캔 스윕 · 슥슥(쓰기) → 슥(밑줄) → 슥슥 + 슥—(채점)",
    icons: ["ScanLine", "Sparkles", "Brain", "Gauge", "Radar", "MessageCircle", "Lightbulb", "ClipboardCheck"],
    cues: [
      { at: 287, text: "다 볼 수 없는 수업은,", style: "story" },
      { at: 303, text: "{AI가 평가}한다.", style: "slam", mark: "underline" },
      { at: 334, text: "AI 강의 평가 {92}", style: "kpi", mark: "circle" },
      { at: 344, text: "48개 수업 평가 완료 · 원장님이 직접 본 수업 0", style: "tag" },
    ],
  },
  {
    id: "S7",
    title: "해소",
    from: 360,
    duration: 45,
    visual: "대시보드 48칸이 하나씩 연두 체크로 채워지며 밝아짐 · 참여도 선이 살아 있는 파형으로",
    emphasis: "'수업' 손글씨 + 동그라미 — S1의 의심 동그라미가 확신의 동그라미로 (카피 수미상관)",
    sound: "음악 반 박자 쉼 → 슥슥 → 슥— · 따뜻한 패드",
    icons: ["Eye", "CircleCheck", "Activity", "TrendingUp", "LayoutDashboard"],
    cues: [
      { at: 362, text: "이제야,", style: "story" },
      { at: 370, text: "{수업}이 보인다.", style: "slam", mark: "circle" },
    ],
  },
  {
    id: "S8",
    title: "LOCKUP",
    from: 405,
    duration: 45,
    visual: "영상에 나온 아이콘이 궤도를 그리며 중앙으로 모여 로고 · 슬로건 · CTA",
    emphasis: "'수업' 손글씨 + 길게 긋는 밑줄 스우시",
    sound: "슥슥 → 스윽(밑줄) → f426 로고 히트 · (선택 VO) \"회의 말고, 수업. 클래스인.\"",
    icons: ["Presentation", "PenLine", "Trophy", "CircleDot", "LayoutDashboard", "Sparkles", "ArrowRight"],
    cues: [
      { at: 405, text: "회의 말고, {수업}.", style: "slam", mark: "underline" },
      { at: 426, text: "ClassIn", style: "logo" },
      { at: 434, text: "교육을 위해 만든 온라인 교실", style: "tag" },
      { at: 440, text: "도입 문의 · [URL]", style: "cta" },
    ],
  },
];

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
