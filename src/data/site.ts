/**
 * Site-wide navigation and social link data.
 * Single source of truth consumed by CurvedNavigation, MobileMenu, and SocialIcons.
 */

export const navLinks = [
  { label: 'About',    href: '/#about' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Archive', href: '/archive' },
  { label: 'Contact',  href: '/#contact' },
] as const

export const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/carmela_collective' },
  { name: 'SoundCloud', href: 'https://soundcloud.com/carmela-collective' },
  { name: 'Email',     href: 'mailto:carmelacollective@gmail.com' },
] as const
