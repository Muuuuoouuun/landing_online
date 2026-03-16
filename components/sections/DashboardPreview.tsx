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
        <section className="py-24 bg-[#0A0A0A] border-b border-[#1A1A1A]">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">MARKET</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        지금이 바로<br />
                        <span className="text-[#BFFF00]">온라인 수업의 시대</span>입니다.
                    </h2>
                    <p className="mt-4 text-[#777] text-lg max-w-xl">
                        시장은 이미 움직이고 있습니다. 준비된 플랫폼으로 선점하세요.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A1A]">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-black p-8 flex flex-col"
                        >
                            <span className="text-4xl md:text-5xl font-black text-[#BFFF00] mb-3 leading-none">
                                {stat.value}
                            </span>
                            <span className="text-white font-semibold text-sm mb-1 leading-snug">
                                {stat.label}
                            </span>
                            <span className="text-[#555] text-xs font-mono">
                                {stat.desc}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 border border-[#1A1A1A] bg-[#050505]"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-2">WHY NOW</p>
                            <p className="text-white text-xl font-bold leading-snug max-w-md">
                                비대면 수업 수요는 늘었지만, 제대로 된 플랫폼은 아직 없습니다.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-sm text-[#777]">
                            <span>✓ 기술 진입 장벽 최소화</span>
                            <span>✓ 학생 집중도 모니터링</span>
                            <span>✓ AI 자동화 행정처리</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
