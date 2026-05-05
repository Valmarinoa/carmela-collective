// data.ts
import type { FloatingImageItem, Archive } from "@/types/index";

// Calendar Events
export const calendar = [
  {
    id: '1',
    date: 'April 4',
    city: 'Amsterdam',
    title: 'Carmela x POS',
    subtitle: 'Fundraiser Event',
    href: '#',
  },
  {
    id: '2',
    date: 'May 4',
    city: 'Amsterdam',
    title: 'Vinilazo Carmela',
    subtitle: 'Vinil Event',
    href: '#',
  },
  {
    id: '3',
    date: 'May 19',
    city: 'Amsterdam',
    title: 'Carmela x SF',
    subtitle: 'Dance Evening',
    href: '#',
  },
  {
    id: '4',
    date: 'June 4',
    city: 'Amsterdam',
    title: 'Carmela en Salsa',
    subtitle: 'Salsa Vinils',
    href: '#',
  },
]

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
    description: 'Event production and project processes manager, ensuring that each programme is executed with intention, clarity, and strong organizational flow.',
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

export const archive: Archive[] = [
  {
    id: '0',
    title: 'Carmela x POS',
    category: 'APR 2026',
    description:'',
    image: '/images/events/carmela-pos-26.png',
    objectFit: 'contain',  // image will use object-contain
   igHandle: ''
  },
  {
    id: '1',
    title: 'Carmela Fugaris',
    category: 'DEC 2025',
    description:'',
    image: '/images/events/carmela-fugaris.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
  },

  {
    id: '2',
    title: 'Dia de los Muertos',
    category: 'NOV 2025',
    description:'',
    image: '/images/events/ddm-25.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
  }, 

  {
    id: '3',
    title: 'Carmela x SevenEleven',
    category: 'OCT 2025',
    description: 'Underground nightclub experience with curated music programming.',
    mediaType: 'video',
    video: '/images/events/radiradio-archive.mp4',
    objectFit: 'cover',  // video with contain
    igHandle: ''
  },
 
   {
    id: '4',
    title: 'Carmela Genesis',
    category: 'SEPT 2025',
    description:'',
    image: '/images/events/carmela-sept-25.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
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