export function Footer() {
    return (
        <footer className="bg-[#0B0F14] py-20 border-t border-[#1A4D3E]/20">
            <div className="max-w-6xl mx-auto px-8 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <span className="font-serif text-[#F2EFE8] text-2xl tracking-[-0.02em] block mb-4">CLASS IN</span>
                        <p className="text-[#8A9199] text-base leading-[1.65]">
                            AI 기반 온라인 교실 플랫폼.<br />
                            학생이 집중하고, 선생님이 통제합니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif text-[#F2EFE8] text-sm mb-5">제품</h4>
                        <ul className="space-y-3 text-sm text-[#8A9199]">
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">인터랙티브 교실</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">AI 모니터링</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">성과 분석</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">자동화 행정</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif text-[#F2EFE8] text-sm mb-5">자원</h4>
                        <ul className="space-y-3 text-sm text-[#8A9199]">
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">블로그</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">도입 사례</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">고객 센터</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif text-[#F2EFE8] text-sm mb-5">이용안내</h4>
                        <ul className="space-y-3 text-sm text-[#8A9199]">
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-[#F2EFE8] transition-colors">이용약관</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#8A9199] text-xs">© 2025 ClassIn Inc. All rights reserved.</p>
                    <p className="text-[#8A9199] text-xs">상하이교통대 · 복단대 · 우한대 · 중산대 · +30개 대학 신뢰</p>
                </div>
            </div>
        </footer>
    )
}
