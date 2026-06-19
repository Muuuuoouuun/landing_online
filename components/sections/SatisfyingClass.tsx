"use client"

import { motion } from "framer-motion"

export function SatisfyingClass() {
    return (
        <section className="py-24 md:py-32 bg-[#0B0F14] overflow-hidden">
            <div className="container mx-auto px-8 md:px-6 max-w-7xl relative">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                    {/* Left text area */}
                    <div className="w-full lg:w-2/5 z-10">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-[#E86A4C] text-xs font-serif tracking-[0.2em] uppercase mb-6"
                        >
                            THE CRAFT
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-serif font-semibold text-4xl md:text-5xl tracking-[-0.02em] text-[#F2EFE8] mb-8 leading-[1.1]"
                        >
                            더 수월하게, <br />
                            더 만족감 있는 수업
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base md:text-lg text-[#8A9199] leading-[1.65] mb-8"
                        >
                            Classin은 강사들의 에너지를 서류나 채점에 낭비하지 않도록 돕습니다. 자동화된 AI 보조 교사가 학생별 수준을 분석하고, 수업에 필요한 모든 인터랙티브 자료를 한 번의 클릭으로 세팅합니다.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="pt-6 border-t border-white/10 flex flex-col gap-2"
                        >
                            <span className="font-serif font-semibold text-[#F2EFE8]">핵심 목표</span>
                            <span className="text-[#8A9199] text-base leading-[1.65]">강사의 행정 시간 70% 단축, 온전한 티칭 몰입.</span>
                        </motion.div>
                    </div>

                    {/* Right illustrative area (editorial cards) */}
                    <div className="w-full lg:w-3/5 relative mt-10 lg:mt-0 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/[0.03] border border-white/10 rounded-xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-serif font-semibold text-[#F2EFE8] text-lg">AI 채점 요약</span>
                                <span className="text-[#E86A4C] text-xs font-serif tracking-widest uppercase">진행완료</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-[2px] bg-white/10 w-full overflow-hidden">
                                    <div className="h-full bg-[#1A4D3E] w-[85%]" />
                                </div>
                                <div className="h-[2px] bg-white/10 w-full overflow-hidden">
                                    <div className="h-full bg-[#1A4D3E] w-[60%]" />
                                </div>
                                <div className="h-[2px] bg-white/10 w-full overflow-hidden">
                                    <div className="h-full bg-[#1A4D3E] w-[40%]" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-xl p-8"
                        >
                            <div className="font-serif font-semibold text-[#F2EFE8] text-lg mb-6">학습 성취도 분석</div>
                            <div className="flex items-end gap-3 h-24">
                                <div className="w-1/4 bg-[#1A4D3E] h-[40%]" />
                                <div className="w-1/4 bg-[#1A4D3E] h-[60%]" />
                                <div className="w-1/4 bg-[#1A4D3E] h-[30%]" />
                                <div className="w-1/4 bg-[#E86A4C] h-[90%]" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/[0.03] border border-white/10 rounded-xl p-8"
                        >
                            <span className="text-[#E86A4C] block text-xs font-serif tracking-[0.2em] uppercase mb-3">
                                Interactive Canvas
                            </span>
                            <h3 className="font-serif font-semibold text-2xl md:text-3xl tracking-[-0.02em] text-[#F2EFE8] leading-[1.2]">
                                One-Click <br />화이트보드 실행
                            </h3>
                            <div className="mt-8 flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                                    <div className="w-5 h-5 border border-[#1A4D3E] rounded-full" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-[#1A4D3E]" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                                    <div className="w-5 h-[2px] bg-[#E86A4C]" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
