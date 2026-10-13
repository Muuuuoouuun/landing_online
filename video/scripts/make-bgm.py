"""ClassIn 24초 BGM 합성기 — 영상 타이밍에 맞춰 직접 작곡한 오리지널 음원 (외부 샘플 없음).

밝은 마림바 아르페지오 + 플럭 베이스 + 가벼운 킥·클랩·하이햇 + 패드, 90 BPM (1박 = 20프레임).
장면 경계가 전부 박자 위(76 + 20k 프레임)에 있어서, 컷마다 짧은 역방향 스웰이 컷 프레임에 정확히 닿는다.
- 0.0–2.5초 (S1 질문): Am 패드 + 물음표 같은 마림바 세 음 → 라이저
- 2.5초 (f76, S2 마커 와이프): C 장조로 드롭, 메인 그루브 시작
- 5.2초 (f156, S3 '딱 맞는'): 벨 화음 강조
- 7.9–18.5초 (S4–S7): 하이햇까지 들어간 가장 꽉 찬 구간
- 18.5초 (f556, S7 끝–S8): 드럼이 빠지는 브레이크다운 + 라이저
- 21.2초 (f636, S9): 다시 들어왔다가 한 박 쉬고
- 22.5초 (f676, 로고 히트): 마지막 큰 C 화음 + 크래시, 24초까지 잔향

    python3 scripts/make-bgm.py      # → public/music/bed.mp3
"""

import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 48000
FPS = 30
LENGTH = 24.0
BPM = 90
BEAT = 60 / BPM  # 0.667초 = 20프레임
BAR = BEAT * 4
DROP = 76 / FPS  # 첫 다운비트 = S2 마커 와이프 (f76)
FINAL = 676 / FPS  # 로고 히트 = 마지막 마디의 3박 (DROP + 7마디 + 2박)
CUTS = [136, 216, 336, 416, 496, 576, 636]  # 장면 경계 (프레임) — timeline.ts SCENES와 같다

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "music"
rng = np.random.default_rng(11)
N = int(SR * LENGTH)
L = np.zeros(N)
R = np.zeros(N)
FX = np.zeros(N)  # 리버브로 보낼 버스


def midi(n: float) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def place(sig: np.ndarray, start: float, gain: float = 1.0, pan: float = 0.0, send: float = 0.0) -> None:
    i = int(start * SR)
    if i >= N:
        return
    s = sig[: N - i] * gain
    gl = np.cos((pan + 1) * np.pi / 4)
    gr = np.sin((pan + 1) * np.pi / 4)
    L[i : i + len(s)] += s * gl
    R[i : i + len(s)] += s * gr
    FX[i : i + len(s)] += s * send


def env_t(dur: float) -> np.ndarray:
    return np.arange(int(dur * SR)) / SR


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spec *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(spec, len(x))


def highpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spec *= 1 / np.sqrt(1 + (cutoff / np.maximum(f, 1)) ** 4)
    return np.fft.irfft(spec, len(x))


# ── 악기 ──────────────────────────────────────────────────────

def marimba(note: float, dur: float = 0.9) -> np.ndarray:
    f = midi(note)
    t = env_t(dur)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.42)
    y += 0.32 * np.sin(2 * np.pi * 3.93 * f * t) * np.exp(-t / 0.07)
    y += 0.06 * np.sin(2 * np.pi * 9.8 * f * t) * np.exp(-t / 0.02)
    return y * np.clip(t / 0.002, 0, 1)


def bass(note: float, dur: float = 0.5) -> np.ndarray:
    f = midi(note)
    t = env_t(dur)
    y = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.12 * np.sin(2 * np.pi * 3 * f * t)
    y = np.tanh(1.6 * y) * np.exp(-t / 0.28)
    return y * np.clip(t / 0.004, 0, 1) * np.clip((dur - t) / 0.02, 0, 1)


def kick() -> np.ndarray:
    t = env_t(0.45)
    freq = 45 + 85 * np.exp(-t / 0.035)
    y = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t / 0.16)
    y += 0.15 * highpass(rng.standard_normal(len(t)), 3000) * np.exp(-t / 0.004)
    return y


def clap() -> np.ndarray:
    t = env_t(0.35)
    noise = highpass(lowpass(rng.standard_normal(len(t)), 3500), 900)
    env = np.exp(-t / 0.09)
    for d in (0.0, 0.011, 0.022):
        env = env + 0.6 * np.exp(-np.maximum(t - d, 0) / 0.006) * (t >= d)
    return noise * env * 0.5


def hat(open_: bool = False) -> np.ndarray:
    t = env_t(0.25 if open_ else 0.08)
    return highpass(rng.standard_normal(len(t)), 7500) * np.exp(-t / (0.06 if open_ else 0.018))


