'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { fieldGuideFilters } from '@/data/home'
import {
  SectionEyebrow,
  EditorialHeading,
  OrganicButton,
  OrganicImageFrame,
} from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function FieldGuideSection() {
  return (
    <section
      aria-labelledby="field-guide-heading"
      className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <SectionEyebrow>Louisiana Snakes</SectionEyebrow>
          <EditorialHeading
            id="field-guide-heading"
            className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)]"
          >
            <span className="block">Discover.</span>
            <span className="block">Learn.</span>
            <span className="block text-copper">Respect.</span>
          </EditorialHeading>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cypress-text/75">
            Explore native species, compare commonly confused snakes, and learn
            what their behavior actually means.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {fieldGuideFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-cypress/20 bg-field-guide/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-cypress-text/70"
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <OrganicButton href="/louisiana-snakes" variant="primary" className="px-8">
              Explore the Guide
            </OrganicButton>
            <OrganicButton href="/louisiana-snakes/compare" variant="ghost">
              Compare Species
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OrganicButton>
          </div>

          <p className="mt-6 max-w-md text-sm italic leading-relaxed text-moss">
            No single color, head shape, or pattern can safely identify every
            snake.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          {/* REPLACE: /public/images/snakes/native-snake-1.png */}
          <OrganicImageFrame className="aspect-square w-full max-w-sm">
            <Image
              src="/images/snakes/native-snake-1.png"
              alt="A harmless native Louisiana rat snake resting on a mossy log."
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="object-cover"
            />
          </OrganicImageFrame>
        </Reveal>
      </div>
    </section>
  )
}
