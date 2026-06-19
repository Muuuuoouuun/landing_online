"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, Clock, TrendingDown } from "lucide-react"

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        const duration = 2000
        const startTime = performance.now()
        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [isInView, target])

    return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const pains = [
    {
        icon: TrendingDown,
        title: "체험수업 → 등록, 조용한 누수",
        desc: "체험은 들어오는데 결제로 안 이어집니다. 첫 5분의 인상과 후속 안내가 끊겨 있기 때문입니다.",
        countTarget: 61,
        countSuffix: "%",
        countLabel: "체험 후 이탈률",
    },
    {
        icon: AlertTriangle,
        title: "강사마다 달라지는 수업 경험",
        desc: "같은 브랜드인데 튜터별 전달력·자료·피드백이 제각각. 학생 만족도 편차가 재등록률을 갉아먹습니다.",
        countTarget: 58,
        countSuffix: "%",
        countLabel: "튜터별 만족도 편차",
    },
    {
        icon: Clock,
        title: "수업이 끝나면 경험도 끝난다",
        desc: "녹화·복습·과제·피드백이 도구별로 흩어져, 수업 후 가치를 학생·학부모가 체감할 수 없습니다.",
        countTarget: 42,
        countSuffix: "%",
        countLabel: "3개월 내 중도 이탈",
    },
]

export function ProblemCost() {
    return (
        <section className="relative py-24 md:py-32 bg-[#0E1A1F] overflow-hidden">
            {/* Subtle radial accent */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-[#1A4D3E]/[0.05] rounded-full blur-[140px]" />

            {/* Noise texture */}
            <div className="absolute inset-0 bg-[url('/images/noise-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-8 md:px-6 relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20 px-4"
                >
                    <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full border border-[#E86A4C]/30 text-[#E86A4C]/80 text-xs font-medium tracking-[0.15em] uppercase mb-8">
                        <span className="w-1 h-1 rounded-full bg-[#E86A4C]/80" />
                        누수 감지
                    </span>
                    <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#F2EFE8] tracking-[-0.02em] leading-[1.1] mb-6">
                        온라인 수업은 열려 있지만,<br className="md:hidden" />
                        <span className="text-[#E86A4C]">가치는 조용히 새고 있습니다</span>
                    </h2>
                    <p className="text-base md:text-lg leading-[1.65] text-[#8A9199]">
                        문제는 "온라인이 어렵다"가 아닙니다. 전환·재등록·신뢰가 경험의 끊긴 틈에서 매일 빠져나가고 있다는 것입니다.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {pains.map((pain, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <div className="relative h-full md:min-h-[420px] rounded-xl overflow-hidden bg-white/[0.03] border border-white/10 transition-colors duration-500 hover:border-white/20 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
                                {/* Top hairline */}
                                <div className="absolute top-0 inset-x-0 h-px bg-[#1A4D3E]/60" />

                                <div className="p-8 md:p-10 flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="mb-8">
                                        <pain.icon className="w-8 h-8 text-[#E86A4C]/60" strokeWidth={1.25} />
                                    </div>

                                    <h3 className="font-serif font-semibold text-xl md:text-2xl text-[#F2EFE8] tracking-[-0.01em] leading-[1.2] mb-4">{pain.title}</h3>
                                    <p className="text-[#8A9199] text-base leading-[1.65] mb-8 flex-grow">{pain.desc}</p>

                                    {/* Cost footer with counter */}
                                    <div className="w-full pt-6 border-t border-white/10 mt-auto">
                                        <p className="text-[11px] text-[#8A9199] uppercase tracking-[0.2em] mb-2">예상 손실</p>
                                        <p className="font-serif font-semibold text-2xl text-[#F2EFE8]">
                                            <span className="text-[#E86A4C]"><CountUp target={pain.countTarget} suffix={pain.countSuffix} /></span>
                                            <span className="text-[#8A9199] text-base ml-2">{pain.countLabel}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Risk Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-20 mx-auto max-w-4xl"
                >
                    <div className="bg-white/[0.03] p-8 md:p-10 rounded-xl border border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="font-serif font-semibold text-[#F2EFE8] text-xl tracking-[-0.01em] mb-1">운영 리스크 대시보드</h3>
                                <p className="text-[#8A9199] text-sm">운영 구조 없이 라이브 툴만 쓰는 팀 평균</p>
                            </div>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E86A4C]/30">
                                <span className="w-1 h-1 rounded-full bg-[#E86A4C]/80" />
                                <span className="text-[#E86A4C]/80 text-xs tracking-[0.15em] uppercase">누수 감지</span>
                            </span>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {[
                                { label: "체험→등록 전환", value: 23, desc: "평균 전환율에 머무름" },
                                { label: "3개월 재등록률", value: 48, desc: "수업 후 경험 공백" },
                                { label: "튜터별 편차", value: 58, desc: "학생 만족도 분산" },
                            ].map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                    className="relative p-5 rounded-lg bg-white/[0.03] border border-white/10"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[#8A9199] text-sm">{metric.label}</span>
                                    </div>
                                    <div className="flex items-end gap-1 mb-3">
                                        <span className="font-serif font-semibold text-4xl text-[#E86A4C]">
                                            <CountUp target={metric.value} suffix="" />
                                        </span>
                                        <span className="text-[#8A9199] text-lg mb-1">%</span>
                                    </div>
                                    {/* Mini bar */}
                                    <div className="h-px bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: `${metric.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            className="h-full bg-[#1A4D3E]"
                                        />
                                    </div>
                                    <p className="text-[#8A9199] text-xs mt-3">{metric.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Overall Risk Bar */}
                        <div className="p-5 rounded-lg bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[#F2EFE8] text-sm">매출 누수 종합 지수</span>
                                <span className="font-serif font-semibold text-[#E86A4C] text-lg"><CountUp target={76} suffix="%" /></span>
                            </div>
                            <div className="relative h-px bg-white/10 overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "76%" }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className="h-full bg-[#1A4D3E]"
                                />
                            </div>
                            <p className="text-xs text-[#8A9199] mt-3 text-center leading-[1.65]">
                                10곳 중 7곳 이상이, 라이브 툴은 쓰지만 수업 前·中·後를 잇지 못해 매출이 새고 있습니다
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom edge hairline */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/5" />
        </section>
    )
}
