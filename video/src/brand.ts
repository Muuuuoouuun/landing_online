// v3 밝은 테마. 강조는 연두 한 가지 — 밝은 연두(lime)는 마크·형광펜, 진한 연두(limeInk)는 손글씨 글자.
export const COLOR = {
  paper: "#F7F7F2", // 배경 (따뜻한 오프화이트)
  surface: "#FFFFFF", // 카드
  ink: "#15181C", // 본문
  sub: "#6B7178", // 보조 텍스트
  line: "#E3E5E1", // 보더
  grid: "#ECEEE7", // 배경 격자
  lime: "#A3E635", // 강조 마크 · 형광펜 · 진행 바
  limeInk: "#5E9E0E", // 손글씨 강조 글자 (배경 대비 3.07:1, 대형 텍스트 기준 충족)
  limeSoft: "#EEF9D9", // 강조 칩 배경
  meeting: "#DADDD8", // S1 회의 화면 타일
  meetingIcon: "#A4A9A3",
} as const;
