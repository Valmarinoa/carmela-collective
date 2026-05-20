'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, socialLinks } from '@/data/site'
import { containerVariants, itemVariants } from '@/lib/animations'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC key closes menu
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return
    const el = overlayRef.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed h-full z-[90] w-full bottom-0  bg-[#1a1a1a] flex flex-col justify-between px-8 py-8"
          initial={{ opacity: 0, y: 40  }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20  }}
          transition={{ duration: 0.3 }}
        >
          {/* Nav Links */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col"
          >
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('/') && !link.href.includes('#') && pathname === link.href
              const isHovered = hoveredLink === link.label
              return (
                <motion.div key={link.label} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="block py-6 text-3xl font-bold font-funtastic outline-none
                               border-b border-white/10 hover:translate-x-2
                               transition-all duration-200"
                    style={{ color: isActive || isHovered ? '#70fe01' : '#F5F5F0' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>

          {/* Bottom: Social + Copyright */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <motion.div variants={itemVariants} className="flex gap-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-sm text-[#F5F5F0]/50 hover:text-[#70fe01]
                             transition-colors uppercase tracking-widest"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-xs text-[#F5F5F0]/25"
            >
              © {new Date().getFullYear()} Carmela Collective
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
