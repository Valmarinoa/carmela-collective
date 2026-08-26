import type { FootageItem, Artist, LineupSlot, Event } from '@/types/index'
import { events } from '@/data/data'

export type { FootageItem, Artist, LineupSlot, Event }

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/** First day of the month, N months before the current month */
function startOfMonthsAgo(n: number): Date {
  const d = startOfToday()
  d.setDate(1)
  d.setMonth(d.getMonth() - n)
  return d
}

function parseEventDate(date: string): Date {
  return new Date(`${date}T00:00:00`)
}

const CALENDAR_LOOKBACK_MONTHS = 2

/** From 2 months ago through the future → Calendar */
export function getUpcomingEvents(list: Event[] = events): Event[] {
  const cutoff = startOfMonthsAgo(CALENDAR_LOOKBACK_MONTHS)
  return [...list]
    .filter((e) => parseEventDate(e.date) >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Older than the calendar lookback window → Archive (newest first) */
export function getArchiveEvents(list: Event[] = events): Event[] {
  const cutoff = startOfMonthsAgo(CALENDAR_LOOKBACK_MONTHS)
  return [...list]
    .filter((e) => parseEventDate(e.date) < cutoff)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** Landing Archive carousel: newest first, capped */
export function getArchivePreview(limit = 7): Event[] {
  return getArchiveEvents().slice(0, limit)
}

/** ISO "2026-07-25" → "25.07.26" for archive UI */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y.slice(2)}`
}