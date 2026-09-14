'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  eventSharePath,
  getEventById,
  getEventPage,
  type Event,
  type EventPage,
} from '@/lib/calendarData'

/**
 * Modal open state follows `?event=<id>`.
 * Unknown ids stay closed; events that belong on the other listing are redirected.
 */
export function useEventModal(page: EventPage) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('event')

  const eventFromUrl = useMemo(
    () => (eventId ? getEventById(eventId) ?? null : null),
    [eventId]
  )

  useEffect(() => {
    if (!eventFromUrl) return
    if (getEventPage(eventFromUrl) === page) return
    router.replace(eventSharePath(eventFromUrl), { scroll: false })
  }, [eventFromUrl, page, router])

  const selectedEvent =
    eventFromUrl && getEventPage(eventFromUrl) === page ? eventFromUrl : null

  const openEvent = useCallback(
    (event: Event) => {
      router.replace(eventSharePath(event), { scroll: false })
    },
    [router]
  )

  const closeEvent = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('event')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  return { selectedEvent, eventId, openEvent, closeEvent }
}
