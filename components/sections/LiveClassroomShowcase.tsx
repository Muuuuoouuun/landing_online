"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ROWS = [
  ["입장 안내 자동화", "00:00 — 02:00"],
  ["사전 자료 온보딩", "02:00 — 04:00"],
  ["첫 5분 시나리오", "04:00 — 09:00"],
];

export default function LiveClassroomShowcase() {
  return (
    <section className="bg-[#F2EFE8] relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-hairline-grid-light opacity-70 pointer-events-none" />

      <div className="relative grid md:grid-cols-12 gap-10 items-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7"
        >
          <div className="relative rounded-lg border border-[#0B0F14]/10 overflow-hidden aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1400&q=85"
              alt="Live online classroom"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 text-[#F2EFE8] text-xs font-serif tracking-[0.2em]">
              A TUESDAY MORNING — 09:14
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="md:col-span-5"
        >
          {[
            <p
              key="eyebrow"
              className="text-[#1A4D3E] text-xs font-serif tracking-[0.25em] uppercase"
            >
              CLASSROOM, REFRAMED
            </p>,
            <h2
              key="h2"
              className="font-serif font-semibold text-3xl md:text-4xl lg:text-[2.75rem] text-[#0B0F14] tracking-[-0.02em] leading-[1.12] mt-5 whitespace-pre-line"
            >
              {"9시 14분,\n학생이 입장하는 바로 그 순간부터\n수업은 이미 시작됩니다."}
            </h2>,
            <p
              key="p"
              className="text-[#5A6169] text-base md:text-lg leading-[1.7] mt-6"
            >
              ClassIn은 학생이 화면을 켜는 순간부터 강사의 첫 한마디까지를 하나의
              경험으로 설계합니다. 기다림의 공백이, 첫 집중을 만드는 첫 장면이
              됩니다.
            </p>,
            <div key="rows" className="mt-8 border-t border-[#0B0F14]/10">
              {ROWS.map(([left, right]) => (
                <div
                  key={left}
                  className="flex justify-between items-center py-4 border-b border-[#0B0F14]/10"
                >
                  <span className="text-[#0B0F14] text-sm font-serif">
                    {left}
                  </span>
                  <span className="text-[#5A6169] text-sm tabular-nums">
                    {right}
                  </span>
                </div>
              ))}
            </div>,
            <blockquote
              key="quote"
              className="mt-8 italic font-serif text-[#1A4D3E] text-sm border-l-2 border-[#E86A4C] pl-4"
            >
              첫 5분이 재등록률의 38%를 결정합니다.
            </blockquote>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
