// data.ts
import type { FloatingImageItem, Event } from "@/types/index";
import { a } from './artists'

export const members = [
  {
    id: '1',
    title: 'Monse Alvarez',
    category: 'Marketing, New Media & Digital Comms',
    description: 'Oversees Carmela’s overall communications strategy, ensuring a cohesive narrative across all platforms. She leads content development and manages digital communication channels. ',
    image: '/images/monse.png',
    nationality:'México',
    igLink: 'https://instagram.com/pokemonse',
    igHandle:'@pokemonse'
  },
  {
    id: '2',
    title: 'Adrian Figueroa',
    category: 'Music & Cultural Programming',
    description: 'Event production and project processes manager, guiding each programme with intention, clarity, and a strong organizational flow, while leading artist bookings and thoughtfully curating the musical identity of Carmela, shaping lineups and sonic direction in a way that reflects the collective’s vision, atmosphere, and evolving creative language.',
    image: '/images/adrian.png',
    nationality:'México',
    igLink: 'https://instagram.com/ukab.__dj',
    igHandle:'@ukab.__dj'
  },
  {
    id: '5',
    title: 'Valentina Marino',
    category: 'Experience Designer & Developer',
    description: 'Leading creative digital strategies, enhancing our online presence, and ensuring accessible, engaging web experiences. Her technical skills and creative vision help translate Carmela’s identity into innovative, community-centered digital touchpoints.',
    image: '/images/val.png',
    nationality:'Colombia',
    igLink: 'https://instagram.com/valmarino.a', 
    igHandle:'@valmarino.a'
  },
  {
    id: '3',
    title: 'Juliana Erazo',
    category: 'Filmmaker & Visual Artist',
    description: 'Manages Carmela’s visual identity and presence through various digital and traditional channels. She is responsible for creating artwork and visual assets that capture the collective’s identity and values.',
    image: '/images/juliana.png',
    nationality:'Colombia',
    igLink: 'https://instagram.com/julianaerazo__',
    igHandle:'@julianaerazo__'
  }, 
  
  {
    id: '4',
    title: 'Patrick Kimber',
    category: 'DJ & Producer',
    description: 'Supports musical curation and artist booking, bringing deep knowledge of Latin American electronic and experimental music. His role focuses on shaping Carmela’s sonic identity through high-quality diverse programming that reflects contemporary Latin American creativity.',
    image: '/images/patrick.png',
    nationality:'Chile',
    igLink: 'https://instagram.com/patrickcameron__audio', 
    igHandle:'@patrickcameron__audio'
  },
 
  {
    id: '6',
    title: 'Mike Federico',
    category: 'DJ & Producer',
    description: 'Contributes to the curatorial vision by bridging Latin American and European artistic contexts. He supports artist booking, programme design, and the development of culturally diverse and multidisciplinary lineups.',
    image: '/images/mike.png',
    nationality:'Netherlands | Colombia',
    igLink: 'https://instagram.com/_mikefederico___', 
    igHandle:'@_mikefederico___'
  },
  {
    id: '7',
    title: 'Andrea Fischer',
    category: 'Cultural Event Logistics & Coordination',
    description: 'Responsible for event logistics, coordinating food, drinks, and essential operational tasks to ensure each event runs smoothly. She plays a key role in creating welcoming, safe, and well-organized community spaces.',
    image: '/images/andrea.png',
    nationality:'Chile',
    igLink: 'https://instagram.com/andreafischert', 
    igHandle:'@andreafischert'
  },

  {
    id: '8',
    title: 'Silvia Oviedo',
    category: 'Artist & Researcher',
    description: 'Supports all aspects of event logistics, including hospitality, onsite coordination, and material preparation. Her work ensures operational efficiency and helps create warm, culturally rooted environments for participants and audiences.',
    image: '/images/silvia.png',
    nationality:'Colombia',
    igLink: 'https://instagram.com/silvisalvaje', 
    igHandle:'@silvisalvaje'
  },
]

