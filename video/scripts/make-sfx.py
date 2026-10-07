"""'슥슥' 손글씨 효과음 + UI 효과음 임시본 합성기.

마커가 화이트보드/종이를 긁는 마찰음을 노이즈로 흉내 낸다. 최종본은 실제 폴리(마커·연필 녹음)로
교체하되, 파일 이름과 길이를 맞추면 timeline.ts는 그대로 쓸 수 있다.

    python3 scripts/make-sfx.py        # → public/sfx/*.wav
"""

import wave
from pathlib import Path

import numpy as np

SR = 48000
OUT = Path(__file__).resolve().parent.parent / "public" / "sfx"
rng = np.random.default_rng(7)


def band(noise: np.ndarray, center: float, width_oct: float) -> np.ndarray:
    spec = np.fft.rfft(noise)
    freqs = np.fft.rfftfreq(len(noise), 1 / SR)
    octaves = np.log2(np.maximum(freqs, 1) / center)
    spec *= np.exp(-0.5 * (octaves / width_oct) ** 2)
    return np.fft.irfft(spec, len(noise))


def stroke(dur: float, center: float = 3200, body: float = 0.35, grit: float = 0.45) -> np.ndarray:
    """한 획. 속도가 빨라지는 가운데가 가장 크고, 표면 거칠기(grit)로 '사각' 질감을 준다."""
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    hiss = band(rng.standard_normal(n), center, 0.55)
    felt = band(rng.standard_normal(n), 900, 0.6) * body
    rough = band(rng.standard_normal(n), 60, 1.0)
    rough = 1 + grit * rough / (np.abs(rough).max() + 1e-9)
    speed = np.sin(np.pi * t) ** 0.7
    attack = np.clip(t * dur / 0.008, 0, 1)
    release = np.clip((1 - t) * dur / 0.03, 0, 1)
    return (hiss + felt) * rough * speed * attack * release


def seq(*parts: tuple[float, float, float]) -> np.ndarray:
    """(시작초, 길이초, 중심주파수) 획들을 한 트랙에 배치."""
    end = max(s + d for s, d, _ in parts) + 0.05
    out = np.zeros(int(end * SR))
    for start, dur, center in parts:
        s = stroke(dur, center)
        i = int(start * SR)
        out[i : i + len(s)] += s * rng.uniform(0.8, 1.0)
    return out


def tone(dur: float, f0: float, f1: float, decay: float) -> np.ndarray:
    """피치가 f0→f1로 미끄러지는 사인 + 지수 감쇠 (팝·히트용)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    freq = f0 * (f1 / f0) ** (t / dur)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    return np.sin(phase) * np.exp(-t / decay)


def click() -> np.ndarray:
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    return band(rng.standard_normal(n), 4500, 0.4) * np.exp(-t / 0.006) + 0.4 * tone(0.06, 1800, 1200, 0.01)


def whoosh(dur: float = 0.5) -> np.ndarray:
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    lo = band(rng.standard_normal(n), 700, 0.9)
    hi = band(rng.standard_normal(n), 2600, 0.7)
    mix = lo * (1 - t) + hi * t
    return mix * np.sin(np.pi * t) ** 1.6


def hit() -> np.ndarray:
    body = tone(0.9, 110, 48, 0.28)
    snap = band(rng.standard_normal(int(0.9 * SR)), 3000, 0.8) * np.exp(-np.arange(int(0.9 * SR)) / SR / 0.03)
    shimmer = tone(0.9, 1568, 1568, 0.35) * 0.12 + tone(0.9, 2349, 2349, 0.3) * 0.08
    return body + 0.35 * snap + shimmer


SOUNDS = {
    # 손글씨로 단어 쓰기 — 짧은 단어(1–3자) / 긴 단어(4자 이상)
    "write-short": seq((0, 0.09, 3400), (0.12, 0.07, 3900), (0.21, 0.11, 3000)),
    "write-long": seq((0, 0.08, 3500), (0.10, 0.06, 4100), (0.18, 0.10, 3100), (0.31, 0.07, 3800), (0.41, 0.12, 2900)),
    # 강조 마크
    "underline": seq((0, 0.22, 2600)),
    "circle": seq((0, 0.38, 2800)),
    "check": seq((0, 0.07, 3600), (0.09, 0.16, 3000)),
    "highlight": seq((0, 0.30, 1800)),
    "strike": seq((0, 0.06, 3800), (0.07, 0.06, 3300), (0.14, 0.06, 3900), (0.21, 0.07, 3200), (0.29, 0.08, 3600)),
    # UI · 전환 — 손글씨 소리보다 한 단계 작게 믹스한다
    "click": click(),
    "pop": tone(0.18, 520, 980, 0.05),
    "tick": tone(0.05, 2600, 2400, 0.008),
    "whoosh": whoosh(),
    "hit": hit(),
}


def write_wav(path: Path, x: np.ndarray) -> None:
    x = x / (np.abs(x).max() + 1e-9) * 0.7  # 약 -3 dBFS
    pcm = (x * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, x in SOUNDS.items():
        write_wav(OUT / f"{name}.wav", x)
        print(f"{name}.wav  {len(x) / SR:.2f}s")
