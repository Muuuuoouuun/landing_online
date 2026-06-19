"use client"

import { Clock, Users } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function ScienceBased() {
    return (
        <section className="py-24 md:py-32 bg-[#F2EFE8] overflow-hidden relative">
            <div className="container mx-auto px-8 md:px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-24"
                >
                    <p className="text-[#1A4D3E] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        THE SCIENCE
                    </p>
                    <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#0B0F14] tracking-[-0.02em] leading-[1.1] mb-6">
                        우리의 솔루션은 <br className="md:hidden" />
                        과학적 이론에 기반합니다
                    </h2>
                    <p className="text-base md:text-lg text-[#5A6169] leading-[1.65]">
                        단순히 편리한 도구가 아닙니다. 학습 효율을 극대화하는 검증된 교육 공학입니다.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {/* Ebbinghaus Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative w-full h-[32rem] md:h-[40rem] mx-auto overflow-hidden flex items-end justify-center border-t border-[#0B0F14]/10">
                                <Image
                                    src="/images/ebbinghaus.png"
                                    alt="Hermann Ebbinghaus"
                                    fill
                                    className="object-contain object-bottom"
                                />
                                <div className="absolute bottom-6 left-6 z-10">
                                    <div className="font-serif font-semibold text-2xl md:text-3xl text-[#0B0F14] tracking-[-0.02em]">
                                        Hermann Ebbinghaus
                                    </div>
                                    <div className="text-xs font-serif text-[#1A4D3E] tracking-[0.2em] mt-1 uppercase">
                                        Memory & Psychology
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="w-full lg:w-1/2 space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 flex items-center justify-center text-[#1A4D3E]">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif font-semibold text-2xl md:text-3xl text-[#0B0F14] tracking-[-0.02em]">
                                    에빙하우스의 망각 곡선
                                </h3>
                            </div>

                            <blockquote className="border-l border-[#1A4D3E] pl-6 py-2 text-lg text-[#0B0F14] italic font-serif leading-[1.65]">
                                "학습 후 20분이 지나면 기억의 42%가 사라지고, 하루가 지나면 67%를 잊어버린다."
                            </blockquote>

                            <div className="space-y-4">
                                <h4 className="font-serif font-semibold text-lg text-[#0B0F14]">
                                    Classin의 솔루션: <span className="text-[#1A4D3E]">골든타임 복습</span>
                                </h4>
                                <p className="text-[#5A6169] leading-[1.65] text-base md:text-lg">
                                    우리는 학습 직후 가장 중요한 '골든타임'을 놓치지 않습니다. 수업 종료 즉시 AI가 생성한 핵심 요약 퀴즈가 학생의 스마트폰으로 전송됩니다. 망각이 시작되기 전에 기억을 장기 저장소로 옮기는 연결 고리를 만듭니다.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <span className="px-4 py-1.5 bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 text-[#5A6169] text-xs font-serif tracking-widest rounded-lg">
                                    #즉시복습
                                </span>
                                <span className="px-4 py-1.5 bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 text-[#5A6169] text-xs font-serif tracking-widest rounded-lg">
                                    #장기기억
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scott Freeman Section */}
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative w-full h-[32rem] md:h-[40rem] mx-auto overflow-hidden flex items-end justify-center border-t border-[#0B0F14]/10">
                                <Image
                                    src="/images/scott-freeman.png"
                                    alt="Scott Freeman"
                                    fill
                                    className="object-contain object-bottom"
                                />
                                <div className="absolute bottom-6 right-6 z-10 text-right">
                                    <div className="font-serif font-semibold text-2xl md:text-3xl text-[#0B0F14] tracking-[-0.02em]">
                                        Scott Freeman
                                    </div>
                                    <div className="text-xs font-serif text-[#1A4D3E] tracking-[0.2em] mt-1 uppercase">
                                        Biology Education
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="w-full lg:w-1/2 space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 flex items-center justify-center text-[#1A4D3E]">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif font-semibold text-2xl md:text-3xl text-[#0B0F14] tracking-[-0.02em]">
                                    고구조화된 능동적 학습
                                </h3>
                            </div>

                            <blockquote className="border-l border-[#1A4D3E] pl-6 py-2 text-lg text-[#0B0F14] italic font-serif leading-[1.65]">
                                "전통적인 강의식 수업보다 능동적 학습(Active Learning)에 참여한 학생들의 성취도가 1.5배 더 높으며, 낙제율은 55% 감소한다."
                            </blockquote>

                            <div className="space-y-4">
                                <h4 className="font-serif font-semibold text-lg text-[#0B0F14]">
                                    Classin의 솔루션: <span className="text-[#1A4D3E]">참여형 인터랙티브 클래스</span>
                                </h4>
                                <p className="text-[#5A6169] leading-[1.65] text-base md:text-lg">
                                    듣기만 하는 수업은 끝났습니다. Classin의 '랜덤 발표', '실시간 투표', '화이트보드 공유' 기능은 모든 학생이 매 순간 수업에 참여하게 만듭니다. 고구조화된 수업 설계로 누구도 소외되지 않는 교실을 만듭니다.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <span className="px-4 py-1.5 bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 text-[#5A6169] text-xs font-serif tracking-widest rounded-lg">
                                    #ActiveLearning
                                </span>
                                <span className="px-4 py-1.5 bg-[#0B0F14]/[0.04] border border-[#0B0F14]/10 text-[#5A6169] text-xs font-serif tracking-widest rounded-lg">
                                    #참여수업
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
