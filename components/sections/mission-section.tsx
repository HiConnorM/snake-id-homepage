'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import {
  SectionEyebrow,
  EditorialHeading,
  OrganicButton,
  OrganicImageFrame,
} from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function MissionSection() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
        <Reveal className="order-2 flex justify-center lg:order-1">
          {/* REPLACE: /public/images/louisiana/marsh.png */}
          <OrganicImageFrame className="aspect-square w-full max-w-sm">
            <Image
              src="/images/louisiana/marsh.png"
              alt="A white Louisiana iris wildflower in a green wetland."
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="object-cover"
            />
          </OrganicImageFrame>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <SectionEyebrow>Our Mission</SectionEyebrow>
          <EditorialHeading
            id="mission-heading"
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)]"
          >
            Protect today. Inspire tomorrow.
          </EditorialHeading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cypress-text/75">
            We believe education can save lives — human and animal. Every
            identification, every show, and every conversation is a chance to
            replace fear with understanding.
          </p>

          <figure className="mt-8 border-l-2 border-copper pl-5">
            <blockquote className="font-serif text-xl italic leading-snug text-cypress-text sm:text-2xl">
              “{siteConfig.philosophy}”
            </blockquote>
          </figure>

          <OrganicButton href="/about" variant="ghost" className="mt-6 px-0">
            Learn Our Story
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </OrganicButton>
        </Reveal>
      </div>
    </section>
  )
}
