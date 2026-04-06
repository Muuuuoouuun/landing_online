export function Footer() {
    return (
        <footer className="bg-black py-16 border-t border-[#1A1A1A]">
            <div className="max-w-6xl mx-auto px-8 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
                    <div className="col-span-2 md:col-span-1">
                        <span className="font-black text-white text-xl tracking-tight font-mono block mb-3">CLASS IN</span>
                        <p className="text-[#555] text-sm leading-relaxed">
                            AI 기반 온라인 교실 플랫폼.<br />
                            학생이 집중하고, 선생님이 통제합니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">제품</h4>
                        <ul className="space-y-3 text-sm text-[#555]">
                            <li><a href="#" className="hover:text-white transition-colors">인터랙티브 교실</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">AI 모니터링</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">성과 분석</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">자동화 행정</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">자원</h4>
                        <ul className="space-y-3 text-sm text-[#555]">
                            <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">도입 사례</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">고객 센터</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#BFFF00] text-xs font-mono tracking-widest uppercase mb-4">이용안내</h4>
                        <ul className="space-y-3 text-sm text-[#555]">
                            <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#444] text-xs font-mono">© 2025 ClassIn Inc. All rights reserved.</p>
                    <p className="text-[#444] text-xs font-mono">상하이교통대 · 복단대 · 우한대 · 중산대 · +30개 대학 신뢰</p>
                </div>
            </div>
        </footer>
    )
}
