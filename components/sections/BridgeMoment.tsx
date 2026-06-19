"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

function CountUp({ target, suffix = "", prefix = "", decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        const duration = 2000
        const startTime = performance.now()
        const multiplier = Math.pow(10, decimals)
        const scaledTarget = Math.round(target * multiplier)
        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * scaledTarget))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [isInView, target, decimals])

    const displayValue = decimals > 0 ? (count / Math.pow(10, decimals)).toFixed(decimals) : count

    return <span ref={ref}>{prefix}{displayValue}{suffix}</span>
}

const stats = [
    { value: 34, suffix: "%", prefix: "+", label: "체험→등록 전환율", decimals: 0 },
    { value: 72, suffix: "%", prefix: "", label: "3개월 재등록률", decimals: 0 },
    { value: 60, suffix: "%", prefix: "-", label: "튜터별 경험 편차", decimals: 0 },
]

export function BridgeMoment() {
    return (
        <section className="relative py-24 md:py-32 bg-[#F2EFE8] overflow-hidden">
            {/* Subtle radial accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1A4D3E]/[0.05] rounded-full blur-[150px]" />

            <div className="container mx-auto px-8 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="relative rounded-xl overflow-hidden bg-white/60 border border-[#0B0F14]/10">
                        <div className="absolute top-0 inset-x-0 h-px bg-[#1A4D3E]/30" />

                        <div className="relative z-10 p-8 md:p-16">
                            {/* Top section: Question + Answer */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                {/* Left: Question */}
                                <div className="flex-1 text-center md:text-left min-w-0">
                                    <motion.p
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1, duration: 0.6 }}
                                        className="text-[#5A6169] text-xs font-medium uppercase tracking-[0.25em] mb-4"
                                    >
                                        만약에
                                    </motion.p>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15, duration: 0.6 }}
                                        className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#0B0F14] leading-[1.1] tracking-[-0.02em]"
                                    >
                                        <span className="text-[#1A4D3E]">체험수업의 첫 5분</span>부터<br />
                                        <span className="text-[#1A4D3E]">재등록</span>까지 이어진다면?
                                    </motion.h2>
                                </div>

                                {/* Divider - hairline */}
                                <div className="hidden md:flex items-center shrink-0">
                                    <div className="w-16 h-px bg-[#1A4D3E]/40" />
                                    <span className="text-[#1A4D3E] text-xl ml-1">→</span>
                                </div>

                                {/* Right: Answer */}
                                <div className="flex-1 text-center md:text-left min-w-0">
                                    <motion.p
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-[#5A6169] text-base md:text-lg leading-[1.65]"
                                    >
                                        수업 前·中·後가 하나의 경험이 되면,<br className="hidden md:block" />
                                        전환·재등록·신뢰가 같이 움직입니다.
                                    </motion.p>
                                </div>
                            </div>

                            {/* Divider line */}
                            <div className="my-8 md:my-10 h-px bg-[#0B0F14]/10" />

                            {/* Bottom: Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.25, duration: 0.6 }}
                                className="grid grid-cols-3 gap-4 md:gap-6"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                        className="relative p-5 md:p-6 rounded-lg bg-white/70 border border-[#0B0F14]/10 text-center"
                                    >
                                        <div className="font-serif font-semibold text-3xl md:text-5xl text-[#E86A4C] mb-2 tracking-[-0.02em]">
                                            <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                                        </div>
                                        <div className="text-[#5A6169] text-xs md:text-sm tracking-wider">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom edge hairline */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-[#0B0F14]/10" />
        </section>
    )
}
