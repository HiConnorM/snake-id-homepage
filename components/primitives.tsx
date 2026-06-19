'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/* SectionEyebrow — small uppercase letter-spaced label                */
/* ------------------------------------------------------------------ */
export function SectionEyebrow({
  children,
  tone = 'moss',
  className,
}: {
  children: ReactNode
  tone?: 'moss' | 'copper'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]',
        tone === 'copper' ? 'text-copper' : 'text-moss',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-px w-8',
          tone === 'copper' ? 'bg-copper/60' : 'bg-moss/50',
        )}
      />
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialHeading — serif display heading                            */
/* ------------------------------------------------------------------ */
export function EditorialHeading({
  children,
  as: Tag = 'h2',
  className,
}: {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <Tag
      className={cn(
        'font-serif font-semibold leading-[1.04] tracking-[-0.01em] text-cypress-text text-balance',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* OrganicButton — rounded pill button / link                          */
/* ------------------------------------------------------------------ */
type Variant = 'primary' | 'outline' | 'rust' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-cypress text-[#f4f0e6] hover:bg-bayou-night shadow-sm shadow-cypress/20',
  outline:
    'bg-transparent text-cypress-text border border-cypress/30 hover:border-cypress hover:bg-cypress/5',
  rust: 'bg-rust text-[#f4f0e6] hover:brightness-110 shadow-sm shadow-rust/25',
  ghost: 'bg-transparent text-cypress hover:text-bayou-night',
}

type OrganicButtonProps = {
  variant?: Variant
  className?: string
  children: ReactNode
} & (
  | ({ href: string } & ComponentProps<typeof Link>)
  | ({ href?: undefined } & ComponentProps<'button'>)
)

export function OrganicButton({
  variant = 'primary',
  className,
  children,
  ...props
}: OrganicButtonProps) {
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress focus-visible:ring-offset-2 focus-visible:ring-offset-field-guide'

  if ('href' in props && props.href) {
    const { href, ...rest } = props as { href: string } & ComponentProps<
      typeof Link
    >
    return (
      <Link
        href={href}
        className={cn(base, variantClasses[variant], className)}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={cn(base, variantClasses[variant], className)}
      {...(props as ComponentProps<'button'>)}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* OrganicImageFrame — soft organic circular/blobby image mask         */
/* ------------------------------------------------------------------ */
export function OrganicImageFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-4 border-field-guide shadow-xl shadow-cypress/10',
        className,
      )}
      style={{
        borderRadius: '46% 54% 48% 52% / 52% 46% 54% 48%',
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Social brand icons (lucide v1 dropped brand marks)                  */
/* ------------------------------------------------------------------ */
export function SocialIcon({ name }: { name: 'facebook' | 'instagram' | 'youtube' | 'tiktok' }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true as const,
  }
  switch (name) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9c0-.9.3-1.5 1.6-1.5H16.8V4.8C16.4 4.7 15.3 4.6 14.1 4.6c-2.5 0-4.1 1.5-4.1 4.2V11H7.4v3H10v7h3.5z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.7.1 4.8s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9c-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-.9-.2-1.4-.3-1.7a2.7 2.7 0 0 0-.7-1c-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2zm6.3-8.2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M23 7.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.7 4 12 4 12 4s-4.7 0-7.9.2c-.4.1-1.4.1-2.2 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.1 7.7.2 7.7.2s4.7 0 7.9-.2c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8zM9.8 15.1V8.9l6.1 3.1-6.1 3.1z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M16.5 2h-3v13.2a2.6 2.6 0 1 1-2-2.5V9.6a5.7 5.7 0 1 0 5 5.6V8.5a7 7 0 0 0 4 1.3V6.7a4 4 0 0 1-4-4z" />
        </svg>
      )
  }
}
