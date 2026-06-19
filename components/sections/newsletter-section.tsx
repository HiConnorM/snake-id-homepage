'use client'

import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import { EditorialHeading } from '@/components/primitives'
import { Reveal } from '@/components/reveal'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 md:py-28"
    >
      <Reveal className="flex flex-col items-center">
        <EditorialHeading
          id="newsletter-heading"
          className="text-[clamp(2rem,4.5vw,3.25rem)]"
        >
          Stay close to the wild.
        </EditorialHeading>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-cypress-text/75">
          Get identification tips, upcoming events, myth-busting stories, and
          Louisiana wildlife lessons.
        </p>

        <form
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="min-h-12 flex-1 rounded-full border border-cypress/20 bg-card px-5 text-sm text-cypress-text placeholder:text-moss/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cypress px-7 text-sm font-semibold text-[#f4f0e6] transition-colors hover:bg-bayou-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cypress focus-visible:ring-offset-2 focus-visible:ring-offset-field-guide"
          >
            {done ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" /> Subscribed
              </>
            ) : (
              <>
                Subscribe <Send className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
        {done && (
          <p className="mt-3 text-sm text-moss" role="status">
            Thanks for joining — keep an eye on your inbox.
          </p>
        )}
      </Reveal>
    </section>
  )
}
