"use client"

import { motion } from "framer-motion"

const features = [
    {
        label: "FEATURE 01 · AI MANAGEMENT",
        headline: "수업 중 학생이\n뭘 하는지 실시간으로\n압니다",
        desc: "AI가 학생 얼굴과 행동을 분석해 집중도를 실시간으로 측정합니다. 이탈·졸음 감지 시 선생님에게 즉시 알림이 갑니다.",
        bullets: ["AI 얼굴 인식 출석 체크 — 자동, 0초","집중도 스코어 실시간 대시보드","이탈·졸음 감지 → 선생님 즉시 알림","수업 후 학생별 참여도 리포트 자동 생성"],
        bg: "#0A0A0A",
    },
    {
        label: "FEATURE 02 · INTERACTIVE TOOLS",
        headline: "학생이 참여할 수밖에\n없는 수업 환경",
        desc: "",
        bullets: ["실시간 화이트보드 — 선생님·학생 동시 필기","소그룹 토의 (Breakout) — AI 자동 그룹 편성","실시간 퀴즈·투표 — 이해도 즉시 파악","파일·화면 공유 — 끊김 없이, 주석 동시 작성"],
        bg: "#000000",
        quote: '"ClassIn 도입 후 수업 참여율이 평균 3배 올랐어요." — OO 수학학원 원장 / 수강생 340명 운영 중',
    },
    {
        label: "FEATURE 03 · OPS AUTOMATION",
        headline: "선생님은 가르치는 데만\n집중하세요.\n나머지는 ClassIn이 합니다",
        desc: "",
        bullets: ["수업 녹화 자동 저장 → 복습용 VOD 즉시 생성","출석·지각·결석 자동 집계, 수작업 0","과제 제출·채점 통합 관리","수업 리포트 자동 발송 (학부모 앱 연동)","결제·수강 관리 통합"],
        bg: "#0A0A0A",
    },
]

export function KeyUseCases() {
    return (
        <div>
            {features.map((feature, i) => (
                <section key={i} className="border-b border-[#1A1A1A] py-24" style={{ background: feature.bg }}>
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <p className="text-[#BFFF00] text-xs font-mono tracking-[0.2em] uppercase mb-6">{feature.label}</p>
                                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-6 whitespace-pre-line">{feature.headline}</h2>
                                {feature.desc && <p className="text-[#666] text-base leading-relaxed">{feature.desc}</p>}
                                {feature.quote && <blockquote className="mt-8 border-l-2 border-[#BFFF00] pl-4 text-[#999] text-sm italic leading-relaxed">{feature.quote}</blockquote>}
                            </motion.div>
                            <motion.ul initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-3 pt-2">
                                {feature.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-3 border border-[#1A1A1A] p-4 hover:border-[#BFFF00]/40 transition-colors">
                                        <span className="text-[#BFFF00] font-mono text-xs mt-0.5 shrink-0">{String(j + 1).padStart(2, "0")}</span>
                                        <span className="text-[#999] text-sm">{b}</span>
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
