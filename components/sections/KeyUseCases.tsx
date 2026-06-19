"use client"

import { motion } from "framer-motion"

const features = [
    {
        label: "FEATURE 01 · AI MANAGEMENT",
        headline: "수업 중 학생이\n뭘 하는지 실시간으로\n압니다",
        desc: "AI가 학생 얼굴과 행동을 분석해 집중도를 실시간으로 측정합니다. 이탈·졸음 감지 시 선생님에게 즉시 알림이 갑니다.",
        bullets: ["AI 얼굴 인식 출석 체크 — 자동, 0초", "집중도 스코어 실시간 대시보드", "이탈·졸음 감지 → 선생님 즉시 알림", "수업 후 학생별 참여도 리포트 자동 생성"],
    },
    {
        label: "FEATURE 02 · INTERACTIVE TOOLS",
        headline: "학생이 참여할 수밖에\n없는 수업 환경",
        desc: "",
        bullets: ["실시간 화이트보드 — 선생님·학생 동시 필기", "소그룹 토의 (Breakout) — AI 자동 그룹 편성", "실시간 퀴즈·투표 — 이해도 즉시 파악", "파일·화면 공유 — 끊김 없이, 주석 동시 작성"],
        quote: '"ClassIn 도입 후 수업 참여율이 평균 3배 올랐어요." — OO 수학학원 원장 / 수강생 340명 운영 중',
    },
    {
        label: "FEATURE 03 · OPS AUTOMATION",
        headline: "선생님은 가르치는 데만\n집중하세요.\n나머지는 ClassIn이 합니다",
        desc: "",
        bullets: ["수업 녹화 자동 저장 → 복습용 VOD 즉시 생성", "출석·지각·결석 자동 집계, 수작업 0", "과제 제출·채점 통합 관리", "수업 리포트 자동 발송 (학부모 앱 연동)", "결제·수강 관리 통합"],
    },
]

export function KeyUseCases() {
    return (
        <div className="bg-[#0B0F14]">
            {features.map((feature, i) => (
                <section key={i} className="border-b border-white/10 py-24">
                    <div className="container mx-auto px-8 md:px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="text-[#E86A4C] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                                    {feature.label}
                                </p>
                                <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#F2EFE8] tracking-[-0.02em] leading-[1.1] mb-6 whitespace-pre-line">
                                    {feature.headline}
                                </h2>
                                {feature.desc && (
                                    <p className="text-[#8A9199] text-base md:text-lg leading-[1.65]">
                                        {feature.desc}
                                    </p>
                                )}
                                {feature.quote && (
                                    <blockquote className="mt-8 border-l border-[#1A4D3E] pl-4 text-[#8A9199] text-sm italic font-serif leading-[1.65]">
                                        {feature.quote}
                                    </blockquote>
                                )}
                            </motion.div>
                            <motion.ul
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="space-y-3 pt-2"
                            >
                                {feature.bullets.map((b, j) => (
                                    <li
                                        key={j}
                                        className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-5"
                                    >
                                        <span className="text-[#E86A4C] font-serif text-sm mt-0.5 shrink-0">
                                            {String(j + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-[#8A9199] text-sm leading-[1.65]">
                                            {b}
                                        </span>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
}
