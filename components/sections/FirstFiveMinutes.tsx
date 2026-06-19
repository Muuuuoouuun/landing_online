"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
    {
        time: "0:00",
        label: "입장 안내",
        en: "ARRIVAL",
        body: "학생이 화면을 켜는 순간, 빈 대기 화면이 아니라 이름을 부르는 안내가 맞이합니다. 첫인상은 여기서 결정됩니다.",
        signal: "정시 입장률 ↑",
    },
    {
        time: "1:00",
        label: "자료·기대감",
        en: "CONTEXT",
        body: "오늘 무엇을 얻어 갈지 한 장면으로 보여줍니다. 사전 자료가 열리고, '잘 왔다'는 기대감이 만들어집니다.",
        signal: "이탈 위험 ↓",
    },
    {
        time: "2:30",
        label: "첫 상호작용",
        en: "INTERACTION",
        body: "첫 질문과 첫 반응. 학생이 손을 들거나 채팅에 답하는 순간, 수동적 시청자가 참여자로 바뀝니다.",
        signal: "참여 시그널 ↑",
    },
    {
        time: "4:00",
        label: "몰입 확인",
        en: "ENGAGEMENT",
        body: "카메라와 반응으로 몰입을 확인합니다. 누가 따라오고 누가 처지는지 강사가 실시간으로 읽습니다.",
        signal: "집중 이탈 감지",
    },
    {
        time: "5:00",
        label: "“계속 듣고 싶다” 전환점",
        en: "THE TURN",
        body: "5분 만에 학생은 결정합니다. 이 수업을 계속 들을지 말지. 첫 5분이 좋으면, 재등록은 이미 시작된 것입니다.",
        signal: "재등록 의사 형성",
    },
]

export default function FirstFiveMinutes() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % steps.length)
        }, 3200)
        return () => clearInterval(id)
    }, [paused])

    const current = steps[active]

    return (
        <section className="relative py-24 md:py-32 bg-[#0B0F14] overflow-hidden border-y border-white/10">
            {/* Grain + radial accents */}
            <div className="absolute inset-0 bg-grain-dark opacity-[0.3] pointer-events-none mix-blend-overlay" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-radial-emerald pointer-events-none" />

            <div className="relative z-10 container mx-auto px-8 md:px-6 max-w-5xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-14 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2.5 text-[#8A9199] text-[11px] tracking-[0.2em] uppercase mb-8">
                        <span className="w-1.5 h-1.5 bg-[#E86A4C] rounded-full" />
                        THE FIRST FIVE MINUTES
                    </span>
                    <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#F2EFE8] tracking-[-0.02em] leading-[1.1] mb-6">
                        체험수업의 <span className="text-[#E86A4C]">첫 5분</span>,<br />
                        장면으로 보여드립니다.
                    </h2>
                    <p className="text-[#8A9199] text-base md:text-lg leading-[1.65]">
                        재등록은 마지막에 결정되지 않습니다. 첫 5분의 다섯 장면에서 이미 결정됩니다. 단계를 눌러 직접 따라가 보세요.
                    </p>
                </motion.div>

                {/* Interactive timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Step selector — horizontal timeline */}
                    <div className="relative mb-10">
                        <div className="absolute top-[7px] left-0 right-0 h-px bg-white/10" />
                        <div className="relative z-10 grid grid-cols-5 gap-2">
                            {steps.map((s, i) => {
                                const isActive = i === active
                                return (
                                    <button
                                        key={s.time}
                                        onClick={() => setActive(i)}
                                        className="flex flex-col items-center text-center group focus:outline-none"
                                        aria-label={`${s.time} ${s.label}`}
                                    >
                                        <span
                                            className={`w-3.5 h-3.5 rounded-full ring-4 ring-[#0B0F14] transition-colors duration-300 ${
                                                isActive ? "bg-[#E86A4C]" : "bg-white/20 group-hover:bg-white/40"
                                            }`}
                                        />
                                        <span
                                            className={`mt-3 text-xs font-serif tabular-nums tracking-[0.1em] transition-colors duration-300 ${
                                                isActive ? "text-[#E86A4C]" : "text-[#8A9199] group-hover:text-[#F2EFE8]"
                                            }`}
                                        >
                                            {s.time}
                                        </span>
                                        <span
                                            className={`mt-1 text-[10px] tracking-[0.18em] uppercase hidden sm:block transition-colors duration-300 ${
                                                isActive ? "text-[#F2EFE8]" : "text-[#8A9199]/60"
                                            }`}
                                        >
                                            {s.en}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Active step card */}
                    <div className="relative bg-white/[0.03] border border-white/10 rounded-xl p-8 md:p-12 min-h-[260px] md:min-h-[240px] overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-px bg-[#E86A4C]/40" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col md:flex-row gap-8 md:gap-12"
                            >
                                <div className="md:w-48 md:flex-shrink-0">
                                    <div className="font-serif font-semibold text-5xl md:text-6xl text-[#E86A4C] tabular-nums tracking-[-0.02em]">
                                        {current.time}
                                    </div>
                                    <div className="text-[11px] text-[#8A9199] tracking-[0.2em] uppercase mt-3">
                                        {current.en}
                                    </div>
                                </div>

                                <div className="flex-1 md:border-l md:border-white/10 md:pl-12">
                                    <h3 className="font-serif font-semibold text-2xl md:text-3xl text-[#F2EFE8] tracking-[-0.01em] leading-[1.2] mb-4">
                                        {current.label}
                                    </h3>
                                    <p className="text-[#8A9199] text-base md:text-lg leading-[1.65] mb-6">
                                        {current.body}
                                    </p>
                                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#1A4D3E]/60 bg-[#1A4D3E]/10">
                                        <span className="w-1 h-1 rounded-full bg-[#E86A4C]" />
                                        <span className="text-[#F2EFE8]/80 text-xs tracking-[0.1em]">{current.signal}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Closing line — ties back to hero promise */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 flex items-center gap-6"
                >
                    <div className="flex-1 h-px bg-white/10" />
                    <p className="text-[#8A9199] text-sm italic font-serif text-center">
                        첫 5분이 재등록을 결정합니다.
                    </p>
                    <div className="flex-1 h-px bg-white/10" />
                </motion.div>
            </div>
        </section>
    )
}
