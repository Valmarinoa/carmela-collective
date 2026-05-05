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
  description: string
  flyer?: string
  ticketUrl?: string
  lineup: Artist[]
  tags?: string[]
}

export const CALENDAR: Event[] = [
  {
    id: "carmela-pos",
    title: "Carmela × POS",
    date: "2026-05-04",
    venue: "POS",
    description:
      "Carmela Collective joins forces with POS for a night of Latin underground sounds. Expect a journey through cumbia sonidera, tropicalia, and contemporary electronic beats from both sides of the Atlantic.",
    flyer: "/images/events/carmela-pos-26.png",
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
    description:
      "An unprecedented collaboration between Carmela and Conjunto Medialuna, a clubnight fulfilled with echoes of cumbia, accordion and percussion. ",
    flyer: "/images/events/carmela-fugaris.png",
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
    description:
      "Carmela Collective and San Francisco Bar present a night of Afro-Latin sounds, bringing together the Rotterdam and Amsterdam underground scenes. A meeting point between diaspora histories and club futures.",
    flyer: "/images/events/ddm-25.png",
    ticketUrl: "https://shelter.nl",
    tags: ["Live DJ set", "Collaboration"],
    lineup: [
      {
        id: "patrick",
        name: "CameronAudio",
        origin: "Chile",
        bio: "Rio de Janeiro-based multi-instrumentalist and DJ. Brings live percussion into club sets, blending candomblé rhythms with contemporary dance music. His live-hybrid format — two turntables and a kit — is completely his own.",
        instagram: "@axesantos",
        soundcloudUrl: "https://soundcloud.com/axesantos",
        imageUrl: "/images/artists/axe-santos.jpg",
      },
      {
        id: "petra-sf",
        name: "Petra (SF)",
        origin: "Nederland",
        bio: "Rotterdam-based selector and founder of Stadsfreug. Champions the intersection of Dutch club culture and global south music. A long-time collaborator and close friend of the collective.",
        instagram: "@petra.stadsfreug",
        soundcloudUrl: "https://soundcloud.com/petrasf",
        imageUrl: "/images/artists/petra-sf.jpg",
      },
      {
        id: "la-bruja",
        name: "La Bruja",
        origin: "México",
        bio: "México City-born selector and producer known for weaving together cumbia sonidera with contemporary club sounds. Resident at Carmela since 2022.",
        instagram: "@labruja.mx",
        soundcloudUrl: "https://soundcloud.com/labrujamx",
        imageUrl: "/images/artists/la-bruja.jpg",
      },
    ],
  },
  {
    id: "carmela-en-salsa",
    title: "Carmela en Salsa",
    date: "2026-07-12",
    venue: "Paradiso Amsterdam",
    description:
      "An afternoon dedicated to the golden era of salsa. Live band, dance workshops on the main floor, and a long table feast. A gathering for dancers and listeners alike — bring your best shoes and your appetite.",
    flyer: "/images/events/carmela-sept-25.png",
    ticketUrl: "https://paradiso.nl",
    tags: ["Live band", "Dance", "Afternoon"],
    lineup: [
      {
        id: "orquesta-carmela",
        name: "Orquesta Carmela",
        origin: "Amsterdam",
        bio: "The collective's in-house ensemble, bringing together musicians from Colombia, Cuba, Puerto Rico, and the Netherlands. Their repertoire spans Fania classics, original compositions, and unexpected covers played with joy and precision.",
        instagram: "@orquestacarmela",
        soundcloudUrl: "https://soundcloud.com/orquestacarmela",
        imageUrl: "/images/artists/orquesta-carmela.jpg",
      },
      {
        id: "nina-verde",
        name: "Niña Verde",
        origin: "Venezuela",
        bio: "Caracas-born crate digger and radio host. Specialises in 70s Venezuelan folk, salsa dura, and tropical exotica.",
        instagram: "@ninaverde.sounds",
        soundcloudUrl: "https://soundcloud.com/ninaverdesounds",
        imageUrl: "/images/artists/nina-verde.jpg",
      },
      {
        id: "luna-negra",
        name: "Luna Negra",
        origin: "Argentina",
        bio: "Buenos Aires producer and DJ known for hypnotic, slow-burning sets. Has released on Perlon and a number of independent European labels. Her music exists at the edge of time — patient, inevitable.",
        instagram: "@lunanegra.baires",
        soundcloudUrl: "https://soundcloud.com/lunanegrabaires",
        imageUrl: "/images/artists/luna-negra.jpg",
      },
    ],
  },
  {
    id: "noche-tropical",
    title: "Noche Tropical",
    date: "2026-07-26",
    venue: "OT301 Amsterdam",
    description:
      "Carmela's summer night — six hours of tropical rhythms, cold drinks, and the kind of warmth that only comes when the music is right. A celebration of everything that brought us here.",
    flyer: "/images/events/ddm-25.png",
    ticketUrl: "https://ot301.nl",
    tags: ["DJ set", "Live", "Summer"],
    lineup: [
      {
        id: "sombra",
        name: "Sombra",
        origin: "Colombia",
        bio: "Bogotá-born DJ and sound archivist with a deep collection of Colombian folklore and coastal Caribbean rhythms. Co-founder of the Bogotá-based collective Tierra Viva.",
        instagram: "@sombra.dj",
        soundcloudUrl: "https://soundcloud.com/sombradj",
        imageUrl: "/images/artists/sombra.jpg",
      },
      {
        id: "teto-calypso",
        name: "Teto Calypso",
        origin: "Brasil",
        bio: "São Paulo native blending baile funk rhythms with electronic production. Has released on Berlin-based labels and toured extensively across Europe.",
        instagram: "@tetocalypso",
        soundcloudUrl: "https://soundcloud.com/tetocalypso",
        imageUrl: "/images/artists/teto-calypso.jpg",
      },
      {
        id: "axe-santos",
        name: "Axé Santos",
        origin: "Brasil",
        bio: "Rio de Janeiro-based multi-instrumentalist and DJ. Brings live percussion into club sets, blending candomblé rhythms with contemporary dance music.",
        instagram: "@axesantos",
        soundcloudUrl: "https://soundcloud.com/axesantos",
        imageUrl: "/images/artists/axe-santos.jpg",
      },
    ],
  },
  {
    id: "carmela-closing",
    title: "Carmela Closing",
    date: "2026-08-15",
    venue: "Warehouse Elementenstraat",
    description:
      "The end of the season. Carmela closes the year the only way it knows — with friends, with music that matters, and with a gratitude that can only be expressed through sound. See you next time.",
    flyer: "/images/events/carmela-sept-25.png",
    ticketUrl: "https://ra.co",
    tags: ["DJ set", "Closing", "Marathon"],
    lineup: [
      {
        id: "la-bruja",
        name: "La Bruja",
        origin: "México",
        bio: "México City-born selector and producer known for weaving together cumbia sonidera with contemporary club sounds. Resident at Carmela since 2022.",
        instagram: "@labruja.mx",
        soundcloudUrl: "https://soundcloud.com/labrujamx",
        imageUrl: "/images/artists/la-bruja.jpg",
      },
      {
        id: "luna-negra",
        name: "Luna Negra",
        origin: "Argentina",
        bio: "Buenos Aires producer and DJ known for hypnotic, slow-burning sets. Her music exists at the edge of time — patient, inevitable.",
        instagram: "@lunanegra.baires",
        soundcloudUrl: "https://soundcloud.com/lunanegrabaires",
        imageUrl: "/images/artists/luna-negra.jpg",
      },
      {
        id: "el-mago",
        name: "El Mago",
        origin: "Perú",
        bio: "Lima's finest blend of chicha psychedelica and cumbia rock. Known for unpredictable, narrative-driven sets that build over hours.",
        instagram: "@elmagorecords",
        soundcloudUrl: "https://soundcloud.com/elmagorecords",
        imageUrl: "/images/artists/el-mago.jpg",
      },
      {
        id: "cumbia-wrecks",
        name: "Cumbia Wrecks",
        origin: "Chile",
        bio: "Santiago-born selector pushing the boundaries between cumbia, reggaetón, and experimental club music. Residency at Tresor Berlin since 2024.",
        instagram: "@cumbiawrecks",
        soundcloudUrl: "https://soundcloud.com/cumbiawrecks",
        imageUrl: "/images/artists/cumbia-wrecks.jpg",
      },
    ],
  },
]
