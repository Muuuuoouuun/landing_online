"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STAKEHOLDERS = [
  {
    label: "01 OWNER",
    role: "대표",
    pain: "매출 누수 지점이 안 보입니다.",
    gain: "5축 운영 진단으로 누수 지점 가시화.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    label: "02 OPS",
    role: "운영팀",
    pain: "튜터별 편차가 쌓여요.",
    gain: "강사 간 편차가 숫자로 보여 조정 가능.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    label: "03 INSTRUCTOR",
    role: "강사",
    pain: "수업마다 준비가 반복됩니다.",
    gain: "前·中·後 준비가 템플릿으로 자동화.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    label: "04 STUDENT",
    role: "학생",
    pain: "수업이 끝나면 복습이 흩어져요.",
    gain: "복습·과제·피드백이 한 흐름에.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    label: "05 PARENT",
    role: "학부모",
    pain: "아이가 뭘 하는지 알기 어려워요.",
    gain: "수업 리포트가 주간으로 도착.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
];

export default function StakeholderValue() {
  return (
    <section className="bg-[#0B0F14] relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-dot-grid-dark opacity-60 pointer-events-none" />
      <div className="absolute bg-radial-emerald opacity-80 top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-[#E86A4C] text-xs font-serif tracking-[0.25em] uppercase">
          FIVE PEOPLE, ONE SYSTEM
        </p>
        <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#F2EFE8] tracking-[-0.02em] leading-[1.1] max-w-3xl mt-5 whitespace-pre-line">
          {"모두가 같은 시스템 위에서,\n각자 원하는 것을 얻습니다."}
        </h2>
        <p className="text-[#8A9199] text-base md:text-lg max-w-2xl leading-[1.65] mt-6">
          한 화면이 달라지면, 다섯 사람의 하루가 달라집니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 mt-16">
          {STAKEHOLDERS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`p-8 ${i !== 0 ? "md:border-l border-white/10" : ""}`}
            >
              <p className="text-[#E86A4C] font-serif text-xs tracking-[0.2em] uppercase">
                {s.label}
              </p>
              <div className="mt-5">
                <Image
                  src={s.photo}
                  alt={s.role}
                  width={64}
                  height={64}
                  className="rounded-full saturate-0 hover:saturate-100 transition duration-500 border border-white/10 object-cover w-16 h-16"
                />
              </div>
              <h3 className="text-[#F2EFE8] font-serif text-xl font-semibold mt-5">
                {s.role}
              </h3>
              <p className="text-[#8A9199] text-sm italic leading-[1.5] mt-3">
                {s.pain}
              </p>
              <div className="my-4 border-t border-white/10" />
              <p className="text-[#F2EFE8] text-sm leading-[1.55]">{s.gain}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
