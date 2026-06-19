'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow } from '@/components/primitives'

export function LouisianaSceneSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1])
  const yImg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : ['-6%', '6%'])

  return (
    <section
      aria-labelledby="scene-heading"
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 md:py-20"
    >
      {/* REPLACE: /public/images/louisiana/cypress-swamp.png with a real
          Louisiana swamp / marsh / cypress wetland photo */}
      <div
        ref={ref}
        className="relative aspect-[16/10] w-full overflow-hidden shadow-2xl shadow-cypress/20 sm:aspect-[2/1]"
        style={{
          borderRadius: '38% 42% 44% 40% / 30% 32% 34% 30%',
        }}
      >
        <motion.div style={{ scale, y: yImg }} className="absolute inset-0">
          <Image
            src="/images/louisiana/cypress-swamp.png"
            alt="A misty Louisiana cypress swamp at golden hour, with Spanish moss reflected in still water."
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </motion.div>

        {/* readable overlay for the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-bayou-night/80 via-bayou-night/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:max-w-xl">
          <SectionEyebrow tone="copper" className="text-ochre [&>span]:bg-ochre/60">
            Louisiana Wild
          </SectionEyebrow>
          <h2
            id="scene-heading"
            className="mt-4 font-serif text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.08] text-field-guide text-balance"
          >
            Every snake has a place in the story of Louisiana.
          </h2>
          <a
            href="/louisiana-snakes"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ochre underline-offset-4 transition-colors hover:text-field-guide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-guide"
          >
            Why snakes matter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
