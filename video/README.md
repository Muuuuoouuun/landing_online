# classin-motion

ClassIn 15초 시네마틱 키네틱 타이포그래피 영상 (Remotion 4).

- 대본: [SCRIPT.md](./SCRIPT.md)
- 대본 → 프레임 데이터: `src/timeline.ts` (대본을 고치면 여기도 같이 고친다)
- 브랜드 컬러: `src/brand.ts` · 폰트: `src/fonts.ts` (Pretendard, JetBrains Mono — 전부 로컬 번들, 렌더 시 네트워크 불필요)
- 아이콘: `src/icons.tsx` (lucide 라인 아이콘 + 획 드로우온) · 장점 표현 요소: `src/elements.tsx`
- 손글씨 강조 + 손그림 마크: `src/hand.tsx` (카피의 `{중괄호}`가 연두 손글씨로 쓰인다)
- '슥슥' 효과음: `public/sfx/*.wav` — 임시 합성본, `python3 scripts/make-sfx.py`로 재생성
- 요소 보드: `npx remotion still ElementBoard out/element-board.png --frame=89`

## 실행

```bash
cd video
npm install
npm run studio            # 브라우저 미리보기 (Remotion Studio)
npm run render:animatic   # 대본 타이밍 애니매틱 → out/animatic.mp4
npm run typecheck
```

첫 렌더 때 Remotion이 Chrome Headless Shell을 내려받는다. 네트워크가 막힌 환경이면 이미 깔린 Chromium을 지정한다:
`npx remotion render Animatic out/animatic.mp4 --browser-executable=<headless_shell 경로>`

## 설치된 라이브러리

| 패키지 | 용도 |
|---|---|
| `remotion`, `@remotion/cli` | 프레임 단위 React 영상 + Studio/렌더 CLI |
| `@remotion/transitions` | 씬 전환 (slide · wipe · flip · clockWipe 등) |
| `@remotion/motion-blur` | 셔터·패닝 모션블러 (`CameraMotionBlur`, `Trail`) |
| `@remotion/paths` | 판서 스트로크·체크·차트 라인 드로잉 (`evolvePath`) |
| `@remotion/shapes` | 링 프로그레스·도형 |
| `@remotion/noise` | 유기적 흔들림·파티클 |
| `@remotion/layout-utils` | 키네틱 타이포 `fitText` / `measureText` |
| `@remotion/animation-utils` | transform·style 보간 |
| `@remotion/effects`, `@remotion/light-leaks` | 라이트 릭 등 이펙트 |
| `@remotion/fonts`, `pretendard`, `@fontsource/jetbrains-mono` | 로컬 폰트 로딩 |
| `lucide` | 라인 아이콘 세트 (ISC) — 획 단위 데이터라 드로우온 애니메이션 가능 |
| `@fontsource/east-sea-dokdo` 외 3종 | 손글씨 강조 폰트 후보 (OFL) — 동해 독도 · 나눔손글씨 펜/붓 · 개구 |
| `@remotion/google-fonts` | 디스플레이 폰트 탐색용 (렌더 시 네트워크 필요) |
| `@remotion/media-utils` | 음원 파형·비트 분석 |

## 라이선스 주의

Remotion은 개인 · 비영리 · **직원 3명 이하** 영리 회사는 무료, 그 이상 규모의 회사가 쓰면 **Remotion 회사 라이선스**가 필요하다. (https://remotion.dev/license)
