'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Phone, Mail, ArrowRight, ShieldAlert } from 'lucide-react'
import { foundSnakeSteps } from '@/data/home'
import { siteConfig } from '@/data/site'
import { SectionEyebrow, EditorialHeading, OrganicButton } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function FoundSnakeSection() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="found-snake-heading"
      className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <SectionEyebrow tone="copper">First steps</SectionEyebrow>
        <EditorialHeading
          id="found-snake-heading"
          className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]"
        >
          Found a snake? Do this first.
        </EditorialHeading>
      </Reveal>

      {/* Horizontal timeline on desktop, stacked on mobile */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {foundSnakeSteps.map((item, i) => (
          <motion.li
            key={item.step}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            className="relative rounded-2xl border border-cypress/12 bg-card/85 p-5 backdrop-blur-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cypress text-sm font-bold text-[#f4f0e6]">
              {item.step}
            </span>
            <p className="mt-3 font-medium leading-snug text-cypress-text">
              {item.text}
            </p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <OrganicButton href={siteConfig.phoneHref} variant="rust">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Text a Photo
        </OrganicButton>
        <OrganicButton href={siteConfig.emailHref} variant="primary">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email a Photo
        </OrganicButton>
        <OrganicButton href="/identify" variant="outline">
          Open Identification Page
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </OrganicButton>
      </div>

      <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-rust/25 bg-rust/8 p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rust" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-cypress-text/80">
          Do not touch, pin, or try to catch the snake. A clear photo from a
          safe distance is the best first step.
        </p>
      </div>
    </section>
  )
}
