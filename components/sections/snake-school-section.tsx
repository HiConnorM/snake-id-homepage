'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, Search, Gamepad2, Leaf } from 'lucide-react'
import { snakeSchoolChips } from '@/data/home'
import { SectionEyebrow, EditorialHeading, OrganicButton } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

const floatIcons = [BookOpen, Search, Gamepad2, Leaf]

export function SnakeSchoolSection() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="snake-school-heading"
      className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <SectionEyebrow>Snake School</SectionEyebrow>
          <EditorialHeading
            id="snake-school-heading"
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)]"
          >
            Where curiosity takes the lead.
          </EditorialHeading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cypress-text/75">
            Short lessons, myth-busting games, field-guide challenges, and real
            science for kids, families, educators, and anyone ready to see
            snakes differently.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {snakeSchoolChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-moss/30 bg-moss/10 px-4 py-1.5 text-sm font-medium text-cypress-text/80"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <OrganicButton href="/snake-school" variant="primary" className="px-8">
              Enter Snake School
            </OrganicButton>
            <OrganicButton href="/snake-school/lessons" variant="ghost">
              View Lessons
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </OrganicButton>
          </div>
        </Reveal>

        {/* Playful orbiting icon ring */}
        <Reveal delay={0.15} className="flex justify-center">
          <div className="relative flex h-60 w-60 items-center justify-center rounded-full border border-dashed border-copper/40 sm:h-72 sm:w-72">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-copper/12 text-copper">
              <Gamepad2 className="h-12 w-12" aria-hidden="true" strokeWidth={1.4} />
            </div>
            {floatIcons.map((Icon, i) => {
              const angle = (i / floatIcons.length) * Math.PI * 2
              const r = 118
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-cypress/15 bg-card text-cypress shadow-sm"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px - 24px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px - 24px)`,
                  }}
                  animate={reduce ? undefined : { y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </motion.span>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
