"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const from = 0;
    const sign = to < 0 ? -1 : 1;
    const target = Math.abs(to);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(sign * Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display = value > 0 ? `+${value}` : `${value}`;
  return <span ref={ref}>{display}</span>;
}

const stats = [
  { value: 34, suffix: "%p", label: "CONVERSION LIFT", sub: "체험→등록" },
  { value: 72, suffix: "%", label: "3M RETENTION", sub: "3개월 재등록률" },
  { value: -60, suffix: "%", label: "TUTOR VARIANCE", sub: "튜터별 편차" },
  { value: 31, suffix: "%p", label: "REPEAT PURCHASE", sub: "재등록률 변화" },
];

export default function StatsBanner() {
  return (
    <section className="bg-[#0E1A1F] relative overflow-hidden py-24 md:py-32 border-y border-white/5">
      <div className="absolute inset-0 bg-grain-dark opacity-[0.35] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-radial-emerald pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <p className="text-[#E86A4C] text-xs font-serif tracking-[0.25em] uppercase text-center">
          BY THE NUMBERS, Q1 2026
        </p>
        <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#F2EFE8] text-center max-w-3xl mx-auto tracking-[-0.02em] leading-[1.12] mt-5 whitespace-pre-line">
          {"숫자는 조용합니다.\n하지만 누수는 멈추지 않습니다."}
        </h2>
        <p className="text-[#8A9199] text-center max-w-2xl mx-auto mt-5 leading-[1.65]">
          도입 3개월 후, 팀 평균 변화치. 운영 진단 → 구조 조정 → 재등록 사이클을 한 화면에서 돌린 결과입니다.
        </p>

        <div className="grid md:grid-cols-4 gap-0 mt-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-8 text-center ${i > 0 ? "md:border-l border-white/10" : ""}`}
            >
              <div className="flex items-baseline justify-center">
                <span className="font-serif font-semibold text-5xl md:text-6xl text-[#E86A4C] tabular-nums">
                  <CountUp to={s.value} />
                </span>
                <span className="text-[#8A9199] text-base ml-1">{s.suffix}</span>
              </div>
              <div className="uppercase text-[#8A9199] text-xs tracking-[0.18em] font-serif mt-4">
                {s.label}
              </div>
              <div className="text-[#F2EFE8]/80 text-sm mt-2">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-[#8A9199] text-[11px] leading-[1.5] text-center mt-10">
          * 클래스인 도입 학원·팀 평균 기준 (n=128, 도입 3개월 후 자체 집계)
        </p>

        <div className="relative w-full h-[1px] bg-white/10 mt-12 overflow-hidden">
          <div className="absolute h-full w-1/3 bg-[#1A4D3E] animate-shimmer-soft" />
        </div>
      </div>
    </section>
  );
}
