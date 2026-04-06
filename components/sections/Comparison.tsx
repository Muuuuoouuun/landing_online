"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { DemoModal } from "./DemoModal"

const plans = [
    {
        name: "스타터",
        price: "무료",
        period: "30일 체험",
        desc: "개인 강사 또는 소규모 그룹 수업에 최적화.",
        features: [
            "학생 최대 30명",
            "기본 화이트보드",
            "화상 수업 녹화",
            "출결 관리",
            "이메일 지원",
        ],
        cta: "무료 시작",
        highlight: false,
    },
    {
        name: "프로",
        price: "₩49,000",
        period: "/ 월",
        desc: "성장하는 온라인 스쿨을 위한 완전한 도구 세트.",
        features: [
            "학생 최대 200명",
            "AI 실시간 모니터링",
            "자동 채점 & 피드백",
            "학습 분석 대시보드",
            "학부모 리포트 자동화",
            "전담 CS 지원",
        ],
        cta: "프로 시작하기",
        highlight: true,
    },
    {
        name: "엔터프라이즈",
        price: "문의",
        period: "",
        desc: "대학·기업·다지점 기관을 위한 맞춤형 솔루션.",
        features: [
            "학생 무제한",
            "2,000명 동시접속",
            "전용 서버 & SLA 보장",
            "맞춤형 브랜딩",
            "API 연동",
            "전담 어카운트 매니저",
        ],
        cta: "도입 문의",
        highlight: false,
    },
]

export function Comparison() {
    return (
        <section className="py-24 bg-black border-b border-[#1A1A1A]">
            <div className="max-w-5xl mx-auto px-8 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">PRICING</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        합리적인 요금제
                    </h2>
                    <p className="mt-4 text-[#777] text-lg">
                        규모에 맞게 시작하고, 필요할 때 확장하세요.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-px bg-[#1A1A1A]">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 flex flex-col ${plan.highlight ? "bg-[#0D0D0D] border border-[#BFFF00]/30" : "bg-black"}`}
                            style={{ margin: plan.highlight ? "-1px" : "0" }}
                        >
                            {plan.highlight && (
                                <span className="inline-block bg-[#BFFF00] text-black text-xs font-black px-3 py-1 mb-4 self-start tracking-wider">
                                    가장 인기
                                </span>
                            )}
                            <p className="text-[#777] text-xs font-mono uppercase tracking-widest mb-2">{plan.name}</p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className={`text-4xl font-black ${plan.highlight ? "text-[#BFFF00]" : "text-white"}`}>
                                    {plan.price}
                                </span>
                                {plan.period && <span className="text-[#555] text-sm mb-1">{plan.period}</span>}
                            </div>
                            <p className="text-[#555] text-sm mb-8 leading-relaxed">{plan.desc}</p>

                            <ul className="flex flex-col gap-3 mb-10 flex-1">
                                {plan.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2.5 text-sm text-[#999]">
                                        <Check className="w-4 h-4 text-[#BFFF00] mt-0.5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <DemoModal>
                                <button className={`w-full py-3 font-bold text-sm transition-colors ${
                                    plan.highlight
                                        ? "bg-[#BFFF00] text-black hover:bg-white"
                                        : "border border-[#2A2A2A] text-white hover:border-[#BFFF00] hover:text-[#BFFF00]"
                                }`}>
                                    {plan.cta}
                                </button>
                            </DemoModal>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
