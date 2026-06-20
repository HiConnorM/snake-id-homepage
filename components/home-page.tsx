'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, AlertCircle, GraduationCap, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

/* ─────────────────────────────────────────────────────────────────
   DEFINITIVE WHITE-SPACE MAP  (verified by directly viewing each image)
   ─────────────────────────────────────────────────────────────────
   HEAD  1969×1596  Snake right-side, neck sweeps upper-right → left.
                    White: LEFT 30%, full height.     Content: LEFT.

   S-2   2549×762   S-wave sweeps lower-left → upper-right.
                    White: TOP-RIGHT triangle (x>55%, y<45%).
                    Content: TOP-RIGHT.

   S-3   2549×1037  C-curve fully on LEFT.
                    White: RIGHT 45%, all height.     Content: RIGHT centred.

   S-4   2549×1037  Double-S. Inner pocket between arcs.
                    White: centre-left, lower half.   Content: LEFT bottom.

   S-5   2589×1037  Reverse-C on LEFT. RIGHT 55% entirely clear.
                    Content: RIGHT centred.

   S-6   2589×1253  Diagonal arc top-left → bottom-right.
                    White: TOP-RIGHT (x>52%, y<38%).  Content: RIGHT top.

   S-7   2589×1037  Tail top-right → bottom-left.
                    White: LEFT 45%, top 55%.         Content: LEFT top.
   ───────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-moss">
      {children}
    </p>
  )
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cypress px-8 py-3.5 text-[0.9rem] font-semibold text-field-guide shadow-sm transition-all hover:bg-bayou-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-cypress/40 px-8 py-3.5 text-[0.9rem] font-semibold text-cypress transition-all hover:border-cypress hover:bg-cypress/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-cypress underline-offset-4 transition-colors hover:text-copper focus-visible:outline-none"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  )
}

const PATHS = [
  { icon: AlertCircle,   label: 'I Found a Snake',        href: '/identify' },
  { icon: GraduationCap, label: 'Book an Education Show', href: '/shows' },
  { icon: BookOpen,      label: 'Learn About Snakes',      href: '/louisiana-snakes' },
  { icon: ShieldCheck,   label: 'Support Our Mission',     href: '/donate' },
]

function SnakeRow({
  src, widthPx, heightPx, children,
}: {
  src: string; widthPx: number; heightPx: number; children?: React.ReactNode
}) {
  const pct = (heightPx / widthPx) * 100
  return (
    <div className="relative w-full" style={{ paddingBottom: `${pct.toFixed(4)}%` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt="" aria-hidden="true" draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        style={{ mixBlendMode: 'multiply' }}
      />
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  )
}

export function HomePage() {
  const reduce = useReducedMotion()
  const ease = [0.22, 0.61, 0.36, 1] as const

  return (
    <>
      <FloatingNav />
      <main className="w-full overflow-x-hidden bg-background">

        {/* ════════════════════════════════════════════════════════
            HERO — head 1969×1596 → 81.06% aspect at 100vw
            Snake on RIGHT side. White space: LEFT ~30%.
            Content: LEFT, vertically centred, max 27vw.
        ════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-heading"
          className="relative w-full"
          style={{ paddingBottom: '81.0564%' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/snake/snake-head-neck.jpg"
            alt="" aria-hidden="true" draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            style={{ mixBlendMode: 'multiply' }}
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-center" style={{ padding: '14% 0 10% 5vw' }}>
            <div style={{ width: '22vw', minWidth: 240 }}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <Eyebrow>We help. We teach. We conserve.</Eyebrow>
              </motion.div>
              <h1
                id="hero-heading"
                className="mt-5 font-serif font-semibold leading-[0.92] tracking-tight text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4vw,4.6rem)' }}
              >
                {['Inspiring', 'coexistence.'].map((line, i) => (
                  <motion.span key={line} className="block"
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.13 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="mt-6 text-[1rem] leading-relaxed text-cypress-text/60"
                style={{ maxWidth: '26ch' }}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.42 }}
              >
                We identify snakes, provide education, and promote conservation
                across Louisiana and beyond.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col items-start gap-3"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease, delay: 0.56 }}
              >
                <PrimaryBtn href="/identify">Get Help Now</PrimaryBtn>
                <OutlineBtn href="/shows">Book a Show</OutlineBtn>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            S-2 — 2549×762 → 29.89%
            S-wave: lower-left → upper-right.
            White: TOP-RIGHT triangle (above the wave's upper edge).
            Content: TOP-RIGHT, pt~5%.
        ════════════════════════════════════════════════════════ */}
        {/* S-2 snake image — no content inside, snake band fills the full frame */}
        <SnakeRow src="/images/snake/section-2.jpg" widthPx={2549} heightPx={762} />

        {/* "What brings you here?" lives BETWEEN S-2 and S-3 in normal flow —
            completely outside the snake images so it never overlaps */}
        <section
          aria-labelledby="paths-heading"
          className="w-full px-[6vw] py-16"
        >
          <h2
            id="paths-heading"
            className="font-serif font-semibold leading-[0.93] text-cypress-text"
            style={{ fontSize: 'clamp(2.6rem,4vw,4.6rem)' }}
          >
            What brings<br />you here?
          </h2>
          <ul className="mt-8 flex flex-wrap gap-6">
            {PATHS.map((p) => {
              const Icon = p.icon
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group flex flex-col items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cypress/20 bg-field-guide text-cypress shadow-sm transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="max-w-[9ch] text-center text-[0.72rem] font-semibold leading-snug text-cypress-text/70">
                      {p.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ════════════════════════════════════════════════════════
            S-3 — 2549×1037 → 40.68%
            C-curve fully on LEFT. RIGHT side entirely clear.
            Content: RIGHT, vertically centred.
        ════════════════════════════════════════════════════════ */}
        {/* S-3: C-curve on LEFT, right side open */}
        <SnakeRow src="/images/snake/section-3.jpg" widthPx={2549} heightPx={1037}>
          <section
            aria-labelledby="what-we-do-heading"
            className="flex h-full flex-col items-end justify-center"
            style={{ paddingRight: '5vw' }}
          >
            <div style={{ width: '34vw', minWidth: 260 }}>
              <Eyebrow>—</Eyebrow>
              <h2
                id="what-we-do-heading"
                className="mt-5 font-serif font-semibold leading-[0.93] text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4.6vw,5.2rem)' }}
              >
                What we do
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-cypress-text/60" style={{ maxWidth: '34ch' }}>
                From snake identification to wildlife education, we&apos;re here to
                help humans and wildlife thrive together.
              </p>
              <div className="mt-8">
                <GhostLink href="/services">Explore Services</GhostLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* S-4: large arch — top-left open before arch rises */}
        <SnakeRow src="/images/snake/section-4.jpg" widthPx={2549} heightPx={1037}>
          <section
            aria-labelledby="school-heading"
            className="flex h-full flex-col justify-start"
            style={{ padding: '6% 0 0 5vw' }}
          >
            <div style={{ width: '28vw', minWidth: 230 }}>
              <Eyebrow>Snake School</Eyebrow>
              <h2
                id="school-heading"
                className="mt-5 font-serif font-semibold leading-[0.93] text-cypress-text"
                style={{ fontSize: 'clamp(2.6rem,4.2vw,4.8rem)' }}
              >
                Where curiosity<br />takes the lead.
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-cypress-text/60" style={{ maxWidth: '28ch' }}>
                Interactive lessons, games, and challenges for young wildlife explorers.
              </p>
              <div className="mt-8">
                <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* S-5: reverse-C on left, top-right is open */}
        <SnakeRow src="/images/snake/section-5.jpg" widthPx={2589} heightPx={1037}>
          <section
            aria-labelledby="field-guide-heading"
            className="flex h-full flex-col items-end justify-start"
            style={{ padding: '6% 5vw 0 0' }}
          >
            <div style={{ width: '34vw', minWidth: 260 }}>
              <Eyebrow>Snakes of Louisiana</Eyebrow>
              <h2
                id="field-guide-heading"
                className="mt-5 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2.4rem,3.8vw,4.4rem)' }}
              >
                Discover.<br />Learn.<br />Respect.
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-cypress-text/60" style={{ maxWidth: '32ch' }}>
                Browse our field guide to learn about local species and their
                role in our ecosystem.
              </p>
              <div className="mt-8">
                <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ═══════════════════�����════════════════════════════════════
            S-6 — 2589×1253 → 48.40%
            Diagonal arc top-left → bottom-right.
            White: TOP-RIGHT (x>52%, y<38%).
            Content: RIGHT, top-aligned, pt~5%.
        ════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-6.jpg" widthPx={2589} heightPx={1253}>
          <section
            aria-labelledby="mission-heading"
            className="flex h-full flex-col justify-start"
            style={{ padding: '6% 0 0 5vw' }}
          >
            {/* TOP-LEFT: S-loop body leaves upper-left open in this section */}
            <div style={{ width: '28vw', minWidth: 240 }}>
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="mt-5 font-serif font-semibold leading-[0.93] text-cypress-text"
                style={{ fontSize: 'clamp(2.4rem,3.8vw,4.4rem)' }}
              >
                Protect today,<br />inspire tomorrow.
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-cypress-text/60" style={{ maxWidth: '32ch' }}>
                We&apos;re building a future where knowledge leads to impact and
                every species has a place.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <GhostLink href="/about">Learn More</GhostLink>
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-cypress/20 shadow-md">
                  <Image
                    src="/images/louisiana/marsh.png"
                    alt="A white Louisiana iris wildflower" fill sizes="56px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ════════════════════════════════════════════════════════
            S-7 — 2589×1037 → 40.05% — TAIL
            Tail: top-right → bottom-left.
            White: LEFT 45%, top 55%.
            Content: LEFT, top-aligned, pt~7%.
        ════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-7-tail.jpg" widthPx={2589} heightPx={1037}>
          <section
            aria-labelledby="newsletter-heading"
            className="flex h-full flex-col justify-start"
            style={{ padding: '7% 0 0 5vw' }}
          >
            <div style={{ width: '34vw', minWidth: 260 }}>
              <h2
                id="newsletter-heading"
                className="font-serif font-semibold leading-[0.93] text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4.6vw,5.2rem)' }}
              >
                Stay connected
              </h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-cypress-text/55" style={{ maxWidth: '32ch' }}>
                Updates, event info, and snake stories.
              </p>
              <form
                className="mt-8 flex gap-2"
                style={{ maxWidth: 400 }}
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter sign-up"
              >
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email" type="email" placeholder="Email address"
                  className="min-w-0 flex-1 rounded-full border border-cypress/20 bg-background/90 px-5 py-3.5 text-[0.88rem] text-cypress-text placeholder:text-cypress-text/35 focus:border-cypress focus:outline-none focus:ring-1 focus:ring-cypress"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cypress px-6 py-3.5 text-[0.88rem] font-semibold text-field-guide transition-colors hover:bg-bayou-night"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </SnakeRow>

      </main>
      <Footer />
    </>
  )
}
