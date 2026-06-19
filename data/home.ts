import {
  AlertCircle,
  BookOpen,
  Calendar,
  GraduationCap,
  Route,
  Bug,
  HeartHandshake,
  Home,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export type QuickPath = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export const quickPaths: QuickPath[] = [
  {
    title: 'I Found a Snake',
    description: 'Keep your distance and send a clear photo.',
    href: '/identify',
    icon: AlertCircle,
  },
  {
    title: 'I Need Relocation',
    description: 'A snake in the wrong place? We can help.',
    href: '/relocation',
    icon: Route,
  },
  {
    title: 'Book a Live Show',
    description: 'Handler-led programs for any event.',
    href: '/shows',
    icon: Calendar,
  },
  {
    title: 'Learn About Snakes',
    description: 'Meet Louisiana’s native species.',
    href: '/louisiana-snakes',
    icon: BookOpen,
  },
  {
    title: 'Enter Snake School',
    description: 'Lessons, games, and real science.',
    href: '/snake-school',
    icon: GraduationCap,
  },
]

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Snake Identification',
    description: 'Send a photo and get calm, practical guidance.',
    icon: Bug,
  },
  {
    title: 'Humane Relocation',
    description:
      'When a snake is in the wrong place, we help move the situation toward safety.',
    icon: HeartHandshake,
  },
  {
    title: 'Yard Inspections',
    description:
      'Learn what may be attracting wildlife and how to reduce unwanted encounters.',
    icon: Home,
  },
  {
    title: 'Educational Shows',
    description:
      'Live, handler-led programs for schools, libraries, parties, and events.',
    icon: Sparkles,
  },
]

export const foundSnakeSteps: { step: number; text: string }[] = [
  { step: 1, text: 'Give it space.' },
  { step: 2, text: 'Keep kids and pets away.' },
  { step: 3, text: 'Use your camera’s zoom.' },
  { step: 4, text: 'Send a clear photo.' },
  { step: 5, text: 'Ask for relocation if needed.' },
]

export const snakeSchoolChips = ['Snake Basics', 'Myths & Facts', 'Habitats & Conservation']

export const fieldGuideFilters = [
  'Venomous',
  'Nonvenomous',
  'Aquatic',
  'Commonly Confused',
  'Backyard Visitors',
]

export const footerLinks = [
  { label: 'Identify a Snake', href: '/identify' },
  { label: 'Relocation', href: '/relocation' },
  { label: 'Book a Show', href: '/shows' },
  { label: 'Snake School', href: '/snake-school' },
  { label: 'Louisiana Snakes', href: '/louisiana-snakes' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Snake Life Foundation', href: '/foundation' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]
