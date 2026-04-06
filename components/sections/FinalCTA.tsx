"use client"

import { motion } from "framer-motion"
import { DemoModal } from "./DemoModal"

export function FinalCTA() {
    return (
        <section className="py-32 bg-black border-t border-[#1A1A1A] relative overflow-hidden">
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#BFFF00]/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-8 md:px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-6">30일 무료 체험</p>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] mb-8">
                        지금 바로<br />
                        <span className="text-[#BFFF00]">시작하세요.</span>
                    </h2>

                    <p className="text-[#999] text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        카드 등록 없이, 30일 무료 체험.<br />
                        1등 강사들이 ClassIn을 선택하는 이유를 직접 확인하세요.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <DemoModal>
                            <button className="bg-[#BFFF00] text-black font-bold px-10 py-5 text-base hover:bg-white transition-colors w-full sm:w-auto">
                                무료로 시작하기 →
                            </button>
                        </DemoModal>
                        <button className="border border-[#333] text-white font-medium px-10 py-5 text-base hover:border-[#BFFF00] hover:text-[#BFFF00] transition-colors w-full sm:w-auto">
                            서비스 소개서 다운로드
                        </button>
                    </div>

                    <p className="mt-8 text-[#555] text-sm font-mono">
                        카드 등록 불필요 · 전담 매니저 배정 · 무료 상담 포함
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