/**
 * Single source of truth for all Carmela events.
 * Routing is date-based (see getUpcomingEvents / getArchiveEvents in calendarData):
 * - date >= today → Calendar
 * - date < today  → Archive
 */
export const events: Event[] = [
  {
    id: 'carmela-boogieBos',
    title: 'Carmela at Boogie Bos',
    date: '2026-07-25',
    venue: 'Ruigoord Festival',
    venueUrl: 'https://www.instagram.com/boogiemovement_ruigoord',
    venueAddress: 'Ruigoord, Amsterdam',
    description:
      "We're excited to bring Carmela to Boogie Bos. A suitcase full of cumbia, salsa, chucucú, rebajada and other tropical treasures. Each record carries stories, memories and rhythms that have crossed oceans and borders. Together, they invite strangers onto the same dancefloor, where music becomes a language we all share. See you on the dancefloor.",
    flyer: '/events/carmela-ruigoord/flyer.png',
    objectFit: 'cover',
    tags: ['Live DJ set'],
    lineup: [
      { id: 'ruigoord-tresde', isB2B: false, artists: [a('tresde')] },
      { id: 'ruigoord-ukab', isB2B: false, artists: [a('ukab')] },
    ],
  },
  {
    id: 'carmela-chenin',
    title: 'Carmela X CheninChenin',
    date: '2026-06-27',
    venue: 'Chenin Chenin',
    venueUrl: 'https://cheninchenin.com/',
    description:
      'DJ buenosdiaz invites the Carmela Collective for an afternoon of sharing music and wine sipping. Join Chenin Chenin, the natural wine bar located at the heart of Amsterdam, or tune in online through Radio Chenin Chenin.',
    flyer: '/events/carmela-cheninchenin/flyer.png',
    objectFit: 'contain',
    tags: ['DJ set', 'Live', 'Natural Wine'],
    lineup: [
      { id: 'chenin-marianrosas', isB2B: false, artists: [a('marianrosas')], note: 'Brasilian Grooves' },
      { id: 'chenin-tresde', isB2B: false, artists: [a('tresde')], note: 'Bass/Tribal/Latincore' },
      { id: 'chenin-cameron', isB2B: false, artists: [a('cameronaudio')] },
      { id: 'chenin-ukab', isB2B: false, artists: [a('ukab')], note: 'Bass/Tribal/Latincore' },
    ],
  },
  {
    id: 'cumbia-libre',
    title: 'Cumbia Libre',
    date: '2026-06-20',
    venue: 'Toekomstmuziek Amsterdam',
    venueUrl: 'https://www.toekomstmuziek.com/agenda/',
    ticketUrl: 'https://bash.social/toekomstmuziek?eventId=276616',
    description:
      'An unprecedented collaboration between Carmela and Conjunto Medialuna, a clubnight fulfilled with echoes of cumbia, accordion and percussion. ',
    flyer: '/events/carmela-cumbialibre/flyer.png',
    tags: ['Cumbia', 'Live DJ sets', 'Live Music'],
    lineup: [
      { id: 'cl-medialuna', isB2B: false, artists: [a('conjuntomedialuna')] },
      { id: 'cl-ukab', isB2B: false, artists: [a('ukab')] },
      { id: 'cl-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'cl-tresde', isB2B: false, artists: [a('tresde')] },
    ],
  },
  {
    id: 'carmela-sf',
    title: 'Carmela × SF',
    date: '2026-06-04',
    venue: 'San Francisco Bar',
    venueUrl: 'https://www.instagram.com/sfamsterdam',
    description:
      'Carmela Collective and San Francisco Bar present a night of Afro-Latin sounds, bringing together the Rotterdam and Amsterdam underground scenes. A meeting point between diaspora histories and club futures.',
    flyer: '/events/carmela-sf/footage/flyer.png',
    tags: ['Live DJ set', 'Collaboration'],
    lineup: [
      { id: 'sf-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'sf-ukab', isB2B: false, artists: [a('ukab')] },
      { id: 'sf-faedro', isB2B: false, artists: [a('faedro')] },
      { id: 'sf-cameron', isB2B: false, artists: [a('cameronaudio')] },
    ],
  },
  {
    id: 'carmela-pos-26',
    title: 'Carmela x POS',
    date: '2026-04-04',
    venue: 'Possibilities Open Studio',
    venueAddress: 'Centrale Groothandelsmarkt 186, 1051 LJ Amsterdam',
    description:
      'On April 4th we gathered once more at possibilities open studio for a very special edition — a fundraiser to support and give visibility to the Venezuelan and Mexican communities. Las Patronas are a group of volunteer women who have fed migrants traveling aboard La Bestia for over 30 years. Zona De Descarg is a cultural and urban activism platform in Petare, Caracas. During the night we showcased projects from Roba Cámara and Café Petare Blu, alongside works from Venezuelan and Latin American artists, and the screening programme "Hints of Hogar" in collaboration with Latin Quarter.',
    flyer: '/events/carmela-pos-26/flyer.png',
    objectFit: 'cover',
    tags: ['Fundraiser'],
    lineup: [],
  },
  {
    id: 'mestizaund-ed1',
    title: 'Mestizaund x Echobox',
    date: '2026-03-26',
    venue: 'Echobox Radio',
    description:
      'Mestizaund by Carmela Collective is a show exploring Latin American rhythms: their origins, migrations, and transformations. Blending cumbia, salsa, bolero and electronic sounds into a danceable sonic journey through culture, history, and diaspora.',
    flyer: '/events/mestizaund-ed1/flyer.png',
    objectFit: 'cover',
    type: 'radio',
    listenUrl: 'https://www.echobox.radio/shows/mestizaund?episode=2026-03-26%2021:00:00',
    tags: ['Radio Show'],
    lineup: [],
  },
  {
    id: 'carmela-fugaris',
    title: 'Carmela Fugaris',
    date: '2025-11-29',
    venue: 'possibilities open studio',
    venueAddress: 'Centrale Groothandelsmarkt 186, 1051 LJ Amsterdam',
    description:
      'We returned to where it all started, possibilities open studio, on Saturday November 29, for another amazing party. Carmela Cocina was present again, bringing authentic Venezuelan arepas, and our highly praised Palomas.',
    flyer: '/events/carmela-fugaris/flyer.png',
    objectFit: 'contain',
    lineup: [
      { id: 'fugaris-alexia', isB2B: false, artists: [a('alexiacalderon')], note: 'Performance' },
      { id: 'fugaris-raices', isB2B: false, artists: [a('raices')] },
      { id: 'fugaris-thy', isB2B: false, artists: [a('thydamore')] },
      { id: 'fugaris-licuadito', isB2B: false, artists: [a('djlicuaditomix')] },
      { id: 'fugaris-faedro', isB2B: false, artists: [a('faedro')] },
      { id: 'fugaris-hm', isB2B: false, artists: [a('hiddenmemory')] },
      { id: 'fugaris-pico', isB2B: false, artists: [a('picosoundsystem')] },
    ],
    footage: [
      { id: 'fugaris-0', type: 'image', img: '/events/carmela-fugaris/fulgaris.png', height: 380 },
      { id: 'fugaris-1', type: 'image', img: '/events/carmela-fugaris/01.png', height: 480 },
      { id: 'fugaris-2', type: 'image', img: '/events/carmela-fugaris/02.png', height: 340 },
      { id: 'fugaris-3', type: 'image', img: '/events/carmela-fugaris/03.png', height: 520 },
      { id: 'fugaris-4', type: 'image', img: '/events/carmela-fugaris/04.png', height: 300 },
      { id: 'fugaris-5', type: 'image', img: '/events/carmela-fugaris/05.png', height: 460 },
      { id: 'fugaris-6', type: 'image', img: '/events/carmela-fugaris/06.png', height: 350 },
      { id: 'fugaris-7', type: 'image', img: '/events/carmela-fugaris/07.png', height: 500 },
      { id: 'fugaris-8', type: 'image', img: '/events/carmela-fugaris/08.png', height: 420 },
      { id: 'fugaris-9', type: 'image', img: '/events/carmela-fugaris/09.png', height: 310 },
      { id: 'fugaris-10', type: 'image', img: '/events/carmela-fugaris/10.png', height: 440 },
      { id: 'fugaris-11', type: 'image', img: '/events/carmela-fugaris/11.png', height: 370 },
      { id: 'fugaris-12', type: 'image', img: '/events/carmela-fugaris/12.png', height: 490 },
      { id: 'fugaris-13', type: 'image', img: '/events/carmela-fugaris/13.png', height: 320 },
    ],
  },
  {
    id: 'ddm-25',
    title: 'Carmela Presents: Día de Muertos',
    date: '2025-11-02',
    venue: 'Noordspace',
    venueAddress: 'Gedempt Hamerkanaal 96, 1021 KR Amsterdam',
    description:
      'Carmela celebrated a very special night; Día de Muertos, presented at Noordspace. On November 2nd, we celebrated the very special Mexican tradition of honouring the lives of those who came before us and our roots through remembrance, art, and sound. We showcased audiovisual art, DJ sets, and a listening session, and we invited the audience to participate in the creation of a traditional Día de Muertos altar. We had delicious Pan de Muerto (traditional sweet bread) and Mexican hot chocolate. Soundsystem provided by Sol Systems.',
    flyer: '/events/ddm-25/flyer.png',
    objectFit: 'contain',
    tags: ['Cultural Event'],
    lineup: [
      { id: 'ddm-tresde', isB2B: false, artists: [a('tresde')] },
      { id: 'ddm-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'ddm-sebvc', isB2B: false, artists: [a('sebastianvasquezcipriani')] },
      { id: 'ddm-juliand', isB2B: false, artists: [a('juliant')] },
      { id: 'ddm-cameron', isB2B: false, artists: [a('cameronaudio')] },
      { id: 'ddm-nicoba', isB2B: false, artists: [a('nicoba')] },
      { id: 'ddm-ukab', isB2B: false, artists: [a('ukab')] },
    ],
    footage: [
      { id: 'ddm-1', type: 'image', img: '/events/ddm-25/01.png', height: 480 },
      { id: 'ddm-2', type: 'image', img: '/events/ddm-25/02.png', height: 340 },
      { id: 'ddm-3', type: 'image', img: '/events/ddm-25/03.png', height: 520 },
      { id: 'ddm-4', type: 'image', img: '/events/ddm-25/04.png', height: 380 },
      { id: 'ddm-5', type: 'image', img: '/events/ddm-25/05.png', height: 300 },
      { id: 'ddm-6', type: 'image', img: '/events/ddm-25/06.png', height: 460 },
      { id: 'ddm-7', type: 'image', img: '/events/ddm-25/07.png', height: 440 },
      { id: 'ddm-8', type: 'image', img: '/events/ddm-25/08.png', height: 310 },
      { id: 'ddm-9', type: 'image', img: '/events/ddm-25/09.png', height: 500 },
      { id: 'ddm-10', type: 'image', img: '/events/ddm-25/10.png', height: 420 },
      { id: 'ddm-11', type: 'image', img: '/events/ddm-25/11.png', height: 350 },
      { id: 'ddm-12', type: 'image', img: '/events/ddm-25/12.png', height: 470 },
    ],
  },
  {
    id: 'carmela-seven-eleven',
    title: 'Carmela x SevenEleven',
    date: '2025-10-17',
    venue: 'SevenEleven',
    venueAddress: 'Pazzanistraat 3, 1014 DB Amsterdam',
    description:
      'Carmela took over the SevenEleven Radio Bar on Friday October 17th, setting the mood before the RadioRadio club night. From 19 to 23, we brought our blend of sounds, boleros, brasilidades, salsa, cumbia dub, latin club, latin bass and other tropical sound waves, slowly taking their space into the Amsterdam nightlife.',
    mediaType: 'video',
    video: '/events/carmela-seven-eleven/footage/video.mp4',
    objectFit: 'cover',
    tags: ['Guest Set'],
    lineup: [
      { id: 'se-marianrosas', isB2B: false, artists: [a('marianrosas')] },
      { id: 'se-faedro-cameron', isB2B: true, artists: [a('faedro'), a('cameronaudio')] },
      { id: 'se-ukab', isB2B: false, artists: [a('ukab')] },
    ],
    footage: [
      { id: 'seven-eleven-1', type: 'video', img: '/events/carmela-seven-eleven/footage/video.mp4', height: 440 },
      { id: 'seven-eleven-2', type: 'image', img: '/events/carmela-seven-eleven/footage/virgen.png', height: 480 },
      { id: 'seven-eleven-3', type: 'image', img: '/events/carmela-seven-eleven/footage/poster-radioradio.png', height: 380 },
    ],
  },
  {
    id: 'carmela-sept-25',
    title: 'Carmela Collective @ POS',
    date: '2025-09-20',
    venue: 'possibilities open studio',
    venueAddress: 'Centrale Groothandelsmarkt 186, 1051 LJ Amsterdam',
    description:
      'Where it all started. We introduced Carmela, a new collective bringing Latin American culture, diversity and creativity. Showcasing contemporary and rooted sounds, flavors, music, and community through the vision of the Latam diaspora in new, experimental ways. On the first gathering at POS we shared music from boleros to eclectic cumbia, latincore, and live performances. And of course, there is no Latin party without delicious food and drinks provided by La Cocina de Carmela. We enjoyed authentic Ceviche with a Pisco Sour.',
    flyer: '/events/carmela-sept-25/flyer.png',
    objectFit: 'contain',
    tags: ['Launch Party'],
    lineup: [
      { id: 'gen-marian-faedro', isB2B: true, artists: [a('marianrosas'), a('faedro')], note: 'Boleros & Brasilidades' },
      { id: 'gen-lagrima', isB2B: false, artists: [a('lagrima')], note: 'Paling Cumbia live' },
      { id: 'gen-silvia', isB2B: false, artists: [a('silviaoviedo')], note: 'Poetry' },
      { id: 'gen-nene', isB2B: false, artists: [a('nenemone')], note: 'Percussion live' },
      { id: 'gen-jonathan-marian', isB2B: true, artists: [a('jonathancastro'), a('marianrosas')], note: 'Lo-Fi Eclectic Cumbia & Salsa Dura' },
      { id: 'gen-ukab-faedro-tres', isB2B: true, artists: [a('ukab'), a('faedro'), a('tresde')], note: 'Bass/Tribal/Latincore' },
    ],
    footage: [
      { id: 'sept-25-1', type: 'image', img: '/events/carmela-sept-25/01.png', height: 480 },
      { id: 'sept-25-2', type: 'image', img: '/events/carmela-sept-25/02.png', height: 340 },
      { id: 'sept-25-3', type: 'image', img: '/events/carmela-sept-25/03.png', height: 520 },
      { id: 'sept-25-4', type: 'image', img: '/events/carmela-sept-25/04.png', height: 380 },
      { id: 'sept-25-5', type: 'image', img: '/events/carmela-sept-25/05.png', height: 300 },
      { id: 'sept-25-6', type: 'image', img: '/events/carmela-sept-25/06.png', height: 460 },
      { id: 'sept-25-7', type: 'image', img: '/events/carmela-sept-25/07.png', height: 440 },
      { id: 'sept-25-8', type: 'image', img: '/events/carmela-sept-25/08.png', height: 310 },
      { id: 'sept-25-9', type: 'image', img: '/events/carmela-sept-25/09.png', height: 500 },
      { id: 'sept-25-10', type: 'image', img: '/events/carmela-sept-25/10.png', height: 420 },
      { id: 'sept-25-11', type: 'image', img: '/events/carmela-sept-25/11.png', height: 350 },
      { id: 'sept-25-12', type: 'image', img: '/events/carmela-sept-25/12.png', height: 470 },
      { id: 'sept-25-ceviche', type: 'image', img: '/events/carmela-sept-25/ceviche.png', height: 420 },
    ],
  },
]

// data.ts
export const floatingImages: FloatingImageItem[] = [
  // Desktop values remain exactly as you originally had them
  // Mobile values use left/right for better control
  
  {
    id: "1",
    mediaType: "image",
    src: "/images/ddm.png",
    alt: "DDM",
    position: { x: "12%", y: "20%" },        // Desktop
    size: { width: 280, height: 300 },       // Desktop
    parallaxSpeed: 0.3,
    mobile: {
      position: { left: "5%", y: "10%" },    // Mobile: use left instead of x
      size: { width: 180, height: 193 },     // Mobile: scaled down
    },
  },
  {
    id: "1.1",
    mediaType: "image",
    src: "/images/ddm-1.png",
    alt: "DDM detail",
    position: { x: "6%", y: "30%" },         // Desktop
    size: { width: 200, height: 220 },       // Desktop
    parallaxSpeed: 0.3,
    mobile: {
      position: { left: "0%", y: "22%" },
      size: { width: 140, height: 154 },
    },
  },

  {
    id: "2",
    mediaType: "video",
    vid: "/images/radioradio-vid.mp4",
    alt: "Poster RadioRadio",
    position: { x: "74%", y: "25%" },        // Desktop
    size: { width: 320, height: 220 },       // Desktop
    parallaxSpeed: 0.5,
    mobile: {
      position: { right: "0%", y: "28%" },    // Mobile: use right to anchor from right edge
      size: { width: 200, height: 238 },
    },
  },
  {
    id: "2.2",
    mediaType: "image",
    src: "/images/carmela-radioradio.png",
    alt: "Carmela RadioRadio",
    position: { x: "57%", y: "29%" },        // Desktop
    size: { width: 380, height: 380 },       // Desktop
    parallaxSpeed: 0.5,
    mobile: {
      position: { right: "12%", y: "40%" },  // Can go slightly off-screen if needed
      size: { width: 250, height: 220 },
    },
  },
  {
    id: "6",
    mediaType: "image",
    src: "/images/pos.png",
    alt: "Project 6",
    position: { x: "60%", y: "72%" },        // Desktop
    size: { width: 350, height: 380 },       // Desktop
    parallaxSpeed: 0.45,
    mobile: {
      position: { left: "45%", y: "85%" },
      size: { width: 200, height: 217 },
    },
  },
  {
    id: "6.1",
    mediaType: "image",
    src: "/images/ceviche.png",
    alt: "ceviche",
    position: { x: "70%", y: "58%" },        // Desktop
    size: { width: 240, height: 320 },       // Desktop
    parallaxSpeed: 0.4,
    mobile: {
      position: { right: "5%", y: "72%" },
      size: { width: 160, height: 213 },
    },
  },

  {
    id: "4",
    mediaType: "image",
    src: "/images/fulgaris.png",
    alt: "Fulgaris",
    position: { x: "14%", y: "75%" },        // Desktop
    size: { width: 300, height: 200 },       // Desktop
    parallaxSpeed: 0.6,
    mobile: {
      position: { left: "7%", y: "70%" },
      size: { width: 250, height: 156 },
    },
  },
  {
    id: "4.1",
    mediaType: "image",
    src: "/images/fugaris-title.png",
    alt: "Fulgaris title",
    position: { x: "17.5%", y: "70%" },      // Desktop
    size: { width: 200, height: 120 },       // Desktop
    parallaxSpeed: 0.6,
    mobile: {
      position: { left: "2%", y: "66%" },
      size: { width: 150, height: 90 },
    },
  },
  {
    id: "5",
    mediaType: "image",
    src: "/images/sticker.png",
    alt: "Project 5",
    position: { x: "25%", y: "85%" },        // Desktop
    size: { width: 300, height: 340 },       // Desktop
    parallaxSpeed: 0.35,
    mobile: {
      position: { left: "0%", y: "95%" },
      size: { width: 220, height: 254 },
    },
  },
];