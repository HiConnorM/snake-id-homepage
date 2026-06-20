'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, AlertCircle, GraduationCap, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

/* ─────────────────────────────────────────────────────────────────
   SNAKE SECTION ANALYSIS — white-space map (at 1440px viewport)
   ─────────────────────────────────────────────────────────────────
   head       1969×1596  — used 58vw wide, right-anchored. Head faces
                           lower-left, neck sweeps up-right. Content LEFT.
   section-2  2549×762   — snake sweeps lower-left → upper-right diagonal.
                           White space: TOP-LEFT corner + BOTTOM-RIGHT.
                           Content: TOP-LEFT (below nav, above snake band).
   section-3  2549×1037  — large C-curve on LEFT (enters top-L, exits btm-R).
                           White space: RIGHT side, upper 60%.
                           Content: RIGHT, top-aligned.
   section-4  2549×1037  — S-curve: enters btm-L arcs over top-centre, exits
                           btm-R bottom-right. Snake occupies centre+right.
                           White space: LEFT side top half, RIGHT bottom corner.
                           Content: LEFT, top-aligned.
   section-5  2589×1037  — reverse-C: enters top-L, sweeps down-L, curves R
                           along bottom. White space: UPPER-RIGHT open area.
                           Content: RIGHT, top-aligned.
   section-6  2589×1253  — double S-loop. Snake top-centre → arcs right →
                           down-left → curves right again at bottom.
                           White space: LOWER-LEFT quadrant.
                           Content: LEFT, bottom-aligned.
   section-7  2589×1037  — tail enters top-RIGHT curves down-LEFT, tapers.
                           White space: LEFT side, top-to-mid.
                           Content: LEFT, top-aligned.
   ───────────────────────────────────────────────────────────────── */

/* ── Primitives ─────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-moss">
      {children}
    </p>
  )
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cypress px-7 py-3.5 text-sm font-semibold text-field-guide shadow-sm transition-all hover:bg-bayou-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-cypress/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-cypress transition-all hover:border-cypress hover:bg-cypress/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
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

const PATHS = [
  { icon: AlertCircle,   label: 'I Found a Snake',       href: '/identify' },
  { icon: GraduationCap, label: 'Book an Education Show', href: '/shows' },
  { icon: BookOpen,      label: 'Learn About Snakes',     href: '/louisiana-snakes' },
  { icon: ShieldCheck,   label: 'Support Our Mission',    href: '/donate' },
]

/* ── SnakeRow ────────────────────────────────────────────────────
   Full-width row whose intrinsic height is locked to the image's
   natural aspect ratio via the padding-bottom trick. The snake
   image fills inset-0; content is absolutely positioned inside. */
function SnakeRow({
  src, widthPx, heightPx, children, className = '',
}: {
  src: string; widthPx: number; heightPx: number
  children?: React.ReactNode; className?: string
}) {
  const aspectPct = (heightPx / widthPx) * 100
  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: `${aspectPct}%` }}>
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

