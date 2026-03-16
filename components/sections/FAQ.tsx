"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "도입하는 데 얼마나 걸리나요?",
        answer: "대부분의 경우 48시간 이내에 데이터 이관과 세팅을 완료합니다. 첫 주에는 강사분들을 위한 집중 교육 세션을 제공하여 빠르게 적응하실 수 있도록 돕습니다.",
    },
    {
        question: "학생들에게 특정 기기가 필요한가요?",
        answer: "아니요. ClassIn은 웹 기반으로 작동하며 반응형을 지원합니다. 노트북, 태블릿, 스마트폰 등 어떤 기기에서도 별도의 설치 없이 사용 가능합니다.",
    },
    {
        question: "기존 결제 시스템과 연동되나요?",
        answer: "네, 주요 결제 및 CRM 플랫폼과 API 연동을 지원합니다. 데모 상담 시 사용 중인 솔루션을 말씀해 주시면 상세한 호환성을 안내해 드립니다.",
    },
    {
        question: "수업 콘텐츠와 학생 데이터는 안전한가요?",
        answer: "모든 수업 자료와 학생 데이터는 암호화되어 안전하게 보관됩니다. 데이터 소유권은 전적으로 기관에 있으며, 엄격한 접근 제어로 무단 유출을 방지합니다.",
    },
    {
        question: "요금 체계는 어떻게 되나요?",
        answer: "수강생 수에 따른 합리적인 요금제를 제공합니다. 강사 계정과 관리자 계정은 무제한으로 제공되므로 인력이 늘어나도 추가 비용이 없습니다. 30일 무료 체험 후 결정하실 수 있습니다.",
    },
]

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            viewport={{ once: true }}
            className="border-b border-[#1A1A1A]"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-7 text-left gap-4 group"
            >
                <span className="text-white font-semibold text-lg group-hover:text-[#BFFF00] transition-colors leading-snug">
                    {question}
                </span>
                <span className="shrink-0 w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-[#555] group-hover:border-[#BFFF00] group-hover:text-[#BFFF00] transition-colors">
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-7 text-[#999] text-base leading-relaxed pr-12">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function FAQ() {
    return (
        <section className="py-24 bg-[#0A0A0A] border-b border-[#1A1A1A]">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3 shrink-0">
                        <p className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">FAQ</p>
                        <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
                            자주 묻는<br />질문
                        </h2>
                        <p className="mt-4 text-[#777] text-sm leading-relaxed">
                            더 궁금한 점이 있으시다면 언제든지 문의해 주세요.
                        </p>
                    </div>

                    <div className="flex-1 border-t border-[#1A1A1A]">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} {...faq} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
