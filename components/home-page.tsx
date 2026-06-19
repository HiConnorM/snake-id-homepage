import { FloatingNav } from '@/components/floating-nav'
import {
  SnakeHomepageLayout,
  SnakeDivider,
} from '@/components/snake/snake-homepage-layout'
import { HeroSection } from '@/components/sections/hero-section'
import { QuickPathSection } from '@/components/sections/quick-path-section'
import { LouisianaSceneSection } from '@/components/sections/louisiana-scene-section'
import { WhatWeDoSection } from '@/components/sections/what-we-do-section'
import { FoundSnakeSection } from '@/components/sections/found-snake-section'
import { SnakeSchoolSection } from '@/components/sections/snake-school-section'
import { FieldGuideSection } from '@/components/sections/field-guide-section'
import { MissionSection } from '@/components/sections/mission-section'
import { FoundationSection } from '@/components/sections/foundation-section'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { Footer } from '@/components/sections/footer'

export function HomePage() {
  return (
    <main className="relative w-full overflow-hidden bg-paper-texture">
      <FloatingNav />

      {/* Decorative snake art layer (absolute, behind content) */}
      <SnakeHomepageLayout />

      {/* Content layer — sits above the snake so nothing is hidden */}
      <div className="relative z-20">
        <HeroSection />
        <QuickPathSection />
        <SnakeDivider />
        <LouisianaSceneSection />
        <WhatWeDoSection />
        <SnakeDivider flip />
        <FoundSnakeSection />
        <SnakeSchoolSection />
        <SnakeDivider />
        <FieldGuideSection />
        <MissionSection />
        <SnakeDivider flip />
        <FoundationSection />
        <NewsletterSection />
      </div>

      <Footer />
    </main>
  )
}
