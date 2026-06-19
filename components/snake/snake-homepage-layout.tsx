'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/*
  REPLACE SNAKE ASSETS HERE:
  /public/images/snake/snake-head-neck.jpg  -> head + neck (studio white bg)
  /public/images/snake/snake-body.jpg       -> winding body (studio white bg)

  The white studio backgrounds are dropped on the ivory page using
  `mix-blend-mode: multiply` (see .snake-blend in globals.css), so the
  separate photos read as one continuous snake winding down the page.
*/

const HEAD = '/images/snake/snake-head-neck.jpg'
const BODY = '/images/snake/snake-body.jpg'
const BODY_W = 2897
const BODY_H = 6311

type SegmentConfig = {
  /** top position as a % of the full page height */
  top: number
  /** horizontal anchor */
  side: 'left' | 'right'
  /** distance from that side, in vw */
  offset: number
  /** rendered width in vw */
  width: number
  rotate: number
  flip?: boolean
  /** parallax strength in px across the scroll */
  drift: number
  opacity?: number
}

/* Desktop snake path: head top-right, body weaving down to the tail. */
const SEGMENTS: SegmentConfig[] = [
  { top: 4, side: 'right', offset: -6, width: 50, rotate: 4, drift: -50 },
  { top: 19, side: 'left', offset: -10, width: 52, rotate: -6, flip: true, drift: 60 },
  { top: 37, side: 'right', offset: -8, width: 50, rotate: 8, drift: -70 },
  { top: 55, side: 'left', offset: -6, width: 48, rotate: -4, flip: true, drift: 80 },
  { top: 72, side: 'right', offset: 4, width: 40, rotate: 10, drift: -60, opacity: 0.96 },
]

function SnakeSegment({
  config,
  index,
  reduce,
}: {
  config: SegmentConfig
  index: number
  reduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [config.drift, -config.drift],
  )
  const y = useSpring(yRaw, { stiffness: 60, damping: 20, mass: 0.5 })

  const positional =
    config.side === 'left'
      ? { left: `${config.offset}vw` }
      : { right: `${config.offset}vw` }

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="absolute"
      style={{
        top: `${config.top}%`,
        width: `${config.width}vw`,
        y,
        rotate: `${config.rotate}deg`,
        opacity: config.opacity ?? 1,
        ...positional,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: config.opacity ?? 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Image
        src={BODY}
        alt=""
        width={BODY_W}
        height={BODY_H}
        sizes="(max-width: 768px) 0px, 52vw"
        loading={index < 1 ? 'eager' : 'lazy'}
        className={cn(
          'snake-blend h-auto w-full select-none drop-shadow-[0_30px_40px_rgba(16,43,38,0.18)]',
          config.flip && '-scale-x-100',
        )}
        draggable={false}
      />
    </motion.div>
  )
}

function SnakeHead({ reduce }: { reduce: boolean | null }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 50, damping: 18 })
  const y = useSpring(my, { stiffness: 50, damping: 18 })
  const rot = useTransform(x, [-10, 10], [-3, 3])

  const [tongue, setTongue] = useState(false)

  useEffect(() => {
    if (reduce) return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2 // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mx.set(nx * 9)
      my.set(ny * 8)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduce])

  useEffect(() => {
    if (reduce) return
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 18000 + Math.random() * 12000 // 18–30s
      timeout = setTimeout(() => {
        setTongue(true)
        setTimeout(() => setTongue(false), 620)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [reduce])

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-[1.5%] right-[-4vw] w-[42vw] max-w-[640px] md:right-[-2vw] lg:w-[34vw]"
      style={{ x, y, rotate: rot }}
      initial={reduce ? false : { opacity: 0, x: 30, y: -10 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="relative">
        <Image
          src={HEAD}
          alt=""
          width={1969}
          height={1596}
          priority
          sizes="(max-width: 768px) 60vw, 34vw"
          className="snake-blend h-auto w-full select-none drop-shadow-[0_24px_36px_rgba(16,43,38,0.22)]"
          draggable={false}
        />
        {/* Forked tongue flick — anchored near the mouth (lower-left of head) */}
        <motion.svg
          className="absolute left-[4%] top-[74%] h-[7%] w-[14%]"
          viewBox="0 0 60 40"
          fill="none"
          initial={false}
          animate={{
            opacity: tongue ? 1 : 0,
            scaleX: tongue ? 1 : 0.2,
          }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          style={{ originX: 1, originY: 0.5 }}
        >
          <path
            d="M58 20 H26 M26 20 L6 8 M14 14 L2 4 M26 20 L6 32 M14 26 L2 36"
            stroke="#a8452d"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </motion.div>
  )
}

export function SnakeHomepageLayout() {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {/* Body segments — desktop/tablet only to keep mobile clean */}
      <div className="hidden md:block">
        {SEGMENTS.map((config, i) => (
          <SnakeSegment key={i} config={config} index={i} reduce={reduce} />
        ))}
      </div>
      {/* Head is visible on all breakpoints, anchored to the hero */}
      <SnakeHead reduce={reduce} />
    </div>
  )
}

/* Lightweight cropped snake divider for mobile section breaks */
export function SnakeDivider({
  flip,
  className,
}: {
  flip?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative h-28 overflow-hidden md:hidden', className)}
    >
      <Image
        src={BODY}
        alt=""
        width={BODY_W}
        height={BODY_H}
        sizes="100vw"
        loading="lazy"
        className={cn(
          'snake-blend absolute left-1/2 w-[150vw] max-w-none -translate-x-1/2 object-cover',
          flip && '-scale-x-100',
        )}
        style={{ top: '-40%' }}
        draggable={false}
      />
    </div>
  )
}
