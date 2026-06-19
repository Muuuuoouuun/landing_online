"use client"

import { motion } from "framer-motion"

const leaks = [
    {
        n: "01",
        ko: "수업 前",
        en: "BEFORE",
        leak: "입장·노쇼 이탈",
        body: "안내가 끊기면 체험 신청자의 상당수가 입장조차 하지 않습니다. 첫 장면이 만들어지기 전에 이미 새어 나갑니다.",
        cost: "체험 신청의 1/3이 노쇼로 사라짐",
        fix: "입장 안내 자동화 · 사전 자료로 기대감 형성",
    },
    {
        n: "02",
        ko: "수업 中",
        en: "DURING",
        leak: "몰입 이탈",
        body: "카메라를 끄고, 화면 뒤로 사라집니다. 참여 시그널이 보이지 않으니 강사도 누가 떠났는지 모릅니다.",
        cost: "라이브 중 집중 이탈이 만족도를 갉아먹음",
        fix: "참여·몰입 실시간 시그널 · 튜터별 편차 조율",
    },
    {
        n: "03",
        ko: "수업 後",
        en: "AFTER",
        leak: "복습·재등록 이탈",
        body: "수업이 끝나면 경험도 끝납니다. 복습·피드백·재등록 안내가 흩어져 있어, 다음 결제로 이어지지 못합니다.",
        cost: "3개월 내 중도 이탈로 재등록 누수",
        fix: "복습 큐·리포트 자동화 · 재등록 트리거 연결",
    },
]

export function LeakPoints() {
    return (
        <section className="relative py-24 md:py-32 bg-[#0B0F14] overflow-hidden border-y border-white/10">
            {/* Grain + radial accents */}
            <div className="absolute inset-0 bg-grain-dark opacity-[0.3] pointer-events-none mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-radial-warm pointer-events-none" />

            <div className="relative z-10 container mx-auto px-8 md:px-6 max-w-5xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-16 md:mb-20"
                >
                    <span className="inline-flex items-center gap-2.5 text-[#8A9199] text-[11px] tracking-[0.2em] uppercase mb-8">
                        <span className="w-1.5 h-1.5 bg-[#E86A4C] rounded-full" />
                        WHERE THE REVENUE LEAKS
                    </span>
                    <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-[#F2EFE8] tracking-[-0.02em] leading-[1.1] mb-6">
                        온라인 수업에서<br />
                        <span className="text-[#E86A4C]">매출이 새는 3곳</span>
                    </h2>
                    <p className="text-[#8A9199] text-base md:text-lg leading-[1.65]">
                        누수는 한 곳에서 터지지 않습니다. 수업 <span className="text-[#F2EFE8]">前·中·後</span>의 세 지점에서 조용히, 그러나 매일 빠져나갑니다.
                    </p>
                </motion.div>

                {/* Dashed timeline — mirrors Hero THE LOOP */}
                <div className="relative pl-12">
                    {/* Decorative dashed timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 border-l border-dashed border-white/10" />

                    {/* THE LEAK caption */}
                    <div className="text-[#8A9199] text-[10px] font-serif tracking-[0.25em] uppercase mb-8 pl-2">
                        THE LEAK
                    </div>

                    <div className="relative flex flex-col gap-5">
                        {leaks.map((c, i) => (
                            <motion.div
                                key={c.n}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="relative bg-white/[0.03] border border-white/10 rounded-lg p-6 md:p-8 transition-colors duration-500 hover:border-white/20"
                            >
                                {/* Dot marker on the timeline */}
                                <div className="absolute -left-[26px] top-9 w-2 h-2 rounded-full bg-[#E86A4C]" />

                                <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                                    {/* Phase label */}
                                    <div className="flex items-start justify-between md:flex-col md:justify-start md:w-40 md:flex-shrink-0">
                                        <div>
                                            <div className="text-[11px] text-[#8A9199] tracking-[0.2em] uppercase mb-1">{c.en}</div>
                                            <div className="font-serif font-semibold text-[#F2EFE8] text-lg">{c.ko}</div>
                                        </div>
                                        <div className="font-serif text-[#E86A4C] text-sm md:mt-3">{c.n}</div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1 md:border-l md:border-white/10 md:pl-8">
                                        <h3 className="font-serif font-semibold text-xl md:text-2xl text-[#E86A4C] tracking-[-0.01em] leading-[1.2] mb-4">
                                            {c.leak}
                                        </h3>
                                        <p className="text-[#8A9199] text-base leading-[1.65] mb-6">{c.body}</p>

                                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 pt-5 border-t border-white/10">
                                            <div>
                                                <p className="text-[11px] text-[#8A9199] uppercase tracking-[0.2em] mb-2">예상 누수</p>
                                                <p className="text-[#F2EFE8] text-sm leading-[1.5]">{c.cost}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-[#8A9199] uppercase tracking-[0.2em] mb-2">막는 법</p>
                                                <p className="text-[#F2EFE8] text-sm leading-[1.5]">{c.fix}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Closing hairline note — ties back to hero promise */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 pt-8 flex items-center gap-6"
                >
                    <div className="flex-1 h-px bg-white/10" />
                    <p className="text-[#8A9199] text-sm italic font-serif text-center">
                        세 곳을 한 흐름으로 막으면, 누수는 멈춥니다.
                    </p>
                    <div className="flex-1 h-px bg-white/10" />
                </motion.div>
            </div>
        </section>
    )
}
