'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, AlertCircle, GraduationCap, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

/* ─────────────────────────────────────────────────────────────────
   ARCHITECTURE
   ─────────────────────────────────────────────────────────────────
   Every page "row" is a <section> with position:relative.
   The snake image for that row sits absolute inset-0 w-full h-full
   object-cover with mix-blend-mode:multiply so the white studio
   background vanishes against the ivory page.
   Content sits in whichever corner / side the snake does NOT occupy,
   using absolute positioning — never on top of the snake.

   Image natural sizes (all sliced at full viewport width):
     head      1969 × 1596  → used at ~42vw wide (top-right corner)
     section-2 2549 × 762   → 100vw wide → height = 29.9vw
     section-3 2549 × 1037  → 100vw wide → height = 40.7vw
     section-4 2549 × 1037  → 100vw wide → height = 40.7vw
     section-5 2589 × 1037  → 100vw wide → height = 40.0vw
     section-6 2589 × 1253  → 100vw wide → height = 48.4vw
     section-7 2589 × 1037  → 100vw wide → height = 40.0vw
   ───────────────────────────────────────────────────────────────── */

/* ── Primitives ─────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">
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

const PATHS = [
  { icon: AlertCircle,    label: 'I Found a Snake',        href: '/identify' },
  { icon: GraduationCap, label: 'Book an Education Show',  href: '/shows' },
  { icon: BookOpen,       label: 'Learn About Snakes',      href: '/louisiana-snakes' },
  { icon: ShieldCheck,    label: 'Support Our Mission',     href: '/donate' },
]

/* ── SnakeRow helper ─────────────────────────────────────────────
   Renders a full-width row whose intrinsic height exactly matches
   the snake image's natural aspect ratio so the image fills 100%
   without any scaling distortion or gap. */
