import { Hero } from "@/components/sections/Hero"
import TrustLogos from "@/components/sections/TrustLogos"
import { ProblemCost } from "@/components/sections/ProblemCost"
import { BridgeMoment } from "@/components/sections/BridgeMoment"
import { LeakPoints } from "@/components/sections/LeakPoints"
import { SolutionFlow } from "@/components/sections/SolutionFlow"
import LiveClassroomShowcase from "@/components/sections/LiveClassroomShowcase"
import FirstFiveMinutes from "@/components/sections/FirstFiveMinutes"
import StakeholderValue from "@/components/sections/StakeholderValue"
import { KeyUseCases } from "@/components/sections/KeyUseCases"
import { ScienceBased } from "@/components/sections/ScienceBased"
import { SatisfyingClass } from "@/components/sections/SatisfyingClass"
import { DashboardPreview } from "@/components/sections/DashboardPreview"
import StatsBanner from "@/components/sections/StatsBanner"
import { CaseStudies } from "@/components/sections/CaseStudies"
import Testimonials from "@/components/sections/Testimonials"
import { Outcomes } from "@/components/sections/Outcomes"
import { Comparison } from "@/components/sections/Comparison"
import DiagnosisPreview from "@/components/sections/DiagnosisPreview"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"

export default function LandingPage() {
  return (
    <main className="bg-[#0B0F14]">
      <Hero />
      <TrustLogos />
      <ProblemCost />
      <BridgeMoment />
      <LeakPoints />
      <SolutionFlow />
      <LiveClassroomShowcase />
      <FirstFiveMinutes />
      <StakeholderValue />
      <KeyUseCases />
      <ScienceBased />
      <SatisfyingClass />
      <DashboardPreview />
      <StatsBanner />
      <CaseStudies />
      <Testimonials />
      <Outcomes />
      <Comparison />
      <DiagnosisPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
