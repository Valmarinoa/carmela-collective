import type { FootageItem, Artist, LineupSlot, Event } from '@/types/index'
import { events } from '@/data/data'

export type { FootageItem, Artist, LineupSlot, Event }

function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function parseEventDate(date: string): Date {
  return new Date(`${date}T00:00:00`)
}

/** Upcoming + today → Calendar */
export function getUpcomingEvents(list: Event[] = events): Event[] {
  const today = startOfToday()
  return [...list]
    .filter((e) => parseEventDate(e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Older than today → Archive (newest first) */
export function getArchiveEvents(list: Event[] = events): Event[] {
  const today = startOfToday()
  return [...list]
    .filter((e) => parseEventDate(e.date) < today)
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
