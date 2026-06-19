"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "STUDIOKLASS",
  "LIVE.EDU",
  "TUTORIS",
  "ONLINE ACADEMIA",
  "KLASS NOIR",
  "ATELIER LEARN",
  "PREMIUM TUTORING",
  "LIVE COHORT",
  "FLOW CLASS",
  "SAVANT",
  "MENTOR HOUSE",
  "DAILY COACH",
];

export default function TrustLogos() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0B0F14] relative overflow-hidden py-16 border-y border-white/5"
    >
      <div className="absolute inset-0 bg-grain-dark opacity-[0.35] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p className="text-[#8A9199] text-xs font-serif tracking-[0.25em] uppercase">
          OPERATING ONLINE EDUCATION SINCE DAY ONE
        </p>
        <p className="text-[#8A9199] text-sm mt-3">
          전환·재등록·경험 설계를 함께 고민한 팀들
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={i}
              className="font-serif text-[#8A9199]/70 text-xl hover:text-[#F2EFE8] transition-colors duration-300 tracking-[0.15em]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
