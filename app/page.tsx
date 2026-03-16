import { Hero } from "@/components/sections/Hero"
import { ProblemCost } from "@/components/sections/ProblemCost"
import { BridgeMoment } from "@/components/sections/BridgeMoment"
import { KeyUseCases } from "@/components/sections/KeyUseCases"
import { ScienceBased } from "@/components/sections/ScienceBased"
import { SatisfyingClass } from "@/components/sections/SatisfyingClass"
import { DashboardPreview } from "@/components/sections/DashboardPreview"
import { CaseStudies } from "@/components/sections/CaseStudies"
import { Outcomes } from "@/components/sections/Outcomes"
import { Comparison } from "@/components/sections/Comparison"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"

export default function LandingPage() {
  return (
    <main className="bg-black">
      <Hero />
      <ProblemCost />
      <BridgeMoment />
      <KeyUseCases />
      <ScienceBased />
      <SatisfyingClass />
      <DashboardPreview />
      <CaseStudies />
      <Outcomes />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
