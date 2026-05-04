'use client'

import { motion } from 'framer-motion'

interface MonthOption {
  year: number
  month: number
  label: string
}

interface MonthFilterProps {
  months: MonthOption[]
  activeMonth: number
  activeYear: number
  onSelect: (year: number, month: number) => void
}

export default function MonthFilter({
  months,
  activeMonth,
  activeYear,
  onSelect,
}: MonthFilterProps) {
  return (
    <div className="flex items-center gap-1" role="tablist" aria-label="Filter by month">
      {months.map(({ year, month, label }) => {
        const isActive = month === activeMonth && year === activeYear
        return (
          <motion.button
            key={`${year}-${month}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(year, month)}
            className={[
              'relative px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase font-inter transition-colors duration-200',
              isActive ? 'text-[#0a0a0a]' : 'text-cream/40 hover:text-cream/70',
            ].join(' ')}
            whileTap={{ scale: 0.97 }}
          >
            {isActive && (
              <motion.span
                layoutId="month-pill"
                className="absolute inset-0 bg-cream"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
