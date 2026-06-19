'use client'

import { Info } from 'lucide-react'
import { SectionEyebrow, EditorialHeading, OrganicButton } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function FoundationSection() {
  return (
    <section
      aria-labelledby="foundation-heading"
      className="relative mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 md:py-24"
    >
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-cypress/15 bg-limestone/80 p-8 backdrop-blur-sm sm:p-12">
          <SectionEyebrow tone="copper">Snake Life Foundation</SectionEyebrow>
          <EditorialHeading
            id="foundation-heading"
            className="mt-5 max-w-xl text-[clamp(1.75rem,4vw,2.75rem)]"
          >
            Want to support the bigger mission?
          </EditorialHeading>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cypress-text/75">
            Snake Life Foundation is the separate nonprofit connected to
            education, conservation, and programs like Serpent Squad.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <OrganicButton href="/foundation" variant="primary" className="px-8">
              Visit the Foundation
            </OrganicButton>
            <OrganicButton href="/foundation/serpent-squad" variant="outline">
              Explore Serpent Squad
            </OrganicButton>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-cypress/12 pt-6">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-cypress-text/65">
              Louisiana Snake ID, LLC and Snake Life Foundation are separate
              organizations. Paid services and bookings are provided by
              Louisiana Snake ID, LLC. Donations and nonprofit programs are
              managed by Snake Life Foundation.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
