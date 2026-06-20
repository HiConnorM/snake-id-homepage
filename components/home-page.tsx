'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, AlertCircle, GraduationCap, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

/* ─────────────────────────────────────────────────────────────────
   VERIFIED WHITE-SPACE MAP  (confirmed by direct image inspection)

   HEAD  1969×1596  Snake fills right 75%. Clear: LEFT ~28%.
                    → absolute left=5vw top=20% width=22vw

   S-2   2549×762   Diagonal band across the centre — snake is very thick.
                    Clear: TOP-RIGHT corner only, above the snake's upper edge.
                    → absolute right=5vw top=3% width=28vw

   S-3   2549×1037  C-curve fills LEFT. Clear: RIGHT 42%.
                    → absolute right=5vw top=28% width=34vw

   S-4   2549×1037  S-curve. Big open hollow between the two arcs = centre-left.
                    → absolute left=7vw top=34% width=30vw

   S-5   2589×1037  Reverse-C left+top. Big open pocket = LOWER-RIGHT.
                    → absolute right=5vw bottom=5% width=38vw

   S-6   2589×1253  Wide sweeping arc top-left→bottom-right.
                    Clear: BOTTOM-LEFT corner below the arc.
                    → absolute left=5vw bottom=5% width=26vw

   S-7   2589×1037  Tail top-right→bottom-left.
                    Clear: LEFT 42%, top half.
                    → absolute left=5vw top=6% width=34vw
   ───────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-moss">
      {children}
    </p>
  )
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cypress px-7 py-3 text-[0.85rem] font-semibold text-field-guide shadow-sm transition-all hover:bg-bayou-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-cypress/40 px-7 py-3 text-[0.85rem] font-semibold text-cypress transition-all hover:border-cypress hover:bg-cypress/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
    >
      {children}
    </Link>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold tracking-wide text-cypress transition-colors hover:text-copper focus-visible:outline-none"
    >
      {children}
      <ArrowRight className="h-3 w-3" aria-hidden="true" />
    </Link>
  )
}

const PATHS = [
  { icon: AlertCircle,   label: 'I Found\na Snake',     href: '/identify' },
  { icon: GraduationCap, label: 'Book an\nEd Show',     href: '/shows' },
  { icon: BookOpen,      label: 'Learn About\nSnakes',  href: '/louisiana-snakes' },
  { icon: ShieldCheck,   label: 'Support\nOur Mission', href: '/donate' },
]

/* Aspect-ratio locked row — each snake section renders at 100vw */
function SnakeRow({
  src, widthPx, heightPx, children,
}: {
  src: string
  widthPx: number
  heightPx: number
  children?: React.ReactNode
}) {
  const pct = (heightPx / widthPx) * 100
  return (
    <div className="relative w-full" style={{ paddingBottom: `${pct.toFixed(4)}%` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        style={{ mixBlendMode: 'multiply' }}
      />
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}
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

        {/* ════════════════════════════════════════════════════
            HERO — 1969×1596 → paddingBottom 81.06%
            Snake fills right ~75%. Clear zone: LEFT 28%.
            Content pinned: left 5vw, top 20%, width 22vw
        ════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-heading"
          className="relative w-full"
          style={{ paddingBottom: '81.0564%' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/snake/snake-head-neck.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            style={{ mixBlendMode: 'multiply' }}
          />
          <div
            className="absolute z-10"
            style={{ left: '5vw', top: '20%', width: '20vw', minWidth: 220 }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <Eyebrow>We help. We teach. We conserve.</Eyebrow>
            </motion.div>
            <h1
              id="hero-heading"
              className="mt-4 font-serif font-semibold leading-[0.88] tracking-tight text-cypress-text"
              style={{ fontSize: 'clamp(2.4rem,3.6vw,4.2rem)' }}
            >
              {['Inspiring', 'coexistence.'].map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease, delay: 0.12 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-5 text-[0.88rem] leading-relaxed text-cypress-text/60"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.38 }}
            >
              We identify snakes, provide education, and promote conservation
              across Louisiana and beyond.
            </motion.p>
            <motion.div
              className="mt-7 flex flex-col items-start gap-3"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              <PrimaryBtn href="/identify">Get Help Now</PrimaryBtn>
              <OutlineBtn href="/shows">Book a Show</OutlineBtn>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            S-2 — 2549×762 → 29.89%
            Diagonal band fills entire vertical centre.
            Clear: TOP-RIGHT corner above the snake's upper edge.
            Content pinned: right 5vw, top 3%, width 28vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-2.jpg" widthPx={2549} heightPx={762}>
          <section aria-labelledby="paths-heading">
            <div
              className="absolute z-10"
              style={{ right: '5vw', top: '3%', width: '28vw', minWidth: 230 }}
            >
              <h2
                id="paths-heading"
                className="font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2rem,3.2vw,3.6rem)' }}
              >
                What brings<br />you here?
              </h2>
              <ul className="mt-5 flex flex-wrap gap-5">
                {PATHS.map((p) => {
                  const Icon = p.icon
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cypress/20 bg-field-guide/90 text-cypress shadow-sm transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                          <Icon className="h-[1rem] w-[1rem]" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="max-w-[9ch] whitespace-pre-line text-center text-[0.62rem] font-semibold leading-snug text-cypress-text/65">
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

        {/* ════════════════════════════════════════════════════
            S-3 — 2549×1037 → 40.68%
            C-curve fills LEFT ~55%. Clear: RIGHT 42%.
            Content pinned: right 5vw, top 28%, width 34vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-3.jpg" widthPx={2549} heightPx={1037}>
          <section aria-labelledby="what-we-do-heading">
            <div
              className="absolute z-10"
              style={{ right: '5vw', top: '28%', width: '34vw', minWidth: 260 }}
            >
              <Eyebrow>—</Eyebrow>
              <h2
                id="what-we-do-heading"
                className="mt-4 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4.4vw,5rem)' }}
              >
                What we do
              </h2>
              <p
                className="mt-5 text-[0.95rem] leading-relaxed text-cypress-text/60"
                style={{ maxWidth: '32ch' }}
              >
                From snake identification to wildlife education, we&apos;re here to
                help humans and wildlife thrive together.
              </p>
              <div className="mt-7">
                <TextLink href="/services">Explore Services</TextLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ════════════════════════════════════════════════════
            S-4 — 2549×1037 → 40.68%
            S-curve. Big open hollow between the two arcs = centre-left.
            Content pinned: left 7vw, top 34%, width 30vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-4.jpg" widthPx={2549} heightPx={1037}>
          <section aria-labelledby="school-heading">
            <div
              className="absolute z-10"
              style={{ left: '7vw', top: '34%', width: '30vw', minWidth: 240 }}
            >
              <Eyebrow>Snake School</Eyebrow>
              <h2
                id="school-heading"
                className="mt-4 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2.4rem,3.8vw,4.4rem)' }}
              >
                Where curiosity<br />takes the lead.
              </h2>
              <p
                className="mt-4 text-[0.9rem] leading-relaxed text-cypress-text/60"
                style={{ maxWidth: '28ch' }}
              >
                Interactive lessons, games, and challenges for young wildlife explorers.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cypress/20 bg-field-guide/90 text-cypress shadow-sm">
                  <Gamepad2 className="h-[1rem] w-[1rem]" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ════════════════════════════════════════════════════
            S-5 — 2589×1037 → 40.05%
            Reverse-C on left+top. Big open pocket = LOWER-RIGHT.
            Content pinned: right 5vw, bottom 5%, width 38vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-5.jpg" widthPx={2589} heightPx={1037}>
          <section aria-labelledby="field-guide-heading">
            <div
              className="absolute z-10"
              style={{ right: '5vw', bottom: '4%', width: '36vw', minWidth: 256 }}
            >
              <Eyebrow>Snakes of Louisiana</Eyebrow>
              <h2
                id="field-guide-heading"
                className="mt-4 font-serif font-semibold leading-[0.88] text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4.6vw,5.2rem)' }}
              >
                Discover.<br />Learn.<br />Respect.
              </h2>
              <p
                className="mt-5 text-[0.95rem] leading-relaxed text-cypress-text/60"
                style={{ maxWidth: '32ch' }}
              >
                Browse our field guide to learn about local species and their
                role in our ecosystem.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cypress/20 shadow-md">
                  <Image
                    src="/images/snakes/native-snake-1.png"
                    alt="A native Louisiana snake"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ════════════════════════════════════════════════════
            S-6 — 2589×1253 → 48.40%
            Wide sweeping arc top-left → bottom-right.
            Clear: BOTTOM-LEFT corner below the arc.
            Content pinned: left 5vw, bottom 5%, width 26vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-6.jpg" widthPx={2589} heightPx={1253}>
          <section aria-labelledby="mission-heading">
            <div
              className="absolute z-10"
              style={{ left: '5vw', bottom: '5%', width: '26vw', minWidth: 230 }}
            >
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="mt-4 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2.2rem,3.4vw,3.8rem)' }}
              >
                Protect today,<br />inspire tomorrow.
              </h2>
              <p
                className="mt-4 text-[0.9rem] leading-relaxed text-cypress-text/60"
                style={{ maxWidth: '28ch' }}
              >
                We&apos;re building a future where knowledge leads to impact and
                every species has a place.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <TextLink href="/about">Learn More</TextLink>
                <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-cypress/20 shadow-md">
                  <Image
                    src="/images/louisiana/marsh.png"
                    alt="A white Louisiana iris wildflower"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ════════════════════════════════════════════════════
            S-7 — 2589×1037 → 40.05% — TAIL
            Tail enters top-right → sweeps to bottom-left.
            Clear: LEFT 42%, top half.
            Content pinned: left 5vw, top 6%, width 34vw
        ════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-7-tail.jpg" widthPx={2589} heightPx={1037}>
          <section aria-labelledby="newsletter-heading">
            <div
              className="absolute z-10"
              style={{ left: '5vw', top: '6%', width: '34vw', minWidth: 260 }}
            >
              <h2
                id="newsletter-heading"
                className="font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(2.8rem,4.4vw,5rem)' }}
              >
                Stay<br />connected
              </h2>
              <p
                className="mt-4 text-[0.95rem] leading-relaxed text-cypress-text/55"
                style={{ maxWidth: '30ch' }}
              >
                Updates, event info, and snake stories.
              </p>
              <form
                className="mt-7 flex gap-2"
                style={{ maxWidth: 380 }}
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
                  className="min-w-0 flex-1 rounded-full border border-cypress/20 bg-background/80 px-5 py-3 text-[0.85rem] text-cypress-text placeholder:text-cypress-text/35 focus:border-cypress focus:outline-none focus:ring-1 focus:ring-cypress"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cypress px-5 py-3 text-[0.85rem] font-semibold text-field-guide transition-colors hover:bg-bayou-night"
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
