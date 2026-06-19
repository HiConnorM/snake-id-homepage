'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/home'
import { SectionEyebrow, EditorialHeading, OrganicButton } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function WhatWeDoSection() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="what-we-do-heading"
      className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="max-w-xl">
        <Reveal>
          <SectionEyebrow>What we do</SectionEyebrow>
          <EditorialHeading
            id="what-we-do-heading"
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)]"
          >
            Help for people. A second chance for snakes.
          </EditorialHeading>
          <p className="mt-6 text-lg leading-relaxed text-cypress-text/75">
            From quick photo identification to live education, we help Louisiana
            families, schools, and communities respond with confidence instead
            of fear.
          </p>
          <OrganicButton href="/services" variant="ghost" className="mt-5 px-0">
            Explore Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </OrganicButton>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.article
              key={service.title}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="rounded-2xl border border-cypress/12 bg-card/85 p-6 shadow-sm shadow-cypress/5 backdrop-blur-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cypress/10 text-cypress">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-cypress-text">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cypress-text/70">
                {service.description}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
