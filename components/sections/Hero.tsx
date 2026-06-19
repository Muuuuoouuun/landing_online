"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0F14] border-b border-white/10">
            {/* Full-bleed background photo */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=2000&q=85"
                    alt=""
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    className="opacity-[0.12]"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/80 via-[#0B0F14]/92 to-[#0B0F14] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-grain-dark opacity-[0.3] pointer-events-none mix-blend-overlay z-0" />

            {/* Emerald radial top-right */}
            <div className="absolute top-0 right-0 w-[900px] h-[700px] bg-radial-emerald pointer-events-none z-0" />

            {/* Nav */}
            <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/[0.06]">
                <span className="font-serif font-semibold text-[#F2EFE8] text-xl tracking-tight">CLASS IN</span>
                <div className="hidden md:flex items-center gap-8 text-sm text-[#8A9199]">
                    <a href="#" className="hover:text-[#F2EFE8] transition-colors">제품 소개</a>
                    <a href="#" className="hover:text-[#F2EFE8] transition-colors">요금제</a>
                    <a href="#" className="hover:text-[#F2EFE8] transition-colors">도입 사례</a>
                    <a href="#" className="hover:text-[#F2EFE8] transition-colors">블로그</a>
                    <a href="#" className="hover:text-[#F2EFE8] transition-colors">로그인</a>
                </div>
                <button className="bg-[#1A4D3E] text-[#F2EFE8] text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#225E4C] transition-colors">
                    무료 시작하기
                </button>
            </nav>

            {/* Hero body — editorial split */}
            <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-6 md:px-10 lg:px-16 py-20 lg:py-28 items-center">
                {/* LEFT */}
                <div className="lg:col-span-7 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 text-[#8A9199] text-[11px] tracking-[0.2em] uppercase mb-8"
                    >
                        <span className="w-1.5 h-1.5 bg-[#E86A4C] rounded-full" />
                        ONLINE CLASS OPERATING SYSTEM
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="font-serif font-semibold text-[#F2EFE8] text-5xl md:text-6xl lg:text-[4.5rem] tracking-[-0.02em] leading-[1.05] mb-8"
                    >
                        체험수업의 첫 5분이<br />
                        <span className="inline-block border-b-[3px] border-[#E86A4C]/40 text-[#E86A4C]">재등록률을 결정합니다.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.16 }}
                        className="text-[#8A9199] text-base md:text-lg leading-[1.65] max-w-xl mb-10"
                    >
                        온라인 수업은 열려 있지만, 전환·재등록·신뢰는 조용히 새고 있습니다. 수업 <span className="text-[#F2EFE8]">前·中·後</span>를 하나의 경험으로 연결해, 매출 누수를 막는 운영 시스템.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.24 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <button className="bg-[#1A4D3E] text-[#F2EFE8] font-medium px-7 py-3.5 text-base rounded-md hover:bg-[#225E4C] transition-colors w-full sm:w-auto">
                            온라인 수업 운영 진단 받기 →
                        </button>
                        <button className="border border-white/20 text-[#F2EFE8] font-medium px-7 py-3.5 text-base rounded-md hover:border-[#F2EFE8]/60 transition-colors w-full sm:w-auto">
                            수업 前·中·後 둘러보기
                        </button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-14 pt-8 border-t border-white/10"
                    >
                        <p className="text-[#8A9199] text-[11px] tracking-[0.2em] uppercase mb-3">전환·재등록·경험 설계를 맡긴 팀</p>
                        <p className="text-[#F2EFE8] text-sm leading-[1.6]">라이브 그룹·1:1 온라인 클래스를 운영하는 팀을 위해</p>
                        <p className="text-[#8A9199] text-xs mt-1.5">튜터링 · 그룹클래스 · 코칭 · 입시 클래스</p>
                    </motion.div>

                    {/* Stat chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="flex flex-wrap gap-8 pt-6 border-t border-white/10 mt-10"
                    >
                        <div className="flex items-baseline">
                            <span className="text-[#E86A4C] font-serif font-semibold text-lg">+34%</span>
                            <span className="text-[#8A9199] text-xs ml-2">체험→등록</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-[#E86A4C] font-serif font-semibold text-lg">72%</span>
                            <span className="text-[#8A9199] text-xs ml-2">3개월 재등록</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-[#E86A4C] font-serif font-semibold text-lg">-60%</span>
                            <span className="text-[#8A9199] text-xs ml-2">튜터 편차</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="text-[#8A9199] text-[11px] leading-[1.5] mt-4"
                    >
                        * 클래스인 도입 학원·팀 평균 기준 (n=128, 도입 3개월 후)
                    </motion.p>
                </div>

                {/* RIGHT — 前·中·後 editorial cards as a timeline */}
                <div className="lg:col-span-5 relative pl-12">
                    {/* Decorative dashed timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 border-l border-dashed border-white/10" />

                    {/* THE LOOP caption */}
                    <div className="text-[#8A9199] text-[10px] font-serif tracking-[0.25em] uppercase mb-6 pl-2">
                        THE LOOP
                    </div>

                    <div className="relative flex flex-col gap-4">
                        {[
                            { n: "01", ko: "수업 前", en: "BEFORE", body: "입장 안내 · 자료 사전 공유 · 기대감 형성", img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&q=80", anim: "animate-float-y" },
                            { n: "02", ko: "수업 中", en: "DURING", body: "라이브 전달 · 판서·참여 · 몰입 유지", img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&q=80", anim: "" },
                            { n: "03", ko: "수업 後", en: "AFTER", body: "녹화·복습 · 피드백 · 재등록 연결", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80", anim: "animate-float-y-delay" },
                        ].map((c, i) => (
                            <motion.div
                                key={c.n}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                className={`relative bg-white/[0.03] border border-white/10 rounded-lg p-5 flex gap-4 ${c.anim}`}
                            >
                                {/* Dot marker on the timeline */}
                                <div className="absolute -left-[26px] top-8 w-2 h-2 rounded-full bg-[#E86A4C]" />

                                {/* Photo thumbnail */}
                                <div className="w-14 h-14 rounded-md overflow-hidden border border-white/10 flex-shrink-0 relative">
                                    <Image
                                        src={c.img}
                                        alt=""
                                        fill
                                        sizes="56px"
                                        style={{ objectFit: "cover" }}
                                        className="saturate-0 hover:saturate-100 transition-all duration-700"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="text-[11px] text-[#8A9199] tracking-[0.2em] uppercase mb-1">{c.en}</div>
                                            <div className="font-serif font-semibold text-[#F2EFE8] text-lg">{c.ko}</div>
                                        </div>
                                        <div className="font-serif text-[#E86A4C] text-sm">{c.n}</div>
                                    </div>
                                    <p className="text-[#8A9199] text-sm leading-[1.6]">{c.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="relative z-10 flex flex-col items-center pb-10">
                <div className="text-[#8A9199] text-xs font-serif tracking-[0.2em]">↓  SCROLL</div>
                <div className="w-px h-12 bg-white/20 mt-3 mx-auto relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E86A4C] animate-pulse" />
                </div>
            </div>
        </section>
    )
}
