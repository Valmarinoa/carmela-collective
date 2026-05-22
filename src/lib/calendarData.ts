import type { FootageItem, Artist, LineupSlot } from '@/types/index'
import { a } from '@/data/artists'

export type { FootageItem, Artist, LineupSlot }

export type Event = {
  id: string
  title: string
  date: string // ISO: "2026-05-04"
  venue: string
  venueUrl?: string
  venueAddress?: string
  description: string
  flyer?: string
  type?: 'event' | 'radio'
  ticketUrl?: string
  listenUrl?: string
  isFree?: boolean
  lineup: LineupSlot[]
  tags?: string[]
  footage?: FootageItem[]
}

export const CALENDAR: Event[] = [
  {
    id: "carmela-chenin",
    title: "Chenin Chenin x Carmela",
    date: "2026-06-27",
    venue: "Chenin Chenin",
    venueUrl: "https://cheninchenin.com/",
    description:"DJ buenosdiaz invites the Carmela Collective for an afternoon of sharing music and wine sipping. Join Chenin Chenin, the natural wine bar located at the heart of Amsterdam, or tune in online through Radio Chenin Chenin.",
    flyer: "/events/carmela-cheninchenin/flyer.png",
    ticketUrl: "",
    tags: ["DJ set", "Live", "Natural Wine"],
    lineup: [
      { id: 'pos-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'pos-ukab',        isB2B: false, artists: [a('tresde')] },
      { id: 'pos-faedro',      isB2B: false, artists: [a('faedro')] },
      { id: 'pos-cameron',     isB2B: false, artists: [a('cameronaudio')] },
    ],
  },
  {
    id: "cumbia-libre",
    title: "Cumbia Libre",
    date: "2026-06-20",
    venue: "Toekomstmuziek Amsterdam",
    venueUrl: "https://www.toekomstmuziek.com/agenda/",
    ticketUrl: "https://bash.social/toekomstmuziek?eventId=276616",
    description:
      "An unprecedented collaboration between Carmela and Conjunto Medialuna, a clubnight fulfilled with echoes of cumbia, accordion and percussion. ",
    flyer: "/events/carmela-cumbialibre/flyer.png",
    tags: ["Cumbia", "Live DJ sets", "Live Music"],
    lineup: [
      { id: 'cl-medialuna',   isB2B: false, artists: [a('conjuntomedialuna')] },
      { id: 'cl-ukab',        isB2B: false, artists: [a('ukab')] },
      { id: 'cl-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'cl-tresde',     isB2B: false, artists: [a('tresde')] },
    ],
  },
  {
    id: "carmela-sf",
    title: "Carmela × SF",
    date: "2026-06-04",
    venue: "San Francisco Bar",
    venueUrl: "https://www.instagram.com/sfamsterdam",
    description:
      "Carmela Collective and San Francisco Bar present a night of Afro-Latin sounds, bringing together the Rotterdam and Amsterdam underground scenes. A meeting point between diaspora histories and club futures.",
    flyer: "/events/carmela-sf/footage/flyer.png",
    ticketUrl: "",
    tags: ["Live DJ set", "Collaboration"],
    lineup: [
      { id: 'sf-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'sf-ukab',        isB2B: false, artists: [a('ukab')] },
      { id: 'sf-faedro',      isB2B: false, artists: [a('faedro')] },
      { id: 'sf-cameron',     isB2B: false, artists: [a('cameronaudio')] },
    ],
  },
]
