import type { FootageItem } from '@/types/index'

export type { FootageItem }

export type Artist = {
  id: string
  name: string
  origin: string
  bio: string
  instagram?: string
  soundcloudUrl?: string
  imageUrl?: string
}

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
  lineup: Artist[]
  tags?: string[]
  footage?: FootageItem[]
}

export const CALENDAR: Event[] = [
  {
    id: "carmela-pos",
    title: "Carmela × POS",
    date: "2026-05-04",
    venue: "POS",
    venueUrl: "https://www.posamsterdam.nl",
    description:
      "Carmela Collective joins forces with POS for a night of Latin underground sounds. Expect a journey through cumbia sonidera, tropicalia, and contemporary electronic beats from both sides of the Atlantic.",
    flyer: "/events/carmela-pos-26/flyer.png",
    ticketUrl: "",
    tags: ["DJ set", "Live"],
    lineup: [
      {
        id: "marian-rosas",
        name: "MarianRosas",
        origin: "Colombia",
        bio: "Cali-born selector and DJ known for weaving together Caribbean folklore and Brazilian rythms, with contemporary club sounds. Resident at Carmela since 2025, she has become one of the most sought-after DJs in Amsterdam's underground lati-american diaspora circuit. Her mixes are full of joy, percussion, it's impossible to remain sitted.",
        instagram: "@valmarino.a",
        soundcloudUrl: "https://soundcloud.com/marianrosas",
        imageUrl: "/images/artists/marianrosas.png",
      },
      {
        id: "ukab",
        name: "Ukab",
        origin: "México",
        bio: "",
        instagram: "@ukab.__dj",
        soundcloudUrl: "https://soundcloud.com/dj-ukab",
        imageUrl: "/images/artists/ukab.png",
      },
      {
        id: "faedro",
        name: "Faedro",
        origin: "Colombia - Netherlands",
        bio: "Bogotá-born DJ and sound archivist with a deep collection of Colombian folklore and coastal Caribbean rhythms. His sets travel from cumbia vallenata to champeta, always rooted in the land. Co-founder of the Bogotá-based collective Tierra Viva.",
        instagram: "@sombra.dj",
        soundcloudUrl: "https://soundcloud.com/faedro",
        imageUrl: "/images/artists/faedro.png",
      },
      {
        id: "patrick",
        name: "CameronAudio",
        origin: "Chile",
        bio: "Amsterdam-based DJ and producer whose sound bridges Latin rhythmic traditions with modern house music. Drwaing from his Chilean rootsand shaped byhis recent move to Europe. His productions focus on tightly programmed percussion, deep low-end grooves, and subtle melodic details.",
        instagram: "@spatrickcameron__audio",
        soundcloudUrl: "https://soundcloud.com/cameron59",
        imageUrl: "/images/artists/patrick.png",
      },
    ],
  },
  {
    id: "cumbia-libre",
    title: "Cumbia Libre",
    date: "2026-06-20",
    venue: "Toekomstmuziek Amsterdam",
    venueUrl: "https://www.toekomstmuziek.com",
    description:
      "An unprecedented collaboration between Carmela and Conjunto Medialuna, a clubnight fulfilled with echoes of cumbia, accordion and percussion. ",
    flyer: "/events/carmela-fugaris/flyer.png",
    tags: ["Cumbia", "Live DJ sets", "Live Music"],
    lineup: [
      {
        id: "conjunto-medialuna",
        name: "Conjunto Medialuna",
        origin: "Colombia",
        bio: "Colombia-born crate digger and radio host. Specialises in 70s Venezuelan folk, salsa dura, and tropical exotica. Her weekly show on Red Light Radio has built a loyal following across Europe. She approaches DJing as an act of cultural preservation.",
        instagram: "@ninaverde.sounds",
        soundcloudUrl: "https://soundcloud.com/ninaverdesounds",
        imageUrl: "/images/artists/nina-verde.jpg",
      },
      {
        id: "el-mago",
        name: "El Mago",
        origin: "Perú",
        bio: "Lima's finest blend of chicha psychedelica and cumbia rock. Known for unpredictable, narrative-driven sets that build over hours. He approaches each session as a live performance — a story with a beginning, middle, and a moment you'll never forget.",
        instagram: "@elmagorecords",
        soundcloudUrl: "https://soundcloud.com/elmagorecords",
        imageUrl: "/images/artists/el-mago.jpg",
      },
      {
        id: "cumbia-wrecks",
        name: "Cumbia Wrecks",
        origin: "Chile",
        bio: "Santiago-born selector pushing the boundaries between cumbia, reggaetón, and experimental club music. Prolific remixer and editor who treats records as raw material for something entirely new. Residency at Tresor Berlin since 2024.",
        instagram: "@cumbiawrecks",
        soundcloudUrl: "https://soundcloud.com/cumbiawrecks",
        imageUrl: "/images/artists/cumbia-wrecks.jpg",
      },
    ],
  },
  {
    id: "carmela-sf",
    title: "Carmela × SF",
    date: "2026-06-04",
    venue: "San Francisco Bar",
    venueUrl: "https://www.sanfranciscobar.nl",
    description:
      "Carmela Collective and San Francisco Bar present a night of Afro-Latin sounds, bringing together the Rotterdam and Amsterdam underground scenes. A meeting point between diaspora histories and club futures.",
    flyer: "/events/ddm-25/flyer.png",
    ticketUrl: "https://shelter.nl",
    tags: ["Live DJ set", "Collaboration"],
    lineup: [
      {
        id: "marian-rosas",
        name: "MarianRosas",
        origin: "Colombia",
        bio: "Cali-born selector and DJ known for weaving together Caribbean folklore and Brazilian rythms, with contemporary club sounds. Resident at Carmela since 2025, she has become one of the most sought-after DJs in Amsterdam's underground lati-american diaspora circuit. Her mixes are full of joy, percussion, it's impossible to remain sitted.",
        instagram: "@valmarino.a",
        soundcloudUrl: "https://soundcloud.com/marianrosas",
        imageUrl: "/images/artists/marianrosas.png",
      },
      {
        id: "ukab",
        name: "Ukab",
        origin: "México",
        bio: "Ukab is a DJ and selector whose sets move fluidly across borders, weaving together diasporic club sounds with a deeply intuitive sense of rhythm and rooted energy. Born and raised in Mexico, his musical language pulls from a wide spectrum of influences, spanning cumbia, guaracha, dembow, banda, pachanga to techno, breakbeat, and bass-driven electronic sounds, creating a hybrid, high-impact sound that resists fixed genre boundaries. With a strong presence across local and international underground circuits, from community radio to festivals and club spaces, Ukab has developed a practice grounded in connection, movement, and cultural exchange. His selections hold both intensity and playfulness, often blending percussive, folkloric elements with contemporary club textures to shape sets that feel both energetic and grounded.",
        instagram: "@ukab.__dj",
        soundcloudUrl: "https://soundcloud.com/dj-ukab",
        imageUrl: "/images/artists/ukab.png",
      },
      {
        id: "faedro",
        name: "Faedro",
        origin: "Colombia - Netherlands",
        bio: "Faedro is what Amsterdam-based, Colombian-born Mike Federico calls it when his search for his Afro-Latino roots starts running the mixer - percussive house spiced with baile, dembow, Caribbean lift and African weight. Every set is another step back into the ancestry: pulling from continents he's still mapping, played at the tempo of a journey. Music that wonders where one’s from and sticks around until the dancefloor answers.",
        instagram: "@_mikefederico_",
        soundcloudUrl: "https://soundcloud.com/faedro",
        imageUrl: "/images/artists/faedro.png",
      },
      {
        id: "patrick",
        name: "CameronAudio",
        origin: "Chile",
        bio: "Amsterdam-based DJ and producer whose sound bridges Latin rhythmic traditions with modern house music. Drwaing from his Chilean rootsand shaped byhis recent move to Europe. His productions focus on tightly programmed percussion, deep low-end grooves, and subtle melodic details.",
        instagram: "@spatrickcameron__audio",
        soundcloudUrl: "https://soundcloud.com/cameron59",
        imageUrl: "/images/artists/patrick.png",
      },
    ],
  },
 
]