/* ── Main page ──────────────────────────────────────────────────── */
export function HomePage() {
  const reduce = useReducedMotion()
  const ease = [0.21, 0.6, 0.35, 1] as const

  return (
    <>
      <FloatingNav />
      <main className="w-full overflow-x-hidden bg-background">

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — HERO
            Head image: 1969×1596, right-anchored at 58vw wide.
            At 1440px: width=835px, height=835×(1596/1969)=677px.
            The neck sweeps from upper-right down to lower-left;
            the snake body (section-2) will enter from lower-left.
            Content lives on the LEFT, top-third of viewport.
            Hero height = 95vh to give breathing room.
        ══════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-heading"
          className="relative w-full"
          style={{ minHeight: '95svh' }}
        >
          {/* Head — right edge, flush to top, large enough to match body width */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/snake/snake-head-neck.jpg"
            alt="" aria-hidden="true" draggable={false}
            className="pointer-events-none absolute right-0 top-0 select-none"
            style={{ width: '58vw', mixBlendMode: 'multiply' }}
          />

          {/* Hero content — LEFT side, stays clear of the 58vw head on the right */}
          <div className="relative z-10 flex h-full min-h-[95svh] flex-col justify-center px-10 pb-24 pt-40 sm:px-16 lg:px-24">
            <div className="max-w-[38vw]">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Eyebrow>We help. We teach. We conserve.</Eyebrow>
              </motion.div>

              <h1
                id="hero-heading"
                className="mt-5 font-serif text-[clamp(3.5rem,6vw,6rem)] font-semibold leading-[1.0] tracking-tight text-cypress-text text-balance"
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
                className="mt-6 max-w-[34ch] text-base leading-relaxed text-cypress-text/65"
                initial={reduce ? false : { opacity: 0, y: 16 }}
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
                transition={{ duration: 0.7, ease, delay: 0.54 }}
              >
                <PrimaryBtn href="/identify">Get Help Now</PrimaryBtn>
                <OutlineBtn href="/shows">Book a Show</OutlineBtn>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — section-2.jpg  2549 × 762  (29.9vw tall)
            Snake: enters bottom-left, sweeps diagonally up to the
            right — a thick band cutting across the full width.
            White space: TOP-LEFT triangle (above the snake band)
                         BOTTOM-RIGHT triangle (below the snake band).
            "What brings you here?" → TOP-LEFT, above the snake band.
            The snake band sits roughly at 50–100% height so we
            position the content at the very TOP of the row.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-2.jpg" widthPx={2549} heightPx={762}>
          <section
            aria-labelledby="paths-heading"
            className="flex h-full flex-col justify-start px-10 pt-[5%] sm:px-16 lg:px-24"
          >
            {/* Content confined to the top-left 38% — above the snake diagonal */}
            <div className="max-w-[38vw]">
              <h2
                id="paths-heading"
                className="font-serif text-[clamp(2.4rem,4vw,3.8rem)] font-semibold leading-[1.0] text-cypress-text"
              >
                What brings<br />you here?
              </h2>
              <ul className="mt-7 flex flex-wrap gap-4">
                {PATHS.map((p) => {
                  const Icon = p.icon
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="group flex flex-col items-center gap-2 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cypress/20 bg-background text-cypress transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="max-w-[9ch] text-center text-[0.65rem] font-semibold leading-tight text-cypress-text/80">
                          {p.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — section-3.jpg  2549 × 1037  (40.7vw tall)
            Snake: large C-curve — enters TOP-LEFT, arcs down the
            entire left side, exits BOTTOM-RIGHT.
            White space: RIGHT side, especially top 60%.
            "What we do" → RIGHT side, top-aligned.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-3.jpg" widthPx={2549} heightPx={1037}>
          <section
            aria-labelledby="what-we-do-heading"
            className="flex h-full flex-col items-end justify-start px-10 pt-[8%] sm:px-16 lg:px-24"
          >
            <div className="max-w-[40vw]">
              <Eyebrow>—</Eyebrow>
              <h2
                id="what-we-do-heading"
                className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.8rem)] font-semibold leading-[1.0] text-cypress-text"
              >
                What we do
              </h2>
              <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-cypress-text/65">
                From snake identification to wildlife education, we&apos;re here to
                help humans and wildlife thrive together.
              </p>
              <div className="mt-7">
                <GhostLink href="/services">Explore Services</GhostLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — section-4.jpg  2549 × 1037  (40.7vw tall)
            Snake: S-curve — enters BOTTOM-LEFT, arcs up and over
            top-centre, drops back down to BOTTOM-RIGHT.
            White space: LEFT side top-half (above the snake's
            incoming arc), and small corner bottom-right.
            "Snake School" → LEFT, top-aligned, above the arc.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-4.jpg" widthPx={2549} heightPx={1037}>
          <section
            aria-labelledby="school-heading"
            className="flex h-full flex-col items-start justify-start px-10 pt-[6%] sm:px-16 lg:px-24"
          >
            <div className="max-w-[38vw]">
              <Eyebrow>Snake School</Eyebrow>
              <h2
                id="school-heading"
                className="mt-4 font-serif text-[clamp(2.6rem,4.5vw,4.2rem)] font-semibold leading-[1.0] text-cypress-text text-balance"
              >
                Where curiosity<br />takes the lead.
              </h2>
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-cypress-text/65">
                Interactive lessons, games, and challenges for young wildlife explorers.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cypress/20 bg-background/90 text-cypress">
                  <Gamepad2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — section-5.jpg  2589 × 1037  (40.0vw tall)
            Snake: reverse-C — enters TOP-LEFT, sweeps DOWN the left
            side, curves RIGHT along the bottom, exits BOTTOM-RIGHT.
            White space: UPPER-RIGHT open area (snake clear of top-right).
            "Discover. Learn. Respect." → RIGHT, top-aligned.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-5.jpg" widthPx={2589} heightPx={1037}>
          <section
            aria-labelledby="field-guide-heading"
            className="flex h-full flex-col items-end justify-start px-10 pt-[5%] sm:px-16 lg:px-24"
          >
            <div className="max-w-[40vw]">
              <Eyebrow>Snakes of Louisiana</Eyebrow>
              <h2
                id="field-guide-heading"
                className="mt-4 font-serif text-[clamp(2.6rem,4.5vw,4.2rem)] font-semibold leading-[1.0] text-cypress-text text-balance"
              >
                Discover.<br />Learn.<br />Respect.
              </h2>
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-cypress-text/65">
                Browse our field guide to learn about local species and their
                role in our ecosystem.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
                <div className="hidden shrink-0 sm:block">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-cypress/25 shadow-md">
                    <Image
                      src="/images/snakes/native-snake-1.png"
                      alt="A native Louisiana snake"
                      fill sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — section-6.jpg  2589 × 1253  (48.4vw tall)
            Snake: double S-loop — thick body fills most of the image,
            but the LOWER-LEFT corner is the clearest open space.
            "Protect today, inspire tomorrow." → LEFT, bottom-aligned.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-6.jpg" widthPx={2589} heightPx={1253}>
          <section
            aria-labelledby="mission-heading"
            className="flex h-full flex-col items-start justify-end px-10 pb-[8%] sm:px-16 lg:px-24"
          >
            <div className="max-w-[38vw]">
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="mt-4 font-serif text-[clamp(2.6rem,4.5vw,4.2rem)] font-semibold leading-[1.0] text-cypress-text text-balance"
              >
                Protect today,<br />inspire tomorrow.
              </h2>
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-cypress-text/65">
                We&apos;re building a future where knowledge leads to impact and
                every species has a place.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <GhostLink href="/about">Learn More</GhostLink>
                <div className="hidden shrink-0 sm:block">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-cypress/25 shadow-md">
                    <Image
                      src="/images/louisiana/marsh.png"
                      alt="A white Louisiana iris wildflower"
                      fill sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 7 — section-7-tail.jpg  2589 × 1037  (40.0vw tall)
            Snake: tail enters TOP-RIGHT, curves down-left, tapers to
            a fine point at BOTTOM-LEFT.
            White space: LEFT side top-to-mid (the open upper-left area
            before the tail curves through).
            "Stay connected" → LEFT, top-aligned.
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-7-tail.jpg" widthPx={2589} heightPx={1037}>
          <section
            aria-labelledby="newsletter-heading"
            className="flex h-full flex-col items-start justify-start px-10 pt-[8%] sm:px-16 lg:px-24"
          >
            <div className="max-w-[38vw]">
              <h2
                id="newsletter-heading"
                className="font-serif text-[clamp(2.4rem,4vw,3.8rem)] font-semibold leading-[1.0] text-cypress-text"
              >
                Stay connected
              </h2>
              <p className="mt-3 text-base text-cypress-text/60">
                Updates, event info, and snake stories.
              </p>
              <form
                className="mt-8 flex max-w-[360px] gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter sign-up"
              >
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 rounded-full border border-cypress/20 bg-background/80 px-5 py-3 text-sm text-cypress-text placeholder:text-cypress-text/40 focus:border-cypress focus:outline-none focus:ring-1 focus:ring-cypress"
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
        </SnakeRow>

      </main>

      <Footer />
    </>
  )
}
