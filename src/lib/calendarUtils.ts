import { Event } from './calendarData'

// ─── Month filter helpers ─────────────────────────────────────────────────────

export function getMonthsWithEvents(
  events: Event[]
): { year: number; month: number; label: string }[] {
  const seen = new Set<string>()
  const result: { year: number; month: number; label: string }[] = []

  for (const event of events) {
    const [y, m] = event.date.split('-').map(Number)
    const key = `${y}-${m}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({
        year: y,
        month: m - 1, // 0-indexed
        label: new Date(y, m - 1, 1).toLocaleString('en-US', { month: 'short' }),
      })
    }
  }

  result.sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  )

  // Append up to 2 placeholder months after the last event month
  if (result.length > 0) {
    const last = result[result.length - 1]
    for (let i = 1; i <= 2; i++) {
      let m = last.month + i
      let y = last.year
      if (m > 11) { m -= 12; y += 1 }
      result.push({
        year: y,
        month: m,
        label: new Date(y, m, 1).toLocaleString('en-US', { month: 'short' }),
      })
    }
  }

  return result
}

// ─── Grid cell builder ────────────────────────────────────────────────────────

/**
 * Returns exactly 6 slots (2 rows × 3 columns) for the selected month.
 * Events are sorted chronologically and placed left-to-right, top-to-bottom.
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
    .slice(0, 6)

  const cells: (Event | null)[] = Array(6).fill(null)
  filtered.forEach((event, i) => {
    cells[i] = event
  })
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
