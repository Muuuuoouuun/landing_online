"use client"

import { motion } from "framer-motion"
import { Check, X, Minus } from "lucide-react"

const features = [
    "화면 공유 & 판서",
    "인터랙티브 화이트보드",
    "실시간 학생 모니터링",
    "AI 자동 채점",
    "출결 자동 관리",
    "학습 분석 대시보드",
    "학부모 리포트 자동화",
    "대용량 동접 (2,000명+)",
    "지연 없는 저지연 스트리밍",
]

type StatusType = "check" | "x" | "partial"

const tools: { name: string; status: StatusType[] }[] = [
    {
        name: "Zoom",
        status: ["check", "x", "x", "x", "x", "x", "x", "check", "check"],
    },
    {
        name: "Google Meet",
        status: ["check", "x", "x", "x", "x", "partial", "x", "check", "check"],
    },
    {
        name: "ClassIn",
        status: ["check", "check", "check", "check", "check", "check", "check", "check", "check"],
    },
]

function StatusIcon({ status }: { status: StatusType }) {
    if (status === "check") return <Check className="w-5 h-5 text-[#BFFF00]" />
    if (status === "partial") return <Minus className="w-5 h-5 text-[#555]" />
    return <X className="w-4 h-4 text-[#444]" />
}

export function CaseStudies() {
    return (
        <section className="py-24 bg-black border-b border-[#1A1A1A] overflow-x-auto">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">COMPARISON</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        왜 ClassIn인가요?
                    </h2>
                    <p className="mt-4 text-[#777] text-lg max-w-xl">
                        교육 특화 기능에서 ClassIn은 범용 화상회의 툴과 비교가 되지 않습니다.
                    </p>
                </motion.div>

                <div className="min-w-[640px]">
                    {/* Header */}
                    <div className="grid grid-cols-4 border-b border-[#1A1A1A] pb-4 mb-0">
                        <div className="text-[#555] text-xs font-mono uppercase tracking-wider">기능</div>
                        {tools.map((tool, i) => (
                            <div key={i} className={`text-center text-sm font-bold ${tool.name === "ClassIn" ? "text-[#BFFF00]" : "text-[#777]"}`}>
                                {tool.name === "ClassIn" ? (
                                    <span className="inline-flex items-center gap-1">
                                        {tool.name}
                                        <span className="text-[10px] bg-[#BFFF00] text-black px-1.5 py-0.5 font-black">추천</span>
                                    </span>
                                ) : tool.name}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {features.map((feat, fi) => (
                        <motion.div
                            key={fi}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: fi * 0.05 }}
                            viewport={{ once: true }}
                            className={`grid grid-cols-4 py-4 border-b border-[#1A1A1A] ${fi % 2 === 0 ? "bg-transparent" : "bg-[#0A0A0A]"}`}
                        >
                            <div className="text-[#999] text-sm">{feat}</div>
                            {tools.map((tool, ti) => (
                                <div key={ti} className="flex justify-center items-center">
                                    <StatusIcon status={tool.status[fi]} />
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
