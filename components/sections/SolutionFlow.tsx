"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const phases = [
    {
        label: "01 — 前 / BEFORE",
        caption: "BEFORE",
        title: "기대감을 설계",
        body: "수업이 시작되기 전부터 학생의 경험은 시작됩니다. 입장 안내와 사전 자료로 첫 5분의 몰입을 만듭니다.",
        bullets: [
            "입장 안내 자동화",
            "사전 자료 공유",
            "강사-학생 기대치 정렬",
            "첫 5분 시나리오",
        ],
        img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&q=80",
    },
    {
        label: "02 — 中 / DURING",
        caption: "DURING",
        title: "몰입을 운영",
        body: "라이브 수업은 전달이 아니라 운영입니다. 참여 시그널을 읽고 튜터별 편차를 실시간으로 조율합니다.",
        bullets: [
            "라이브 전달·판서·공유",
            "참여·몰입 실시간 시그널",
            "튜터별 편차 조율",
            "소그룹 브레이크아웃",
        ],
        img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1000&q=80",
    },
    {
        label: "03 — 後 / AFTER",
        caption: "AFTER",
        title: "가치를 연장",
        body: "수업이 끝난 순간이 진짜 시작입니다. 복습 큐와 리포트, 재등록 트리거까지 흐름이 이어집니다.",
        bullets: [
            "자동 녹화·복습 큐",
            "과제·피드백 흐름",
            "학부모 리포트 자동화",
            "재등록 트리거",
        ],
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80",
    },
]

const timeLabels = ["T-5min", "T0", "T+24h"]

export function SolutionFlow() {
    return (
        <section className="relative bg-[#F2EFE8] py-24 md:py-32 overflow-hidden">
            {/* Background overlays */}
            <div className="absolute inset-0 bg-hairline-grid-light opacity-70 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-radial-cream pointer-events-none" />

            <div className="relative container mx-auto px-8 md:px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mb-12"
                >
                    <p className="text-[#1A4D3E] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        THE OPERATING LOOP
                    </p>
                    <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#0B0F14] tracking-[-0.02em] leading-[1.1] whitespace-pre-line mb-8">
                        {"수업 하나가 끝나도,\n경험은 계속 이어져야 합니다."}
                    </h2>
                    <p className="text-[#5A6169] text-base md:text-lg max-w-2xl leading-[1.65]">
                        온라인 교육의 매출 누수는 대부분 '수업 外' 구간에서 발생합니다. ClassIn은 수업 前·中·後를 하나의 운영 흐름으로 설계합니다.
                    </p>
                </motion.div>

                {/* Horizontal progress timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex relative max-w-4xl mx-auto mt-16 mb-12"
                >
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-[#0B0F14]/20" />
                    <div className="relative z-10 flex justify-between w-full">
                        {timeLabels.map((t) => (
                            <div key={t} className="flex flex-col items-center">
                                <span className="text-[#5A6169] text-[10px] font-serif tracking-[0.2em] uppercase mb-3">{t}</span>
                                <span className="w-3 h-3 rounded-full bg-[#E86A4C] ring-4 ring-[#F2EFE8]" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-0 border-t border-[#0B0F14]/10">
                    {phases.map((phase, i) => (
                        <div
                            key={i}
                            className={`py-12 md:py-16 ${i === 0 ? "md:pr-10" : i === 2 ? "md:pl-10" : "md:px-10"} ${i > 0 ? "md:border-l border-[#0B0F14]/10" : ""} border-t md:border-t-0 border-[#0B0F14]/10`}
                        >
                            {/* Photo panel */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0 }}
                                className="relative aspect-[5/3] rounded-md overflow-hidden border border-[#0B0F14]/10 mb-8"
                            >
                                <Image
                                    src={phase.img}
                                    alt=""
                                    width={800}
                                    height={480}
                                    className="saturate-[0.85] hover:saturate-100 transition-all duration-700 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/25 to-transparent" />
                                <div className="absolute bottom-3 left-4 text-[#F2EFE8] text-[10px] font-serif tracking-[0.2em] uppercase">
                                    {phase.caption}
                                </div>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.08 }}
                                className="text-[#E86A4C] font-serif text-sm tracking-widest mb-6"
                            >
                                {phase.label}
                            </motion.p>
                            <motion.h3
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.16 }}
                                className="text-2xl md:text-[1.75rem] font-serif font-semibold text-[#0B0F14] tracking-[-0.02em] leading-[1.2] mb-5"
                            >
                                {phase.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.24 }}
                                className="text-[#5A6169] text-base leading-[1.65] mb-8"
                            >
                                {phase.body}
                            </motion.p>
                            <motion.ul
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.32 }}
                                className="border-t border-[#0B0F14]/10"
                            >
                                {phase.bullets.map((b, j) => (
                                    <li
                                        key={j}
                                        className="py-3 border-b border-[#0B0F14]/10 text-sm text-[#0B0F14]/80 leading-[1.5]"
                                    >
                                        {b}
                                    </li>
                                ))}
                            </motion.ul>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mt-16 pt-8 border-t border-[#0B0F14]/10 flex items-center gap-6"
                >
                    <div className="flex-1 h-px bg-[#0B0F14]/10" />
                    <p className="text-[#5A6169] text-sm italic font-serif">
                        기능이 아니라 구조입니다.
                    </p>
                    <div className="flex-1 h-px bg-[#0B0F14]/10" />
                </motion.div>
            </div>
        </section>
    )
}
