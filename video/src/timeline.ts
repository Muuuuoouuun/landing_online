// SCRIPT.md 대본을 프레임 단위 데이터로 옮긴 것. 대본을 고치면 여기도 같이 고친다.
// 모든 프레임 번호는 영상 전체 기준(절대값), 30fps.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 15 * FPS; // 450f
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM; // 15f

export type CueStyle =
  | "hook" // 밋밋한 회의 툴 톤
  | "slam" // 대형 슬램
  | "accent" // 코랄 강조
  | "verb" // 동사 컷 — 한 번에 하나만 보임
  | "line" // 문장
  | "kpi" // 숫자 카운트업
  | "tag" // 기능 태그 / 인사이트 카드
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
  motion: string;
  sound: string;
  cues: Cue[];
};

export const SCENES: Scene[] = [
  {
    id: "S1",
    title: "HOOK — 회의실",
    from: 0,
    duration: 45,
    visual: "회색 4×4 회의 그리드 · 음소거 아이콘 · 카메라 꺼짐 · 졸고 있는 타일",
    motion: "느린 푸시인 · 타자기식 단어 등장 · f36 '?' 바운스 · f40 타일에 균열",
    sound: "룸톤 험 · 알림음 · 단어마다 키보드 틱 · f24부터 라이저",
    cues: [
      { at: 3, text: "아직도", style: "hook" },
      { at: 12, text: "회의용 툴로", style: "hook" },
      { at: 24, text: "수업하세요?", style: "hook" },
    ],
  },
  {
    id: "S2",
    title: "BREAK — 회의 말고, 수업.",
    from: 45,
    duration: 45,
    visual: "그리드 산산조각 → 회색이 딥 에메랄드로 → 타일이 강단+칠판 교실로 재조립",
    motion: "2f 화이트 플래시 · 3D 타일 셔터 + 모션블러 · 스케일 슬램 · 크로매틱 쉐이크 · 라이트 릭",
    sound: "f45 임팩트+디지털 글래스 · f60 베이스 드롭(메인 비트 시작) · 리버스 우쉬",
    cues: [
      { at: 47, text: "회의 말고,", style: "slam" },
      { at: 60, text: "수업.", style: "accent" },
    ],
  },
  {
    id: "S3",
    title: "INTERACTIVE CLASSROOM",
    eyebrow: "01 / INTERACTIVE CLASSROOM",
    from: 90,
    duration: 105,
    visual: "ClassIn 교실 UI — 강단 · 칠판 · 답변기 · 트로피 · 소그룹",
    motion: "동사마다 하드컷 + 동사가 뜻대로 움직이는 타이포(쓰이고·올라가고·쪼개짐) + UI 마이크로 인터랙션",
    sound: "동사마다 퍼커시브 스탭(비트 싱크) · f180 스네어 롤",
    cues: [
      { at: 90, text: "온라인에서도,", style: "line" },
      { at: 105, text: "판서하고", style: "verb" },
      { at: 120, text: "무대에 올리고", style: "verb" },
      { at: 135, text: "퀴즈 내고", style: "verb" },
      { at: 150, text: "트로피 주고", style: "verb" },
      { at: 165, text: "그룹 나누고", style: "verb" },
      { at: 180, text: "교실 그대로.", style: "accent" },
    ],
  },
  {
    id: "S4",
    title: "AUTO RECORDING",
    eyebrow: "02 / AUTO RECORDING",
    from: 195,
    duration: 45,
    visual: "'수업 종료' 클릭 → 화면이 필름 스트립으로 접히며 가로 질주 · ● REC 점멸 → 다시보기 카드",
    motion: "클릭 리플 · 고속 패닝 + 모션블러 · '=' 회전 등장 · 체크 마크 드로잉",
    sound: "테이프 리와인드 · 셔터 · 체크 딩",
    cues: [
      { at: 198, text: "수업 종료", style: "slam" },
      { at: 208, text: "=", style: "accent" },
      { at: 214, text: "녹화 완료", style: "slam" },
      { at: 222, text: "자동 녹화 · 판서까지 그대로 · 바로 다시보기", style: "tag" },
    ],
  },
  {
    id: "S5",
    title: "INSTITUTION ADMIN",
    eyebrow: "03 / INSTITUTION ADMIN",
    from: 240,
    duration: 75,
    visual: "카메라 돌리아웃 — 교실이 8×6 라이브 교실 월의 한 칸 → 관리자 대시보드(좌측 메뉴 · KPI 카드)",
    motion: "줌아웃(1→0.12) · 패널 슬라이드인 · 숫자 카운트업 · 기능 태그 티커",
    sound: "베이스 스웰 · 카운터 틱 · UI 우쉬",
    cues: [
      { at: 246, text: "모든 교실을,", style: "line" },
      { at: 260, text: "한 화면에서.", style: "slam" },
      { at: 276, text: "진행 중 수업 128", style: "kpi" },
      { at: 282, text: "오늘 출석률 97.4%", style: "kpi" },
      { at: 288, text: "이번 달 수업 3,412회", style: "kpi" },
      { at: 294, text: "수업 순찰 · 출결 집계 · 시간표 · 강사·학생 계정 · 수업 리포트", style: "tag" },
    ],
  },
  {
    id: "S6",
    title: "AI",
    eyebrow: "04 / AI",
    from: 315,
    duration: 75,
    visual: "스캔 라인이 교실을 훑음 → 레이더 차트(상호작용·학생 발화·참여도·판서 활용·피드백) → 인사이트 카드 3장",
    motion: "스캔 스윕 + 글로우 · 차트 드로잉 · 점수 링 카운트업 · 카드 스태거 · 글리치",
    sound: "디지털 아르페지오 · 스캐너 스윕 · 글리치 · 엔딩을 향한 라이저",
    cues: [
      { at: 318, text: "AI가 수업을 평가하고,", style: "line" },
      { at: 338, text: "운영까지 관리한다.", style: "slam" },
      { at: 350, text: "AI 강의 평가 92", style: "kpi" },
      { at: 356, text: "강사 코칭 포인트 2건", style: "tag" },
      { at: 364, text: "이탈 위험 학생 3명 → 상담 알림", style: "tag" },
      { at: 372, text: "학부모 리포트 128건 자동 발송", style: "tag" },
    ],
  },
  {
    id: "S7",
    title: "LOCKUP",
    from: 390,
    duration: 60,
    visual: "모든 UI 조각이 중앙으로 빨려 들어감 → 플래시 → ClassIn 로고 + 슬로건 + CTA",
    motion: "방사형 임플로전 + 트레일 · 로고 마스크 리빌 + 라이트 스윕",
    sound: "리버스 석션 → f400 최종 히트 · 쉬머 + 리버브 테일 / (선택 VO) \"회의 말고, 수업. 클래스인.\"",
    cues: [
      { at: 392, text: "회의 말고, 수업.", style: "accent" },
      { at: 405, text: "ClassIn", style: "logo" },
      { at: 416, text: "온라인 교육기관을 위한 교육 전용 플랫폼", style: "line" },
      { at: 424, text: "도입 문의 · [URL]", style: "cta" },
    ],
  },
];
