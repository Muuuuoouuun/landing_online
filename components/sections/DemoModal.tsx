"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"

export function DemoModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTimeout(() => setSubmitted(true), 800)
    }

    return (
        <>
            <span onClick={() => setOpen(true)} style={{ cursor: "pointer", display: "contents" }}>
                {children}
            </span>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-md bg-[#0A0A0A] border border-[#2A2A2A] p-8 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {submitted ? (
                                <div className="flex flex-col items-center text-center py-8 gap-4">
                                    <CheckCircle2 className="w-12 h-12 text-[#BFFF00]" />
                                    <h3 className="text-xl font-bold text-white">신청이 접수되었습니다!</h3>
                                    <p className="text-[#777]">15분 내로 맞춤형 도입 플랜과 함께 연락드리겠습니다.</p>
                                    <button
                                        onClick={() => { setSubmitted(false); setOpen(false) }}
                                        className="mt-2 border border-[#333] text-white px-6 py-2 hover:border-[#BFFF00] transition-colors text-sm"
                                    >
                                        닫기
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-black text-white mb-1">맞춤형 데모 예약하기</h2>
                                    <p className="text-[#777] text-sm mb-6">플랫폼을 직접 경험해보세요. 운영 방식을 표준화하는 방법을 안내해 드립니다.</p>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            placeholder="이름"
                                            required
                                            className="bg-[#111] border border-[#2A2A2A] text-white placeholder:text-[#555] px-4 py-3 text-sm outline-none focus:border-[#BFFF00] transition-colors"
                                        />
                                        <input
                                            type="text"
                                            placeholder="기관명"
                                            required
                                            className="bg-[#111] border border-[#2A2A2A] text-white placeholder:text-[#555] px-4 py-3 text-sm outline-none focus:border-[#BFFF00] transition-colors"
                                        />
                                        <input
                                            type="email"
                                            placeholder="이메일"
                                            required
                                            className="bg-[#111] border border-[#2A2A2A] text-white placeholder:text-[#555] px-4 py-3 text-sm outline-none focus:border-[#BFFF00] transition-colors"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="전화번호"
                                            required
                                            className="bg-[#111] border border-[#2A2A2A] text-white placeholder:text-[#555] px-4 py-3 text-sm outline-none focus:border-[#BFFF00] transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-2 bg-[#BFFF00] text-black font-bold py-3 hover:bg-white transition-colors text-sm"
                                        >
                                            데모 신청하기
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