def pad(notes: list[float], dur: float, detune: float = 0.004) -> tuple[np.ndarray, np.ndarray]:
    t = env_t(dur)
    outs = []
    for side in (-1, 1):
        y = np.zeros(len(t))
        for n in notes:
            f = midi(n) * (1 + side * detune)
            for k in range(1, 7):
                y += np.sin(2 * np.pi * f * k * t + side * k) / k**1.4
        outs.append(y)
    env = np.clip(t / 0.35, 0, 1) * np.clip((dur - t) / 0.45, 0, 1)
    return lowpass(outs[0] * env, 2600), lowpass(outs[1] * env, 2600)


def riser(dur: float) -> np.ndarray:
    t = env_t(dur)
    noise = rng.standard_normal(len(t))
    y = np.zeros(len(t))
    # 구간마다 컷오프를 올려 가며 붙인다 (필터 스윕 근사)
    seg = len(t) // 12
    for i in range(12):
        a, b = i * seg, (i + 1) * seg if i < 11 else len(t)
        y[a:b] = lowpass(noise[a:b], 600 + i * 700)
    return y * (t / dur) ** 2


def crash() -> np.ndarray:
    t = env_t(2.2)
    return highpass(rng.standard_normal(len(t)), 5000) * np.exp(-t / 0.7) * 0.6


# ── 편곡 ──────────────────────────────────────────────────────

C, G, AM, F = 60, 55, 57, 53  # 근음 (C4 기준)
CHORDS = {  # 아르페지오에 쓸 코드 톤 (마림바 음역)
    "C": [72, 76, 79, 84],
    "G": [71, 74, 79, 83],
    "Am": [72, 76, 81, 84],
    "F": [72, 77, 81, 84],
    "Fmaj7": [72, 76, 77, 81],
}
# 0: S2–S3 · 1: S3 선언–S4 · 2–5: S4–S7 · 6: 브레이크다운(S8) · 7: 엔딩
BARS = [("C", C), ("G", G), ("Am", AM), ("F", F), ("C", C), ("G", G), ("Fmaj7", F)]
ARP = [0, 1, 2, 3, 2, 1, 2, 3]  # 8분음표 패턴


def bell(note: float, dur: float = 1.6) -> np.ndarray:
    f = midi(note)
    t = env_t(dur)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.7)
    y += 0.3 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.2)
    y += 0.1 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / 0.06)
    return y * np.clip(t / 0.002, 0, 1)


def reverse_swell(dur: float) -> np.ndarray:
    """컷 프레임에 정확히 끝나는 역방향 스웰 (노이즈가 빨려 들어가는 소리)."""
    t = env_t(dur)
    y = lowpass(rng.standard_normal(len(t)), 2400) * (t / dur) ** 3
    return y * np.clip((dur - t) / 0.01, 0, 1)


# 인트로 — Am 패드 + 물음표 같은 마림바 세 음 (드롭 앞 박자 위에)
pl, pr = pad([57, 60, 64, 71], DROP + 0.3)
place(pl * 0.05, 0.0, pan=-1)
place(pr * 0.05, 0.0, pan=1)
for k, n in enumerate([76, 79, 83]):
    place(marimba(n, 1.3), DROP - (3 - k) * BEAT, gain=0.16, pan=0.2 * (k - 1), send=0.5)
place(riser(1.4), DROP - 1.4, gain=0.05, send=0.3)

for b, (name, root) in enumerate(BARS):
    t0 = DROP + b * BAR
    breakdown = b == 6
    full = 2 <= b <= 5
    tones = CHORDS[name]

    # 패드
    chord = [root - 12, *[n - 12 for n in tones[:3]]]
    pl, pr = pad(chord, BAR + 0.3)
    place(pl * (0.05 if not breakdown else 0.075), t0, pan=-1, send=0.3)
    place(pr * (0.05 if not breakdown else 0.075), t0, pan=1, send=0.3)

    # 마림바 아르페지오 (브레이크다운에선 4분음표로 듬성듬성)
    step = BEAT / 2 if not breakdown else BEAT
    for i in range(8 if not breakdown else 4):
        n = tones[ARP[i] if not breakdown else [0, 2, 1, 3][i]]
        place(marimba(n), t0 + i * step, gain=0.17 if i % 2 == 0 else 0.13, pan=-0.35 if i % 2 else 0.35, send=0.35)
    if full and b % 2 == 1:  # 마디 끝 16분음표 픽업
        place(marimba(tones[3] + 2, 0.5), t0 + BAR - BEAT / 4, gain=0.1, pan=0.4, send=0.4)

    if breakdown:
        place(riser(BAR), t0, gain=0.07, send=0.3)
        place(bass(root - 24, BAR * 0.9), t0, gain=0.22)
        continue

    # 베이스 — 1박 · 2.5박 · 3박 · 4박
    for beat in (0, 1.5, 2, 3):
        place(bass(root - 24 + (12 if beat == 1.5 else 0)), t0 + beat * BEAT, gain=0.24)

    # 드럼
    for beat in (0, 2):
        place(kick(), t0 + beat * BEAT, gain=0.42)
    if b >= 1:
        for beat in (1, 3):
            place(clap(), t0 + beat * BEAT, gain=0.22, send=0.25)
    if full:
        for e in range(8):
            place(hat(open_=e % 2 == 1), t0 + e * BEAT / 2, gain=0.05 if e % 2 else 0.035, pan=0.3)

