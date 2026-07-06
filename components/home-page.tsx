'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, AlertCircle, GraduationCap, BookOpen, ShieldCheck, Gamepad2 } from 'lucide-react'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/sections/footer'

/* ─────────────────────────────────────────────────────────────────
  SNAKE SIZING SYSTEM
  ─────────────────────────────────────────────────────────────────
  All section images share the same source width (2549 or 2589 px).
  We render every image at a fixed CSS width = SNAKE_W (e.g. 72vw),
  horizontally centred on the page. Because every row is the same
  rendered width, the snake body is the same visual width in every
  section — so the edges line up perfectly and the snake looks
  continuous and seamless.

  The hero (head+neck) image is also rendered at SNAKE_W and centred.
  Since the head sits in the left-centre of that image, it appears
  in the middle of the viewport — exactly what the user wants.

  Content is placed absolutely OUTSIDE the snake image container,
  using the remaining viewport space on either side.
  ───────────────────────────────────────────────────────────────── */

// Rendered width of every snake image — change this one value to resize
const SNAKE_W = '68vw'
// Left offset so the container is centred: (100% - SNAKE_W) / 2
const SNAKE_L = '16vw' // (100 - 68) / 2

/* ─────────────────────────────────────────────────────────────────
  IMAGE DIMENSIONS (native px)
  HEAD   1969 × 1596   aspect 81.06%
  S-2    2549 ×  762   aspect 29.90%
  S-3    2549 × 1037   aspect 40.68%
  S-4    2549 × 1037   aspect 40.68%
  S-5    2589 × 1037   aspect 40.05%
  S-6    2589 × 1253   aspect 48.40%
  S-7    2589 × 1037   aspect 40.05%
  ───────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────
  WHITE-SPACE MAP  (verified from direct image inspection)
  HEAD  head+neck in lower-left, neck sweeps to upper-right.
        Clear: upper-left ~30% of image width = left of snake container.
  S-2   diagonal band. Clear: top-right of image.
  S-3   C-curve on left. Clear: right ~45%.
  S-4   S-curve. Open hollow = centre-left between arcs.
  S-5   reverse-C left+top. Open = lower-right.
  S-6   sweeping arc top-left→bottom-right. Clear: bottom-left.
  S-7   tail top-right→bottom-left. Clear: left top.
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
  { icon: AlertCircle,   label: 'I Found a Snake',        href: '/identify' },
  { icon: GraduationCap, label: 'Book an Education Show', href: '/shows' },
  { icon: BookOpen,      label: 'Learn About Snakes',     href: '/louisiana-snakes' },
  { icon: ShieldCheck,   label: 'Support Our Mission',    href: '/donate' },
]

/*
  SnakeRow renders the image at SNAKE_W wide, centred.
  The outer div is full-width and holds the aspect-ratio height.
  Children are absolutely positioned relative to the OUTER div
  (full viewport width), so content can use the margins freely.
*/
function SnakeRow({
  src,
  widthPx,
  heightPx,
  snakeW = SNAKE_W,
  snakeL = SNAKE_L,
  objectFit = 'cover',
  marginTop = 0,
  marginLeft = 0,
  children,
}: {
  src: string
  widthPx: number
  heightPx: number
  snakeW?: string
  snakeL?: string
  objectFit?: 'cover' | 'contain'
  marginTop?: number | string
  marginLeft?: number | string
  children?: React.ReactNode
}) {
  // Height as % of SNAKE_W rendered width
  const aspectRatio = heightPx / widthPx
  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `calc(${snakeW} * ${aspectRatio.toFixed(6)})` }}
    >
      {/* Snake image — fixed width, centred */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute top-0 select-none"
        style={{
          left: snakeL,
          width: snakeW,
          height: '100%',
          objectFit,
          objectPosition: 'top center',
          mixBlendMode: 'multiply',
          marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
          marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
        }}
      />
      {/* Content layer — full width so children can use side margins */}
      {children && (
        <div className="absolute inset-0 z-10">{children}</div>
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

        {/* ══════════════════════════════════════════════════════
            HERO — head+neck 1969×1596
            Snake centred at SNAKE_W. Head sits in lower-centre
            of image so it appears mid-viewport. Content: left margin.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow
          src="/images/snake/snake-head-neck.jpg"
          widthPx={1969}
          heightPx={1596}
          snakeW={SNAKE_W}
          snakeL={SNAKE_L}
          objectFit="contain"
          marginTop={-74}
          marginLeft="18.6vw"
        >
          <section aria-labelledby="hero-heading">
            {/* Content lives in the LEFT margin (0 → SNAKE_L) */}
            <div
              className="absolute z-10"
              style={{ left: '3vw', top: '22%', width: '13vw', minWidth: 190 }}
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
                style={{ fontSize: 'clamp(1.8rem,2.6vw,3.2rem)' }}
              >
                {['Inspiring', 'coexistence.'].map((line, i) => (
                  <motion.span
                    key={line}
                    className="block"
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease, delay: 0.12 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="mt-4 text-[0.75rem] leading-relaxed text-cypress-text/60"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.38 }}
              >
                We identify snakes, provide education, and promote conservation
                across Louisiana.
              </motion.p>
              <motion.div
                className="mt-5 flex flex-col items-start gap-2.5"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 }}
              >
                <PrimaryBtn href="/identify">Get Help Now</PrimaryBtn>
                <OutlineBtn href="/shows">Book a Show</OutlineBtn>
              </motion.div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════
            S-2 — 2549×762 (29.90% aspect)
            Diagonal band L→R across centre. Clear: top-right of image
            = right margin of viewport outside SNAKE_W.
            Content: right margin.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-2.jpg" widthPx={2549} heightPx={762} marginLeft="18.9vw">
          <section aria-labelledby="paths-heading">
            <div
              className="absolute z-10"
              style={{ right: '2vw', top: '6%', width: '13vw', minWidth: 160 }}
            >
              <h2
                id="paths-heading"
                className="font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(1.4rem,2vw,2.4rem)' }}
              >
                What brings<br />you here?
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {PATHS.map((p) => {
                  const Icon = p.icon
                  return (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cypress/20 bg-field-guide/90 text-cypress shadow-sm transition-all group-hover:-translate-y-1 group-hover:border-copper group-hover:text-copper">
                          <Icon className="h-[0.85rem] w-[0.85rem]" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="max-w-[8ch] text-center text-[0.55rem] font-semibold leading-snug text-cypress-text/65">
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

        {/* ══════════════════════════════════════════════════════
            S-3 — 2549×1037 (40.68% aspect)
            C-curve fills left of image. Right of image is clear.
            Image centred → right side of image aligns near right
            margin. Content: right margin OR inside image right zone.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-3.jpg" widthPx={2549} heightPx={1037} marginLeft="18.9vw">
          <section aria-labelledby="what-we-do-heading">
            <div
              className="absolute z-10"
              style={{ right: '2vw', top: '20%', width: '13vw', minWidth: 160 }}
            >
              <Eyebrow>—</Eyebrow>
              <h2
                id="what-we-do-heading"
                className="mt-3 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(1.6rem,2.4vw,3rem)' }}
              >
                What we do
              </h2>
              <p
                className="mt-3 text-[0.78rem] leading-relaxed text-cypress-text/60"
              >
                From snake ID to wildlife education, helping humans and
                wildlife thrive together.
              </p>
              <div className="mt-4">
                <TextLink href="/services">Explore Services</TextLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════
            S-4 — 2549×1037 (40.68% aspect)
            S-curve. Big hollow between arcs = centre-left of image.
            Image centred at SNAKE_L → hollow sits ~left-centre viewport.
            Content: left margin.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-4.jpg" widthPx={2549} heightPx={1037} marginLeft="18.8vw">
          <section aria-labelledby="school-heading">
            <div
              className="absolute z-10"
              style={{ left: '3vw', top: '30%', width: '12vw', minWidth: 160 }}
            >
              <Eyebrow>Snake School</Eyebrow>
              <h2
                id="school-heading"
                className="mt-3 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(1.5rem,2.2vw,2.8rem)' }}
              >
                Where curiosity<br />takes the lead.
              </h2>
              <p
                className="mt-3 text-[0.75rem] leading-relaxed text-cypress-text/60"
              >
                Interactive lessons, games, and challenges for young wildlife explorers.
              </p>
              <div className="mt-4">
                <PrimaryBtn href="/snake-school">Enter Snake School</PrimaryBtn>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ═══════��══════════════════════════════════════════════
            S-5 — 2589×1037 (40.05% aspect)
            Reverse-C on left. Open pocket = lower-right of image.
            Right of centred image → right side viewport margin.
            Content: right margin, bottom.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-5.jpg" widthPx={2589} heightPx={1037} marginLeft="17.6vw">
          <section aria-labelledby="field-guide-heading">
            <div
              className="absolute z-10"
              style={{ right: '2vw', bottom: '8%', width: '13vw', minWidth: 160 }}
            >
              <Eyebrow>Snakes of Louisiana</Eyebrow>
              <h2
                id="field-guide-heading"
                className="mt-3 font-serif font-semibold leading-[0.88] text-cypress-text"
                style={{ fontSize: 'clamp(1.6rem,2.6vw,3.2rem)' }}
              >
                Discover.<br />Learn.<br />Respect.
              </h2>
              <p
                className="mt-3 text-[0.78rem] leading-relaxed text-cypress-text/60"
              >
                Browse our field guide to learn about local species and their
                ecosystem role.
              </p>
              <div className="mt-4">
                <PrimaryBtn href="/louisiana-snakes">Explore the Guide</PrimaryBtn>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════
            S-6 — 2589×1253 (48.40% aspect)
            Wide arc top-left→bottom-right. Clear: bottom-left of image
            = left margin of viewport.
            Content: left margin, bottom.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-6.jpg" widthPx={2589} heightPx={1253} marginLeft="17.6vw">
          <section aria-labelledby="mission-heading">
            <div
              className="absolute z-10"
              style={{ left: '3vw', bottom: '8%', width: '12vw', minWidth: 155 }}
            >
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="mt-3 font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(1.5rem,2.2vw,2.8rem)' }}
              >
                Protect today,<br />inspire tomorrow.
              </h2>
              <p
                className="mt-3 text-[0.75rem] leading-relaxed text-cypress-text/60"
              >
                Building a future where knowledge leads to impact and every
                species has a place.
              </p>
              <div className="mt-4">
                <TextLink href="/about">Learn More</TextLink>
              </div>
            </div>
          </section>
        </SnakeRow>

        {/* ══════════════════════════════════════════════════════
            S-7 — 2589×1037 (40.05% aspect) — TAIL
            Tail enters top-right, sweeps to bottom-centre.
            Clear: left ~40% top half = left margin.
            Content: left margin, top.
        ══════════════════════════════════════════════════════ */}
        <SnakeRow src="/images/snake/section-7-tail.jpg" widthPx={2589} heightPx={1037} marginLeft="17.6vw">
          <section aria-labelledby="newsletter-heading">
            <div
              className="absolute z-10"
              style={{ left: '3vw', top: '8%', width: '12vw', minWidth: 155 }}
            >
              <h2
                id="newsletter-heading"
                className="font-serif font-semibold leading-[0.9] text-cypress-text"
                style={{ fontSize: 'clamp(1.6rem,2.4vw,3rem)' }}
              >
                Stay<br />connected
              </h2>
              <p
                className="mt-3 text-[0.75rem] leading-relaxed text-cypress-text/55"
              >
                Updates, event info, and snake stories.
              </p>
              <form
                className="mt-5 flex flex-col gap-2"
                style={{ maxWidth: 200 }}
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
                  className="w-full rounded-full border border-cypress/20 bg-background/80 px-4 py-2.5 text-[0.78rem] text-cypress-text placeholder:text-cypress-text/35 focus:border-cypress focus:outline-none focus:ring-1 focus:ring-cypress"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cypress px-4 py-2.5 text-[0.78rem] font-semibold text-field-guide transition-colors hover:bg-bayou-night"
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
