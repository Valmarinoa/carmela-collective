/**
 * Shared animation configuration for Carmela Collective.
 * Import spring configs, easing curves, and Framer Motion variants from here
 * instead of defining them inline per-component.
 */

// ---------------------------------------------------------------------------
// Spring physics presets
// ---------------------------------------------------------------------------

/** Used for section parallax decorations (About, Members, Archive). */
export const SPRING_PARALLAX = { stiffness: 60, damping: 18, mass: 0.8 } as const

/** Used for the FloatingGallery smooth scroll spring. */
export const SPRING_GALLERY = { stiffness: 90, damping: 24, mass: 0.7 } as const

// ---------------------------------------------------------------------------
// Easing curves
// ---------------------------------------------------------------------------

/** Smooth, elegant ease-in-out — used for most entrance animations. */
export const EASE_ELEGANT = [0.25, 0.46, 0.45, 0.94] as const

/** Fast overshoot spring — used for the logo entrance. */
export const EASE_SPRING_OUT = [0.16, 1, 0.8, 1] as const

/** Elastic bounce — used for the spinning circle entrance. */
export const EASE_ELASTIC = [0.34, 1.56, 0.64, 1] as const

/** Natural ease-out — used for expand/collapse transitions. */
export const EASE_NATURAL = [0.22, 1, 0.36, 1] as const

// ---------------------------------------------------------------------------
// Reusable Framer Motion variants
// ---------------------------------------------------------------------------

/**
 * Stagger container — wraps a list of `itemVariant` children.
 * Used in MobileMenu and anywhere items animate in sequence.
 */
export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } },
} as const

/**
 * Single staggered item — pair with `containerVariants`.
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
} as const
