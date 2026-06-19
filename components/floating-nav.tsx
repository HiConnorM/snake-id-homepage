'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Waves } from 'lucide-react'
import { navLinks, siteConfig } from '@/data/site'
import { OrganicButton } from '@/components/primitives'
import { cn } from '@/lib/utils'

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress',
        className,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cypress text-[#f4f0e6]">
        <Waves className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="font-serif text-base font-semibold leading-none text-cypress-text">
        Louisiana
        <span className="block text-[0.62rem] font-sans font-semibold uppercase tracking-[0.2em] text-moss">
          Snake&nbsp;ID
        </span>
      </span>
    </Link>
  )
}

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Desktop / tablet floating pill */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-3 z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:top-4 sm:px-4"
      >
        <div
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-full border border-cypress/12 bg-field-guide/80 px-3 py-2 shadow-lg shadow-cypress/5 backdrop-blur-md transition-all duration-300 sm:px-4',
            scrolled && 'bg-field-guide/95 shadow-xl',
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-3 py-2 text-sm font-medium text-cypress-text/80 transition-colors hover:bg-cypress/8 hover:text-cypress-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <OrganicButton
              href="/shows"
              variant="outline"
              className="hidden px-5 sm:inline-flex"
            >
              Book a Show
            </OrganicButton>
            <OrganicButton
              href="/identify"
              variant="rust"
              className="hidden px-5 sm:inline-flex"
            >
              Found a Snake?
            </OrganicButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cypress/15 text-cypress-text transition-colors hover:bg-cypress/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bayou-night/98 px-6 py-5 text-field-guide backdrop-blur-sm lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">
                {siteConfig.name}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-field-guide/25 transition-colors hover:bg-field-guide/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-guide"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-field-guide/10 py-4 font-serif text-3xl font-medium transition-colors hover:text-ochre"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 pb-2">
              <OrganicButton href="/identify" variant="rust" onClick={() => setOpen(false)}>
                Found a Snake?
              </OrganicButton>
              <OrganicButton
                href="/shows"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-field-guide/40 text-field-guide hover:bg-field-guide/10"
              >
                Book a Show
              </OrganicButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
