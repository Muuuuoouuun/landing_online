"use client"

import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black border-b border-[#1A1A1A]">
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#BFFF00]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Nav */}
            <nav className="relative z-20 flex items-center justify-between px-10 py-5 border-b border-[#1A1A1A]">
                <span className="font-black text-white text-xl tracking-tight font-mono">CLASS IN</span>
                <div className="hidden md:flex items-center gap-8 text-sm text-[#999] font-medium">
                    <a href="#" className="hover:text-white transition-colors">제품 소개</a>
                    <a href="#" className="hover:text-white transition-colors">요금제</a>
                    <a href="#" className="hover:text-white transition-colors">도입 사례</a>
                    <a href="#" className="hover:text-white transition-colors">블로그</a>
                    <a href="#" className="hover:text-white transition-colors">로그인</a>
                </div>
                <button className="bg-[#BFFF00] text-black text-sm font-bold px-5 py-2.5 hover:bg-white transition-colors">
                    무료 시작하기
                </button>
            </nav>

            {/* Hero body */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 border border-[#BFFF00]/40 px-4 py-1.5 text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-10"
                >
                    <span className="w-1.5 h-1.5 bg-[#BFFF00] rounded-full animate-pulse" />
                    AI 기반 온라인 교실 플랫폼
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-black text-white leading-[0.95] tracking-[-2px] mb-8"
                >
                    온라인 수업도<br />
                    <span className="text-[#BFFF00]">학원처럼.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[#999] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
                >
                    학생이 집중하고, 선생님이 통제하는 AI 클래스룸.<br />
                    기술 장벽 없이, 수업 완주율부터 달라집니다.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <button className="bg-[#BFFF00] text-black font-bold px-8 py-4 text-base hover:bg-white transition-colors w-full sm:w-auto">
                        무료로 시작하기 →
                    </button>
                    <button className="border border-[#333] text-white font-medium px-8 py-4 text-base hover:border-[#BFFF00] hover:text-[#BFFF00] transition-colors w-full sm:w-auto">
                        ▶  데모 영상 보기
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex flex-col items-center gap-3"
                >
                    <p className="text-[#555] text-xs font-mono tracking-widest uppercase">이미 신뢰하는 기관들:</p>
                    <p className="text-[#777] text-sm">상하이교통대  ·  복단대  ·  우한대  ·  중산대  ·  +30개 대학</p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-[#1A1A1A]" />
        </section>
    )
}
