import Link from 'next/link'
import { Phone, Mail, Waves } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { footerLinks } from '@/data/home'
import { SocialIcon } from '@/components/primitives'

const socials: { name: 'facebook' | 'instagram' | 'youtube' | 'tiktok'; href: string; label: string }[] = [
  { name: 'facebook', href: siteConfig.social.facebook, label: 'Facebook' },
  { name: 'instagram', href: siteConfig.social.instagram, label: 'Instagram' },
  { name: 'youtube', href: siteConfig.social.youtube, label: 'YouTube' },
  { name: 'tiktok', href: siteConfig.social.tiktok, label: 'TikTok' },
]

export function Footer() {
  return (
    <footer className="relative z-20 mt-10 text-field-guide">
      {/* Organic river wave top edge */}
      <div aria-hidden="true" className="-mb-px text-bayou-night">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full sm:h-24"
        >
          <path
            fill="currentColor"
            d="M0,64 C240,120 480,16 720,40 C960,64 1200,128 1440,72 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="bg-bayou-night">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-field-guide/15">
                  <Waves className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-serif text-xl font-semibold">
                  {siteConfig.name}
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-field-guide/70">
                Helping Louisiana fear less, know more, and let them live.
              </p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 text-field-guide/85 transition-colors hover:text-ochre"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex items-center gap-2 text-field-guide/85 transition-colors hover:text-ochre"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Link columns */}
            <nav aria-label="Footer" className="md:col-span-2">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-field-guide/75 transition-colors hover:text-ochre focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-guide/60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-field-guide/12 pt-8">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-field-guide/20 text-field-guide/80 transition-colors hover:border-ochre hover:text-ochre focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-guide/60"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 text-xs text-field-guide/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Louisiana Snake ID. All rights reserved.</p>
            <p className="font-semibold uppercase tracking-[0.18em] text-field-guide/70">
              Built for coexistence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
