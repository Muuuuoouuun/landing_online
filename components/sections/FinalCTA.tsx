"use client"

import { motion } from "framer-motion"
import { DemoModal } from "./DemoModal"

export function FinalCTA() {
    return (
        <section className="py-32 md:py-40 bg-[#0B0F14] border-t border-white/10 relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(26,77,62,0.08) 0%, rgba(26,77,62,0) 60%)",
                }}
            />

            <div className="max-w-4xl mx-auto px-8 md:px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[#E86A4C] text-xs tracking-[0.2em] uppercase mb-6">온라인 수업 운영 진단 · 무료</p>

                    <h2 className="font-serif font-semibold text-[#F2EFE8] text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-8">
                        매출이 새는 지점은<br />
                        <span className="text-[#E86A4C]">이미 정해져 있습니다.</span>
                    </h2>

                    <p className="text-[#8A9199] text-base md:text-lg max-w-2xl mx-auto mb-12 leading-[1.65]">
                        체험→등록, 수업 경험, 재등록 — 5축 운영 진단으로<br />
                        지금 당신의 팀이 어디서 전환을 잃고 있는지 보여드립니다.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <DemoModal>
                            <button className="bg-[#1A4D3E] text-[#F2EFE8] px-10 py-5 text-base rounded-lg hover:bg-[#1A4D3E]/90 transition-colors w-full sm:w-auto">
                                온라인 수업 운영 진단 받기 →
                            </button>
                        </DemoModal>
                        <button className="border border-white/10 text-[#F2EFE8] px-10 py-5 text-base rounded-lg hover:border-[#1A4D3E] transition-colors w-full sm:w-auto">
                            진단 리포트 샘플 보기
                        </button>
                    </div>

                    <p className="mt-10 text-[#8A9199] text-sm">
                        30분 내외 · 현재 병목 리포트 제공 · 영업 전화 없음
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
