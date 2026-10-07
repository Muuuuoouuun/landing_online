// SCRIPT.md 대본(v2 · 스토리텔링)을 프레임 단위 데이터로 옮긴 것. 대본을 고치면 여기도 같이 고친다.
// 모든 프레임 번호는 영상 전체 기준(절대값), 30fps.
import type { IconName } from "./icons";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 15 * FPS; // 450f
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM; // 15f

export type CueStyle =
  | "story" // 내레이션 문장 (이야기를 끌고 가는 줄)
  | "slam" // 대형 슬램
  | "accent" // 코랄 강조
  | "verb" // 동사 컷 — 한 번에 하나만 보임
  | "kpi" // 숫자 카운트업
  | "tag" // 기능 태그 / 작은 캡션
  | "logo"
  | "cta";

export type Cue = { at: number; text: string; style: CueStyle };

export type Scene = {
  id: string;
  title: string;
  eyebrow?: string;
  from: number;
  duration: number;
  visual: string;
  benefit: string; // 장점 표현 장치
  sound: string;
  icons: IconName[];
  cues: Cue[];
};

export const SCENES: Scene[] = [
  {
    id: "S1",
    title: "회의 화면",
    from: 0,
    duration: 60,
    visual: "회색 4×4 균일 그리드 · 민준 타일(카메라·마이크 꺼짐) · 졸음·끊김 타일 · 화면 공유 바",
    benefit: "참여도 미터가 바닥에 붙은 평평한 선 — S3에서 차오를 기준점 · 채도 0%",
    sound: "룸톤 험 · 알림음 · 단어마다 키보드 틱 · f30 라이저",
    icons: ["VideoOff", "MicOff", "MonitorUp", "Grid3x3", "WifiOff", "Moon", "FaceNeutral", "Activity"],
    cues: [
      { at: 4, text: "회의 화면 속 민준이는,", style: "story" },
      { at: 20, text: "오늘도 카메라를 껐다.", style: "story" },
      { at: 46, text: "하지만 오늘은,", style: "story" },
    ],
  },
  {
    id: "S2",
    title: "수업이었다",
    from: 60,
    duration: 30,
    visual: "그리드 셔터 → 강단 6석 + 칠판 + 도구바 교실로 재조립 · 회색 → 컬러",
    benefit: "'회의' 취소선 → '수업' 배지 · 채도 0→100% (회색 세계가 교실의 온도로)",
    sound: "f60 임팩트 + 디지털 글래스 · 베이스 드롭(메인 비트 인)",
    icons: ["Grid3x3", "Presentation", "Zap", "Sparkles"],
    cues: [{ at: 60, text: "수업이었다.", style: "accent" }],
  },
  {
    id: "S3",
    title: "무대 · 판서 · 퀴즈 · 트로피",
    eyebrow: "01 / INTERACTIVE CLASSROOM",
    from: 90,
    duration: 90,
    visual: "커서가 민준 타일을 강단으로 드래그 · 2색 동시 판서 · 답변기 A–D · 트로피 포물선 + 파티클",
    benefit: "참여도 미터가 상호작용마다 한 칸씩 차오름 · 손들기/판서/퀴즈/트로피 칩이 차례로 점등",
    sound: "동사마다 퍼커시브 스탭(비트 싱크) · f166 반짝 SFX",
    icons: ["MousePointer2", "Presentation", "PenLine", "Hand", "ListChecks", "Medal", "Trophy", "FaceSlightlySmiling"],
    cues: [
      { at: 92, text: "선생님이 민준이를", style: "story" },
      { at: 104, text: "무대로 불렀다.", style: "slam" },
      { at: 122, text: "칠판에 같이 풀고,", style: "verb" },
      { at: 138, text: "퀴즈 1등,", style: "verb" },
      { at: 152, text: "트로피 하나.", style: "verb" },
      { at: 166, text: "민준이가 웃었다.", style: "tag" },
    ],
  },
  {
    id: "S4",
    title: "밤 11시",
    eyebrow: "02 / AUTO RECORDING",
    from: 180,
    duration: 45,
    visual: "교실이 필름 스트립으로 접혀 폰 화면 '수업 다시보기'로 · 타임라인에 판서·퀴즈·트로피 챕터 마커",
    benefit: "체크 배지 — 녹화 버튼 0번 · 판서 ✓ 화면 ✓ 음성 ✓ · 자동 저장",
    sound: "테이프 리와인드 · 셔터 · 체크 딩",
    icons: ["Moon", "Smartphone", "CirclePlay", "CircleDot", "Film", "CloudCheck", "RotateCcw", "Check"],
    cues: [
      { at: 182, text: "밤 11시,", style: "story" },
      { at: 192, text: "오늘 수업을 한 번 더 봤다.", style: "slam" },
      { at: 206, text: "자동 녹화 · 판서까지 그대로", style: "tag" },
    ],
  },
  {
    id: "S5",
    title: "같은 시각, 원장님은",
    eyebrow: "03 / INSTITUTION ADMIN",
    from: 225,
    duration: 60,
    visual: "돌리아웃 — 폰 → 민준의 교실 → 8×6 교실 월(민준 교실은 코랄 외곽선 추적) → 관리자 대시보드",
    benefit: "48 → 1 수렴 카운터 · KPI 칩 카운트업 · 커서 클릭 → '순찰 중' 배지",
    sound: "베이스 스웰 · 카운터 틱 · UI 우쉬",
    icons: ["LayoutDashboard", "School", "BookOpen", "CalendarDays", "UserCheck", "Users", "Eye", "MonitorPlay"],
    cues: [
      { at: 227, text: "같은 시각, 원장님은", style: "story" },
      { at: 241, text: "48개 교실을, 한 화면에서.", style: "slam" },
      { at: 258, text: "진행 중 수업 48", style: "kpi" },
      { at: 264, text: "오늘 출석률 97.4%", style: "kpi" },
      { at: 270, text: "순찰 · 출결 · 시간표 · 강사·학생 계정", style: "tag" },
    ],
  },
  {
    id: "S6",
    title: "AI가 봤다",
    eyebrow: "04 / AI LECTURE EVALUATION",
    from: 285,
    duration: 75,
    visual: "스캔 라인이 48칸을 훑고 칸마다 체크 · AI 강의 평가 카드(점수 링 · 레이더 5축 · 발화 비율 · 개선 포인트)",
    benefit: "비교 카운터 — 원장님이 직접 본 수업 0 · AI가 평가한 수업 48 ✓ · 강사별 평가 순위",
    sound: "디지털 아르페지오 · 스캐너 스윕 · 글리치 · 라이저",
    icons: ["ScanLine", "Sparkles", "Brain", "Gauge", "Radar", "MessageCircle", "Lightbulb", "ClipboardCheck"],
    cues: [
      { at: 287, text: "다 볼 수는 없으니까,", style: "story" },
      { at: 303, text: "AI가 봤다.", style: "accent" },
      { at: 318, text: "AI 강의 평가 92", style: "kpi" },
      { at: 326, text: "48개 수업 평가 완료 · 강사별 개선 포인트", style: "tag" },
      { at: 340, text: "직접 본 수업 0 · AI 평가 48", style: "kpi" },
    ],
  },
  {
    id: "S7",
    title: "다음 날",
    from: 360,
    duration: 45,
    visual: "S1과 같은 구도의 민준 타일 클로즈업(수미상관) · 카메라 꺼짐 → 켜짐 플립 · 주변 타일도 하나둘 켜짐",
    benefit: "S1의 평평한 참여도 선이 살아 있는 파형으로 — before / after",
    sound: "음악이 한 박자 빠짐(정적) → 카메라 켜지는 '틱' → 따뜻한 패드",
    icons: ["Sun", "VideoOff", "Video", "Mic", "FaceGrinning", "Heart", "Activity"],
    cues: [
      { at: 362, text: "다음 날,", style: "story" },
      { at: 372, text: "민준이는 카메라를 켰다.", style: "slam" },
    ],
  },
  {
    id: "S8",
    title: "LOCKUP",
    from: 405,
    duration: 45,
    visual: "영상에 나온 아이콘 전부가 궤도를 그리며 중앙으로 빨려 들어가 로고가 됨 · CTA 버튼",
    benefit: "아이콘 궤도 = 지금까지 본 기능이 전부 하나의 플랫폼",
    sound: "리버스 석션 → f412 최종 히트 · 쉬머 + 리버브 테일 / (선택 VO) \"회의 말고, 수업. 클래스인.\"",
    icons: ["Presentation", "PenLine", "Trophy", "CircleDot", "LayoutDashboard", "Sparkles", "ArrowRight"],
    cues: [
      { at: 405, text: "회의 말고, 수업.", style: "accent" },
      { at: 414, text: "ClassIn", style: "logo" },
      { at: 424, text: "교육을 위해 만든 온라인 교실", style: "tag" },
      { at: 432, text: "도입 문의 · [URL]", style: "cta" },
    ],
  },
];
