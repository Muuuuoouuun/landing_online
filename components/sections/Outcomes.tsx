"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const comparisons = [
    {
        role: "관리자 (Admins)",
        before: "강사 품질과 학생 이탈 위험에 대한 데이터 부재.",
        after: "자동화된 주간 리포트와 알림으로 모든 지표를 한눈에 파악.",
    },
    {
        role: "강사 (Teachers)",
        before: "채점, 수업 준비, 학부모 상담 문자에 파묻힘.",
        after: "채점과 행정은 AI에 맡기고, 오직 수업과 학생 케어에 100% 집중.",
    },
    {
        role: "학생 (Students)",
        before: "과제 피드백이 늦어져 학습 의욕 저하.",
        after: "즉각적인 피드백 루프로 몰입도 높은 인터랙티브 수업.",
    },
    {
        role: "학부모 (Parents)",
        before: "성적표가 나올 때까지 아이의 상태를 알 수 없음.",
        after: "실시간 업데이트로 아이의 성장 과정을 투명하게 확인.",
    },
]

export function Outcomes() {
    return (
        <section id="outcomes" className="relative py-24 md:py-32 bg-[#0B0F14] text-[#F2EFE8] overflow-hidden">
            {/* Subtle radial accent */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[#1A4D3E]/[0.05] rounded-full blur-[140px]" />

            <div className="container mx-auto px-8 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                    <div className="w-full md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mb-6"
                        >
                            라이브 수업 툴이 아니라,<br />
                            <span className="text-[#E86A4C]">전환·재등록의 구조입니다.</span>
                        </motion.h2>
                        <p className="text-[#8A9199] text-base md:text-lg leading-[1.65] mb-8">
                            수업 前·中·後를 하나의 경험으로 잇자, 매출 누수 지점이 선명해졌습니다.
                        </p>
                        <div className="p-6 bg-[#1A4D3E]/10 rounded-lg border border-[#1A4D3E]/30 inline-block">
                            <div className="text-xs text-[#8A9199] uppercase tracking-[0.2em] mb-2">평균 재등록률 변화</div>
                            <div className="font-serif font-semibold text-5xl text-[#E86A4C] tracking-[-0.02em]">+31%p</div>
                            <div className="text-xs text-[#8A9199] mt-2">도입 3개월 후 / 팀 평균</div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col gap-6">
                        {/* Desktop Table Header */}
                        <div className="hidden md:grid md:grid-cols-2 px-8">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-full border border-white/10">
                                    <X className="w-4 h-4 text-[#8A9199]" strokeWidth={1.25} />
                                </div>
                                <span className="font-serif font-semibold text-lg text-[#8A9199] tracking-[-0.01em]">Before</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-full border border-[#1A4D3E]/40">
                                    <Check className="w-4 h-4 text-[#F2EFE8]" strokeWidth={1.25} />
                                </div>
                                <span className="font-serif font-semibold text-lg text-[#F2EFE8] tracking-[-0.01em]">After</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            {comparisons.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="grid md:grid-cols-2 rounded-lg overflow-hidden border border-white/10"
                                >
                                    {/* Before Card */}
                                    <div className="p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
                                        <div className="md:hidden flex items-center gap-2 mb-4">
                                            <X className="w-4 h-4 text-[#8A9199]" strokeWidth={1.25} />
                                            <span className="font-serif font-semibold text-base text-[#8A9199]">Before</span>
                                        </div>
                                        <span className="text-[#8A9199] text-[11px] mb-3 uppercase tracking-[0.2em]">{item.role}</span>
                                        <p className="text-[#8A9199] text-base md:text-lg leading-[1.65]">{item.before}</p>
                                    </div>

                                    {/* After Card */}
                                    <div className="p-6 md:p-8 flex flex-col justify-center relative overflow-hidden bg-[#1A4D3E]/15 border border-[#1A4D3E]/40 md:border-0">
                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1A4D3E]" />
                                        <div className="md:hidden flex items-center gap-2 mb-4">
                                            <Check className="w-4 h-4 text-[#F2EFE8]" strokeWidth={1.25} />
                                            <span className="font-serif font-semibold text-base text-[#F2EFE8]">After</span>
                                        </div>
                                        <span className="text-[#F2EFE8]/70 text-[11px] mb-3 uppercase tracking-[0.2em]">{item.role}</span>
                                        <p className="text-[#F2EFE8] text-base md:text-lg leading-[1.65]">{item.after}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom edge hairline */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/5" />
        </section>
    )
}