# S3 '딱 맞는' — 둘째 마디 첫 박에 벨 화음
for k, n in enumerate([84, 88, 91]):
    place(bell(n), DROP + BAR + k * 0.012, gain=0.06, pan=-0.3 + k * 0.3, send=0.6)

# 장면 경계마다 — 컷 프레임에 닿는 역방향 스웰 + 컷 위의 작은 악센트
for c in CUTS:
    at = c / FPS
    place(reverse_swell(0.5), at - 0.5, gain=0.045 if c != 576 else 0.03, pan=0.0, send=0.2)
    if c not in (576, 636):  # 브레이크다운·엔딩은 따로
        place(hat(open_=True), at, gain=0.06, pan=-0.2, send=0.3)
        place(marimba(CHORDS["C"][3] + 12, 0.6), at, gain=0.05, pan=0.5, send=0.6)

# 엔딩 마디 — 첫 박에 다시 들어왔다가, 둘째 박을 쉬고(라이저), 셋째 박에 로고 히트
t7 = DROP + 7 * BAR
place(kick(), t7, gain=0.42)
place(bass(36, BEAT * 0.9), t7, gain=0.24)
for i in range(2):
    place(marimba(CHORDS["C"][i * 2], 0.7), t7 + i * BEAT / 2, gain=0.14, pan=0.3 - 0.6 * i, send=0.4)
place(riser(FINAL - t7 - BEAT * 0.5), t7 + BEAT * 0.5, gain=0.06, send=0.3)

# 로고 히트 — 큰 C 코드 + 킥 + 크래시, 잔향으로 끝까지
place(kick(), FINAL, gain=0.55)
place(crash(), FINAL, gain=0.12, send=0.5)
place(bass(36, 1.3), FINAL, gain=0.3)
for k, n in enumerate([60, 64, 67, 72, 76, 79, 84]):
    place(marimba(n, 1.4), FINAL + k * 0.018, gain=0.13, pan=-0.6 + k * 0.2, send=0.6)
for k, n in enumerate([84, 88, 91, 96]):
    place(bell(n, 1.4), FINAL + 0.02 + k * 0.03, gain=0.04, pan=-0.4 + k * 0.25, send=0.7)
pl, pr = pad([48, 60, 64, 67, 74], LENGTH - FINAL + 0.2)
place(pl * 0.08, FINAL, pan=-1, send=0.4)
place(pr * 0.08, FINAL, pan=1, send=0.4)

# ── 믹스 ──────────────────────────────────────────────────────

ir_t = env_t(1.4)
ir = lowpass(rng.standard_normal(len(ir_t)), 5000) * np.exp(-ir_t / 0.45)
ir /= np.sqrt(np.sum(ir**2))
size = 1 << int(np.ceil(np.log2(N + len(ir))))
wet = np.fft.irfft(np.fft.rfft(FX, size) * np.fft.rfft(ir, size), size)[:N]
L += wet * 0.22
R += np.roll(wet, int(0.011 * SR)) * 0.22

mix = np.stack([L, R])
mix = np.tanh(mix * 1.4) / 1.4  # 부드러운 리미팅
fade = np.clip((LENGTH - np.arange(N) / SR) / 0.9, 0, 1) ** 1.5
mix *= np.clip(np.arange(N) / SR / 0.05, 0, 1) * fade
mix *= 0.89 / np.abs(mix).max()  # 약 -1 dBFS

OUT.mkdir(parents=True, exist_ok=True)
wav = OUT / "bed.wav"
with wave.open(str(wav), "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix.T * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-b:a", "192k", str(OUT / "bed.mp3")], check=True)
wav.unlink()
print(f"bed.mp3  {LENGTH:.1f}s  {BPM} BPM  drop {DROP:.3f}s (f{DROP * FPS:.0f})  final {FINAL:.3f}s (f{FINAL * FPS:.0f})")
