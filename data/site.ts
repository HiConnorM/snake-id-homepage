export const siteConfig = {
  name: 'Louisiana Snake ID',
  tagline: 'Fear less. Know more. Let them live.',
  phone: '225.573.0517',
  // tel: links use the raw digits
  phoneHref: 'tel:+12255730517',
  email: 'louisianasnakeid@gmail.com',
  emailHref: 'mailto:louisianasnakeid@gmail.com',
  philosophy: 'You don’t have to love them, just please don’t kill them.',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    tiktok: '#',
  },
} as const

export const navLinks = [
  { label: 'Identify', href: '/identify' },
  { label: 'Relocation', href: '/relocation' },
  { label: 'Shows', href: '/shows' },
  { label: 'Snake School', href: '/snake-school' },
  { label: 'Field Guide', href: '/louisiana-snakes' },
  { label: 'About', href: '/about' },
] as const
