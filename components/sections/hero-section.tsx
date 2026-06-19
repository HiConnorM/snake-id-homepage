'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera } from 'lucide-react'
import { SectionEyebrow, EditorialHeading, OrganicButton } from '@/components/primitives'

export function HeroSection() {
  const reduce = useReducedMotion()
  const ease = [0.21, 0.6, 0.35, 1] as const

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-16 sm:px-8 sm:pt-40 md:pb-24 lg:min-h-[92vh]"
    >
      <div className="max-w-2xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <SectionEyebrow tone="copper">Louisiana Snake ID</SectionEyebrow>
        </motion.div>

        <EditorialHeading
          as="h1"
          className="mt-6 text-[clamp(3.25rem,8vw,7rem)]"
        >
          {['Fear less.', 'Know more.', 'Let them live.'].map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.15 + i * 0.12 }}
            >
              {line}
            </motion.span>
          ))}
        </EditorialHeading>

        <motion.p
          className="mt-7 max-w-lg text-lg leading-relaxed text-cypress-text/75"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
        >
          Fast snake identification, humane relocation support, and
          unforgettable wildlife education from a Louisiana family helping
          people and snakes share the same home.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.72 }}
        >
          <OrganicButton href="/identify" variant="primary" className="px-8">
            Identify a Snake
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </OrganicButton>
          <OrganicButton href="/shows" variant="outline" className="px-8">
            Book a Show
          </OrganicButton>
        </motion.div>

        <motion.div
          className="mt-8 max-w-md rounded-2xl border border-cypress/12 bg-field-guide/70 p-4 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.85 }}
        >
          <p className="flex items-start gap-2 text-sm leading-relaxed text-cypress-text/70">
            <Camera className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
            Found one right now? Keep your distance, use your camera’s zoom, and
            send a clear photo.
          </p>
        </motion.div>

        <motion.p
          className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-moss"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          Family-owned • Louisiana-rooted • Education-first
        </motion.p>
      </div>
    </section>
  )
}
