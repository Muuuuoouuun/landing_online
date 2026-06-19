"use client"

import { motion } from "framer-motion"

const stats = [
    {
        value: "26조원",
        label: "글로벌 에듀테크 시장 규모",
        desc: "2025년 기준",
    },
    {
        value: "18%+",
        label: "연평균 성장률 (CAGR)",
        desc: "온라인 교육 플랫폼",
    },
    {
        value: "55.3만원",
        label: "월 평균 과외비",
        desc: "한국 대학생 기준",
    },
    {
        value: "60%+",
        label: "비대면 수업 선호도",
        desc: "코로나 이후 유지",
    },
]

export function DashboardPreview() {
    return (
        <section className="py-24 md:py-32 bg-[#F2EFE8] border-b border-[#0B0F14]/10">
            <div className="max-w-6xl mx-auto px-8 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-3xl"
                >
                    <p className="text-[#1A4D3E] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        MARKET
                    </p>
                    <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#0B0F14] tracking-[-0.02em] leading-[1.1]">
                        지금이 바로<br />
                        <span className="text-[#1A4D3E]">온라인 수업의 시대</span>입니다.
                    </h2>
                    <p className="mt-6 text-[#5A6169] text-base md:text-lg leading-[1.65] max-w-xl">
                        시장은 이미 움직이고 있습니다. 준비된 플랫폼으로 선점하세요.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#0B0F14]/10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 flex flex-col border-b border-[#0B0F14]/10 ${i > 0 ? "md:border-l border-[#0B0F14]/10" : ""} ${i < 2 ? "border-r border-[#0B0F14]/10 md:border-r-0" : ""}`}
                        >
                            <span className="font-serif font-semibold text-4xl md:text-5xl text-[#E86A4C] mb-4 leading-none tracking-[-0.02em]">
                                {stat.value}
                            </span>
                            <span className="text-[#0B0F14] font-serif font-semibold text-sm mb-1 leading-[1.4]">
                                {stat.label}
                            </span>
                            <span className="text-[#5A6169] text-xs font-serif tracking-wide">
                                {stat.desc}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 border border-[#0B0F14]/10 bg-[#0B0F14]/[0.04] rounded-xl"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="text-[#1A4D3E] text-xs font-serif tracking-[0.2em] uppercase mb-3">
                                WHY NOW
                            </p>
                            <p className="text-[#0B0F14] font-serif font-semibold text-xl md:text-2xl tracking-[-0.02em] leading-[1.3] max-w-md">
                                비대면 수업 수요는 늘었지만, 제대로 된 플랫폼은 아직 없습니다.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-[#5A6169] leading-[1.65]">
                            <span>· 기술 진입 장벽 최소화</span>
                            <span>· 학생 집중도 모니터링</span>
                            <span>· AI 자동화 행정처리</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
