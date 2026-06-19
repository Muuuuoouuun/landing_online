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
        <section className="py-24 md:py-32 bg-[#0E1A1F] border-t border-white/10">
            <div className="max-w-5xl mx-auto px-8 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 max-w-2xl"
                >
                    <p className="text-[#E86A4C] text-xs tracking-[0.2em] uppercase mb-5">운영 구조 vs 단일 라이브 툴</p>
                    <h2 className="font-serif font-semibold text-[#F2EFE8] text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1]">
                        라이브 수업 툴은 수업 中만 돕습니다.<br />
                        ClassIn은 前·中·後를 잇습니다.
                    </h2>
                    <p className="mt-5 text-[#8A9199] text-base md:text-lg leading-[1.65]">
                        규모에 맞게 시작하고, 필요할 때 확장하세요.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className={`p-10 flex flex-col ${plan.highlight ? "bg-white/[0.03]" : "bg-[#0E1A1F]"}`}
                        >
                            {plan.highlight && (
                                <span className="inline-block bg-[#1A4D3E] text-[#F2EFE8] text-[11px] tracking-[0.15em] uppercase px-3 py-1 mb-5 self-start rounded-sm">
                                    가장 인기
                                </span>
                            )}
                            <p className="text-[#8A9199] text-xs tracking-[0.2em] uppercase mb-3">{plan.name}</p>
                            <div className="flex items-end gap-2 mb-3">
                                <span className="font-serif text-[#F2EFE8] text-4xl md:text-5xl tracking-[-0.02em]">
                                    {plan.price}
                                </span>
                                {plan.period && <span className="text-[#8A9199] text-sm mb-2">{plan.period}</span>}
                            </div>
                            <p className="text-[#8A9199] text-base leading-[1.65] mb-8">{plan.desc}</p>

                            <ul className="flex flex-col gap-3 mb-10 flex-1">
                                {plan.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-3 text-base text-[#F2EFE8]/90 leading-[1.5]">
                                        <Check className="w-4 h-4 text-[#1A4D3E] mt-1 shrink-0" strokeWidth={2.5} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <DemoModal>
                                <button className={`w-full py-4 text-sm tracking-wide transition-colors rounded-lg ${
                                    plan.highlight
                                        ? "bg-[#1A4D3E] text-[#F2EFE8] hover:bg-[#1A4D3E]/90"
                                        : "border border-white/10 text-[#F2EFE8] hover:border-[#1A4D3E] hover:text-[#F2EFE8]"
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
