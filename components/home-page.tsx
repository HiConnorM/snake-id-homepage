'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera, BookOpen, Gamepad2, Route, AlertCircle, GraduationCap, ShieldCheck, Leaf, Search } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

const HEAD = '/images/snake/snake-head-neck.jpg'
const BODY = '/images/snake/snake-body.jpg'

/* ── Primitives ─────────────────────────────────────────────────── */

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.18em] text-moss ${className}`}>
      {children}
    </p>
  )
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cypress px-7 py-3 text-sm font-semibold text-field-guide shadow-sm transition-all hover:bg-bayou-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-cypress/40 bg-transparent px-7 py-3 text-sm font-semibold text-cypress transition-all hover:border-cypress hover:bg-cypress/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cypress underline-offset-4 transition-colors hover:text-copper focus-visible:outline-none"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  )
}

/* ── Quick-path icons ───────────────────────────────────────────── */
const PATHS = [
  { icon: AlertCircle, label: 'I Found a Snake', href: '/identify' },
  { icon: GraduationCap, label: 'Book an Education Show', href: '/shows' },
  { icon: BookOpen, label: 'Learn About Snakes', href: '/louisiana-snakes' },
  { icon: ShieldCheck, label: 'Support Our Mission', href: '/donate' },
]

/* ── Main page ──────────────────────────────────────────────────── */
export function HomePage() {
  const reduce = useReducedMotion()
  const ease = [0.21, 0.6, 0.35, 1] as const

  return (
    <>
      <FloatingNav />

      {/*
        ROOT — position:relative so the two snake images can be
        position:absolute inside it. The content grid rows stack
        naturally and the page gets as tall as the content, making
        the snake appear to wind through the whole thing.
      */}
      <main className="relative w-full overflow-hidden bg-background">

        {/* ── SNAKE HEAD ──────────────────────────────────────────
            Plain <img> tag — no Next.js wrapper divs, no stacking
            context shenanigans. mix-blend-mode:multiply blends the
            white studio bg against the ivory page background directly.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HEAD}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute z-0 select-none"
          style={{
            right: '-2%',
            top: 0,
            width: '40vw',
            maxWidth: 640,
            mixBlendMode: 'multiply',
          }}
        />

        {/* ── SNAKE BODY ──────────────────────────────────────────
            Single image spanning the full page height. At 76vw wide
            and aspect ratio 2897:6311 (≈0.459), height ≈ 76/0.459 ≈ 165vw.
            The page content is ~240vw tall, so we start at top:4% and
            the body fills about 70% of the content area — covering hero
            through mission. Anchored so its horizontal centre sits at
            ~68% from the left, leaving clear left and right text lanes.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BODY}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute z-0 select-none"
          style={{
            left: '28%',
            top: '3%',
            width: '76vw',
            mixBlendMode: 'multiply',
          }}
        />

        {/* ── CONTENT ROWS ─────────────────────────────────────────
            Each row uses a 3-col grid: [left-pad | content | right-pad]
            Left-side content occupies col 1 (≈40% wide).
            Right-side content occupies col 3 (≈40% wide).
            Col 2 is the snake spine — left deliberately empty.
            All content has z-10 so it renders above the z-0 snake.
        */}

        {/* ── ROW 1: HERO (left side, top of page) ─────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 sm:px-10 sm:pt-40 lg:pt-44"
        >
          <div className="w-full max-w-[400px] lg:max-w-[38%]">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <Eyebrow>We help. We teach. We conserve.</Eyebrow>
            </motion.div>

            <h1
              id="hero-heading"
              className="mt-5 font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-cypress-text text-balance"
            >
              {['Inspiring', 'coexistence.'].map((word, i) => (
                <motion.span
                  key={word}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.15 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-[360px] text-base leading-relaxed text-cypress-text/70"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              We identify snakes, provide education, and promote conservation
              across Louisiana and beyond.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-start gap-3"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.56 }}
            >
              <PrimaryBtn href="/identify">Get Help Now</PrimaryBtn>
              <OutlineBtn href="/shows">Book a Show</OutlineBtn>
            </motion.div>
          </div>
        </section>

        {/* ── ROW 2: WHAT BRINGS YOU HERE (left side) ──────────── */}
        <section
          aria-labelledby="paths-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-28"
        >
          <div className="w-full max-w-[400px] lg:max-w-[40%]">
          <p className="text-xs text-moss">—</p>
          <h2
            id="paths-heading"
            className="mt-4 font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold text-cypress-text"
          >
            What brings<br />you here?
          </h2>
          <ul className="mt-10 flex flex-wrap gap-6 sm:gap-8">
            {PATHS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.li
                  key={p.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={p.href}
                    className="group flex flex-col items-center gap-2 rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cypress/20 bg-background text-cypress transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="max-w-[10ch] text-center text-xs font-semibold leading-tight text-cypress-text">
                      {p.label}
                    </span>
                  </Link>
                </motion.li>
              )
            })}
          </ul>
          </div>
        </section>

        {/* ── ROW 3: WHAT WE DO (right side, beside the snake mid-body) */}
        <section
          aria-labelledby="scene-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-32"
        >
          <div className="ml-auto w-[44%]">
            <p className="text-xs text-moss">—</p>
            <h2
              id="scene-heading"
              className="mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-tight text-cypress-text text-balance"
            >
              What we do
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cypress-text/70">
              From snake identification to wildlife education, we&apos;re here to help
              humans and wildlife thrive together.
            </p>
            <div className="mt-5">
              <GhostLink href="/services">Explore Services</GhostLink>
            </div>
          </div>
        </section>

        {/* ── ROW 4: SNAKE SCHOOL (left side) ──────────────────── */}
        <section
          aria-labelledby="school-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-36"
        >
          <div className="w-[44%]">
            <Eyebrow>Snake School</Eyebrow>
            <h2
              id="school-heading"
              className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
            >
              Where curiosity<br />takes the lead.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cypress-text/70">
              Interactive lessons, games, and challenges for young wildlife explorers.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
            </div>
            <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-cypress/20 bg-background/60 text-cypress">
              <Gamepad2 className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── ROW 5: SNAKES OF LOUISIANA + circle photo (right side) */}
        <section
          aria-labelledby="field-guide-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-36"
        >
          <div className="ml-auto flex w-[44%] items-center gap-6">
            <div className="flex-1">
              <Eyebrow>Snakes of Louisiana</Eyebrow>
              <h2
                id="field-guide-heading"
                className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
              >
                Discover. Learn.<br />Respect.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cypress-text/70">
                Browse our field guide to learn about local species and their role
                in our ecosystem.
              </p>
              <div className="mt-6">
                <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
              </div>
            </div>
            <div className="hidden shrink-0 sm:block">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-cypress/20 shadow-lg">
                <Image
                  src="/images/snakes/native-snake-1.png"
                  alt="A native Louisiana rat snake coiled on a mossy log"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ROW 6: MISSION + flower circle (left side) ────────── */}
        <section
          aria-labelledby="mission-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 md:py-36"
        >
          <div className="flex w-[44%] items-center gap-6">
            <div className="flex-1">
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
              >
                Protect today,<br />inspire tomorrow.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cypress-text/70">
                We&apos;re building a future where knowledge tools to impact and every
                species has a place.
              </p>
              <div className="mt-6">
                <GhostLink href="/about">Learn More</GhostLink>
              </div>
            </div>
            <div className="hidden shrink-0 sm:block">
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-cypress/20 shadow-lg">
                <Image
                  src="/images/louisiana/marsh.png"
                  alt="A white Louisiana iris wildflower in a green wetland"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ROW 7: NEWSLETTER ─────────────────────────────────── */}
        <section
          aria-labelledby="newsletter-heading"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-8 sm:px-10"
        >
          <div className="w-[44%]">
            <h2
              id="newsletter-heading"
              className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold text-cypress-text"
            >
              Stay connected
            </h2>
            <p className="mt-2 text-sm text-cypress-text/60">
              Updates, event info, and snake stories.
            </p>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter sign-up"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-cypress-text placeholder:text-cypress-text/40 focus:outline-none focus:ring-2 focus:ring-cypress"
              />
              <button
                type="submit"
                className="rounded-full bg-cypress px-6 py-3 text-sm font-semibold text-field-guide transition-colors hover:bg-bayou-night"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
