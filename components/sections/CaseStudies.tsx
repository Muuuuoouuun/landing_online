"use client"

import { motion } from "framer-motion"

const cases = [
    {
        num: "+34%",
        label: "체험 → 등록 전환",
        desc: "첫 수업 경험 설계와 자동 리마인드로 전환 누수를 막았습니다.",
    },
    {
        num: "72%",
        label: "3개월 재등록률",
        desc: "학습 데이터 기반 학부모 리포트로 지속 등록이 자연스러워졌습니다.",
    },
    {
        num: "−60%",
        label: "튜터 간 수업 편차",
        desc: "공통 수업 템플릿과 운영 체크리스트로 품질 편차를 줄였습니다.",
    },
]

export function CaseStudies() {
    return (
        <section className="py-24 md:py-32 bg-[#F2EFE8] border-t border-[#0B0F14]/10">
            <div className="max-w-5xl mx-auto px-8 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 max-w-2xl"
                >
                    <p className="text-[#1A4D3E] text-xs tracking-[0.2em] uppercase mb-5">CASE STUDIES</p>
                    <h2 className="font-serif font-semibold text-[#0B0F14] text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1]">
                        숫자가 먼저 달라졌습니다.
                    </h2>
                    <p className="mt-5 text-[#5A6169] text-base md:text-lg leading-[1.65]">
                        ClassIn 도입 기관에서 관찰된 전환·재등록·편차 지표의 변화입니다.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-px bg-[#0B0F14]/10 border border-[#0B0F14]/10">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-[#F2EFE8] p-10 flex flex-col"
                        >
                            <span className="font-serif text-[#E86A4C] text-5xl md:text-6xl tracking-[-0.02em] leading-[1] mb-6">
                                {c.num}
                            </span>
                            <p className="font-serif text-[#0B0F14] text-lg mb-3">{c.label}</p>
                            <p className="text-[#5A6169] text-base leading-[1.65]">{c.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
