'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { quickPaths } from '@/data/home'
import { SectionEyebrow } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function QuickPathSection() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="quickpath-heading"
      className="relative mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-8 md:py-28"
    >
      <Reveal className="flex flex-col items-center">
        <SectionEyebrow>Choose your path</SectionEyebrow>
        <h2
          id="quickpath-heading"
          className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight text-cypress-text text-balance"
        >
          What brought you here?
        </h2>
      </Reveal>

      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
        {quickPaths.map((path, i) => {
          const Icon = path.icon
          return (
            <motion.li
              key={path.href}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              className="group"
            >
              <Link
                href={path.href}
                className="flex flex-col items-center gap-3 rounded-2xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cypress/20 bg-field-guide/60 text-cypress transition-all duration-300 group-hover:-translate-y-1 group-hover:border-copper group-hover:bg-copper/10 group-hover:text-copper">
                  <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span className="font-serif text-base font-semibold leading-tight text-cypress-text">
                  {path.title}
                </span>
                <span className="max-w-[14ch] text-xs leading-relaxed text-moss opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70">
                  {path.description}
                </span>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
