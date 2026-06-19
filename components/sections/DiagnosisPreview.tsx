"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const rows = [
  {
    n: "01",
    title: "유입 · 체험 · 등록의 연결",
    body: "광고·콘텐츠에서 체험, 그리고 등록으로 이어지는 퍼널의 끊김 지점을 진단합니다.",
  },
  {
    n: "02",
    title: "수업 경험의 전달력과 일관성",
    body: "수업 설계와 진행 방식이 약속한 가치와 얼마나 일치하는지 확인합니다.",
  },
  {
    n: "03",
    title: "수업 後 유지와 재등록 흐름",
    body: "수업이 끝난 뒤 한 주, 한 달의 흐름을 살펴 재등록 트리거를 점검합니다.",
  },
  {
    n: "04",
    title: "강사 · 튜터 간 운영 편차",
    body: "튜터별 결과 편차를 지표로 만들어, 구조적인 개선 포인트를 찾습니다.",
  },
  {
    n: "05",
    title: "브랜드 · 프리미엄 체감 수준",
    body: "고객이 느끼는 가격 정당성과 프리미엄 시그널을 다섯 항목으로 진단합니다.",
  },
];

export default function DiagnosisPreview() {
  return (
    <section className="bg-[#F2EFE8] relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-dot-grid-light opacity-60" />
      <div className="absolute inset-0 bg-radial-cream" />

      <div className="relative max-w-5xl mx-auto px-6">
        <p className="text-[#1A4D3E] text-xs font-serif tracking-[0.25em] uppercase">
          FIVE-AXIS DIAGNOSIS · 30 MIN
        </p>
        <h2 className="font-serif font-semibold text-4xl md:text-5xl text-[#0B0F14] tracking-[-0.02em] leading-[1.12] mt-5 whitespace-pre-line">
          {"상담이 아닙니다.\n당신의 운영 흐름을 30분간 해부합니다."}
        </h2>
        <p className="text-[#5A6169] text-base md:text-lg max-w-2xl mt-5 leading-[1.65]">
          영업 전화 없음. 리포트 PDF 제공. 현재 병목 3가지와 우선 적용 시나리오를 드립니다.
        </p>

        <div className="mt-16">
          {rows.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`flex items-center gap-6 py-6 border-t border-[#0B0F14]/10 ${
                i === rows.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="font-serif text-[#E86A4C] text-2xl w-12 text-right tabular-nums">
                {r.n}
              </div>
              <div className="flex-1">
                <div className="font-serif font-semibold text-[#0B0F14] text-xl md:text-2xl">
                  {r.title}
                </div>
                <div className="text-[#5A6169] text-sm leading-[1.6] mt-2">{r.body}</div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#1A4D3E]/40" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex items-center">
          <button className="bg-[#1A4D3E] text-[#F2EFE8] font-semibold px-8 py-4 rounded-lg hover:bg-[#0B0F14] transition">
            진단 받기 →
          </button>
          <span className="text-[#5A6169] text-sm ml-6">리포트 샘플 보기</span>
        </div>
      </div>
    </section>
  );
}
