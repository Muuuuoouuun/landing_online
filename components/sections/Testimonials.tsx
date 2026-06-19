"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    quote:
      "체험수업에서 등록으로 이어지는 퍼센트가 눈에 보이기 시작했습니다. 처음 본 숫자였어요.",
    name: "김민선",
    role: "온라인 튜터링 스튜디오 · 대표",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    quote:
      "튜터별 편차를 '느낌'이 아니라 '지표'로 다루게 된 게 가장 큰 변화입니다.",
    name: "정우진",
    role: "프리미엄 입시 클래스 · 운영",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    quote:
      "수업 끝나고 한 주 동안의 흐름이 이어지니, 재등록 설득이 훨씬 조용해졌어요.",
    name: "이하영",
    role: "라이브 코칭 프로그램 · 대표",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0E1A1F] relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-grain-dark opacity-25 pointer-events-none" />

      <div className="relative">
        <p className="text-[#E86A4C] text-xs font-serif tracking-[0.25em] uppercase text-center">
          VOICES FROM THE LOOP
        </p>
        <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#F2EFE8] text-center tracking-[-0.02em] leading-[1.12] mt-5 whitespace-pre-line">
          {"툴이 아니라,\n운영 방식을 바꾼 팀들."}
        </h2>
        <p className="text-[#8A9199] text-center max-w-2xl mx-auto mt-5">
          대표·운영팀·튜터의 관점이 달라지면, 매출도 움직입니다.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20 px-6">
          {items.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-8 relative"
            >
              <span className="text-[#E86A4C]/30 text-5xl absolute top-4 left-5 font-serif leading-none">
                “
              </span>
              <p className="text-[#F2EFE8] text-base md:text-[17px] leading-[1.7] font-serif italic mt-6">
                {it.quote}
              </p>
              <hr className="border-white/10 mt-6" />
              <div className="flex items-center mt-6">
                <Image
                  src={it.img}
                  alt={it.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-white/10 mr-4 object-cover"
                />
                <div>
                  <div className="font-serif text-[#F2EFE8] text-sm">{it.name}</div>
                  <div className="text-[#8A9199] text-xs">{it.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