function SnakeRow({
  src,
  alt,
  widthPx,
  heightPx,
  children,
  className = '',
}: {
  src: string
  alt: string
  widthPx: number
  heightPx: number
  children?: React.ReactNode
  className?: string
}) {
  // padding-bottom trick: height = width × (h/w) expressed as a percentage
  const aspectPct = (heightPx / widthPx) * 100

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${aspectPct}%` }}
    >
      {/* Snake image — fills the row exactly, blend removes white bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Content slot — absolutely positioned, z-10 */}
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}
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
            Snake: head image, positioned top-right ~42vw wide.
            Content: left side, vertically centred in the tall hero.
            The head enters from top-right and its neck sweeps down
            and to the left — so content lives on the LEFT.
            We give this section a fixed tall height (not image-driven)
            so the hero text has breathing room above the head.
        ══════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-heading"
          className="relative w-full"
          style={{ minHeight: '100svh' }}
        >
          {/* Head image — top-right, no transforms */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/snake/snake-head-neck.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute right-0 top-0 select-none"
            style={{
              width: '42vw',
              maxWidth: 700,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Hero content — left side, clear of the snake */}
          <div className="relative z-10 flex h-full min-h-[100svh] flex-col justify-center px-10 pb-20 pt-36 sm:px-16 lg:px-24">
            <div className="max-w-[420px]">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Eyebrow>We help. We teach. We conserve.</Eyebrow>
              </motion.div>

              <h1
                id="hero-heading"
                className="mt-5 font-serif text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-cypress-text text-balance"
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
                className="mt-6 text-base leading-relaxed text-cypress-text/70"
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
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — "WHAT BRINGS YOU HERE?" + snake body sec 2
            Image: wide horizontal sweep, snake travels LEFT → RIGHT
            across the full width, curving up toward top-right.
            The snake occupies the centre-to-right of the image.
            Content: LEFT side, top half of the row.
            2549 × 762 → aspectPct = 29.9%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-2.jpg"
          widthPx={2549}
          heightPx={762}
          alt=""
        >
          <section
            aria-labelledby="paths-heading"
            className="flex h-full flex-col justify-start px-10 pb-4 pt-6 sm:px-16 lg:px-24"
          >
            <div className="max-w-[36%]">
              <p className="text-xs text-moss">—</p>
              <h2
                id="paths-heading"
                className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-semibold text-cypress-text"
              >
                What brings<br />you here?
              </h2>
              <ul className="mt-6 flex flex-wrap gap-5">
                {PATHS.map((p) => {
                  const Icon = p.icon
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="group flex flex-col items-center gap-2 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cypress/20 bg-background text-cypress transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="max-w-[9ch] text-center text-[0.65rem] font-semibold leading-tight text-cypress-text">
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
            SECTION 3 — "WHAT WE DO" + snake body sec 3
            Image: large C/U curve. Body enters top-LEFT, arcs down
            the LEFT side and curves rightward at the bottom, exits
            bottom-RIGHT. The left portion is fully occupied by snake.
            Content: RIGHT side, vertically centred.
            2549 × 1037 → aspectPct = 40.7%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-3.jpg"
          widthPx={2549}
          heightPx={1037}
          alt=""
        >
          <section
            aria-labelledby="what-we-do-heading"
            className="flex h-full items-center justify-end px-10 sm:px-16 lg:px-24"
          >
            <div className="max-w-[38%]">
              <p className="text-xs text-moss">—</p>
              <h2
                id="what-we-do-heading"
                className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.6rem)] font-semibold text-cypress-text"
              >
                What we do
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cypress-text/70">
                From snake identification to wildlife education, we&apos;re here to
                help humans and wildlife thrive together.
              </p>
              <div className="mt-5">
                <GhostLink href="/services">Explore Services</GhostLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — "SNAKE SCHOOL" + snake body sec 4
            Image: S-curve. Enters bottom-LEFT going up-right, loops
            over top-centre, drops back down-right. Snake occupies
            LEFT + centre; the top-right and bottom-left have open
            white space.
            Content: LEFT side aligned to top, clear of the snake arc.
            2549 × 1037 → aspectPct = 40.7%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-4.jpg"
          widthPx={2549}
          heightPx={1037}
          alt=""
        >
          <section
            aria-labelledby="school-heading"
            className="flex h-full flex-col justify-end px-10 pb-8 sm:px-16 lg:px-24"
          >
            <div className="max-w-[38%]">
              <Eyebrow>Snake School</Eyebrow>
              <h2
                id="school-heading"
                className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
              >
                Where curiosity<br />takes the lead.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cypress-text/70">
                Interactive lessons, games, and challenges for young wildlife explorers.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
              </div>
              <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-cypress/20 bg-background/80 text-cypress">
                <Gamepad2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — "DISCOVER. LEARN. RESPECT." + snake sec 5
            Image: reverse-C. Body enters top-LEFT, sweeps down LEFT
            side, curves right along bottom, exits bottom-RIGHT.
            The RIGHT side (upper-right) has the largest open space.
            Content: RIGHT side.
            2589 × 1037 → aspectPct = 40.0%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-5.jpg"
          widthPx={2589}
          heightPx={1037}
          alt=""
        >
          <section
            aria-labelledby="field-guide-heading"
            className="flex h-full items-end justify-end px-10 pb-10 sm:px-16 lg:px-24"
          >
            <div className="flex max-w-[38%] items-center gap-5">
              <div className="flex-1">
                <Eyebrow>Snakes of Louisiana</Eyebrow>
                <h2
                  id="field-guide-heading"
                  className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
                >
                  Discover.<br />Learn.<br />Respect.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cypress-text/70">
                  Browse our field guide to learn about local species and their
                  role in our ecosystem.
                </p>
                <div className="mt-5">
                  <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
                </div>
              </div>
              <div className="hidden shrink-0 xl:block">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-cypress/20 shadow-lg">
                  <Image
                    src="/images/snakes/native-snake-1.png"
                    alt="A native Louisiana snake coiled on a mossy log"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — "PROTECT TODAY" + snake sec 6
            Image: S-curve. Enters top-LEFT going right, curves back
            left near top-centre, sweeps down-LEFT, arcs right at
            bottom. Open white space is on the LEFT side middle.
            Content: LEFT side, vertically centred.
            2589 × 1253 → aspectPct = 48.4%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-6.jpg"
          widthPx={2589}
          heightPx={1253}
          alt=""
        >
          <section
            aria-labelledby="mission-heading"
            className="flex h-full items-end px-10 pb-10 sm:px-16 lg:px-24"
          >
            <div className="flex max-w-[38%] items-center gap-5">
              <div className="flex-1">
                <Eyebrow>Our Mission</Eyebrow>
                <h2
                  id="mission-heading"
                  className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.06] text-cypress-text text-balance"
                >
                  Protect today,<br />inspire tomorrow.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cypress-text/70">
                  We&apos;re building a future where knowledge tools to impact and every
                  species has a place.
                </p>
                <div className="mt-5">
                  <GhostLink href="/about">Learn More</GhostLink>
                </div>
              </div>
              <div className="hidden shrink-0 xl:block">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-cypress/20 shadow-lg">
                  <Image
                    src="/images/louisiana/marsh.png"
                    alt="A white Louisiana iris wildflower"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════════
            SECTION 7 — NEWSLETTER + snake tail sec 7
            Image: tail. Enters top-RIGHT curving down-LEFT, tapers
            to a fine point bottom-LEFT. Open space is on the LEFT.
            Content: LEFT side, vertically centred.
            2589 × 1037 → aspectPct = 40.0%
        ══════════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/section-7-tail.jpg"
          widthPx={2589}
          heightPx={1037}
          alt=""
        >
          <section
            aria-labelledby="newsletter-heading"
            className="flex h-full items-center px-10 sm:px-16 lg:px-24"
          >
            <div className="max-w-[36%]">
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
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-cypress-text placeholder:text-cypress-text/40 focus:outline-none focus:ring-2 focus:ring-cypress"
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
