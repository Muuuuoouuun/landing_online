import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ClassIn | AI 기반 온라인 교실 플랫폼",
  description: "학생이 집중하고 선생님이 통제하는 AI 클래스룸. 기술 장벽 없이, 수업 완주율부터 달라집니다.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="bg-black font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
