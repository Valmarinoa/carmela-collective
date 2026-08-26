import type { Event } from '@/types/index'

// ─── Month filter helpers ─────────────────────────────────────────────────────

export function getMonthsWithEvents(
  events: Event[]
): { year: number; month: number; label: string }[] {
  const seen = new Set<string>()
  const result: { year: number; month: number; label: string }[] = []

  const addMonth = (y: number, m: number) => {
    const key = `${y}-${m}`
    if (seen.has(key)) return
    seen.add(key)
    result.push({
      year: y,
      month: m, // 0-indexed
      label: new Date(y, m, 1).toLocaleString('en-US', { month: 'short' }),
    })
  }

  // Always anchor the filter on [current - 2, current] regardless of whether
  // those months have events, so the tabs don't collapse when a month is empty.
  const now = new Date()
  for (let i = -2; i <= 0; i++) {
    let m = now.getMonth() + i
    let y = now.getFullYear()
    if (m < 0) { m += 12; y -= 1 }
    addMonth(y, m)
  }

  // Then layer in any months that actually contain events (covers future
  // months further out than the current one, e.g. a show booked 4 months out).
  for (const event of events) {
    const [y, m] = event.date.split('-').map(Number)
    addMonth(y, m - 1) // 0-indexed
  }

  result.sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  )

  // Append up to 2 placeholder months after the last month currently in the list
  if (result.length > 0) {
    const last = result[result.length - 1]
    for (let i = 1; i <= 2; i++) {
      let m = last.month + i
      let y = last.year
      if (m > 11) { m -= 12; y += 1 }
      addMonth(y, m)
    }
    // re-sort since placeholders were appended after the events loop above
    result.sort((a, b) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    )
  }

  return result
}

// ─── Grid cell builder ────────────────────────────────────────────────────────

// Cell index 2 (3rd cell) is always kept empty; events skip to cell 3 onwards.
const SKIPPED_CELLS = new Set([2])

/**
 * Returns exactly 6 slots (2 rows × 3 columns) for the selected month.
 * Events are sorted chronologically and placed left-to-right, top-to-bottom,
 * skipping any cell indices listed in SKIPPED_CELLS.
 * Empty slots are null.
 */
export function getGridCells(
  events: Event[],
  month: number, // 0-indexed
  year: number
): (Event | null)[] {
  const filtered = events
    .filter(e => {
      const [y, m] = e.date.split('-').map(Number)
      return y === year && m - 1 === month
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5) // max 5 events (6 cells − 1 skipped)

  const cells: (Event | null)[] = Array(6).fill(null)
  let eventIdx = 0
  for (let cellIdx = 0; cellIdx < 6 && eventIdx < filtered.length; cellIdx++) {
    if (SKIPPED_CELLS.has(cellIdx)) continue
    cells[cellIdx] = filtered[eventIdx++]
  }
  return cells
}

// ─── Next upcoming event ──────────────────────────────────────────────────────

/**
 * Returns the first event whose date is >= today, or null if none.
 */
export function getNextUpcomingEvent(events: Event[]): Event | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .find(e => new Date(`${e.date}T00:00:00`) >= today) ?? null
  )
}