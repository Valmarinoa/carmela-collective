// data.ts
import type { FloatingImageItem, Archive } from "@/types/index";

// Calendar Events
export const events = [
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
    description: 'A refreshing hard seltzer brand with a strategic marketing approach and distinctive visual identity.',
    image: '/images/monse.png',
    igHandle:''
  },
  {
    id: '2',
    title: 'Adrian Figueroa',
    category: 'Music & Cultural Programming',
    description: 'Cheri (Cherry in Japanese) is a multi-level Japanese-fusion tapas dining and drinks upstairs and an underground nightclub.',
    image: '/images/adrian.png',
     igHandle:''
  },
  {
    id: '3',
    title: 'Juliana Erazo',
    category: 'Filmmaker & Visual Artist',
    description: 'El Sabor - "The Flavour" Tapas Bar is a traditional Spanish restaurant and bar with a contemporary twist.',
    image: '/images/juliana.png',
     igHandle:''
  }, 
  {
    id: '5',
    title: 'Valentina Marino',
    category: 'Art Direction & Developer',
    description: 'Myles Club for Runners is a vibrant community of running enthusiasts who share a passion for fitness and social connection.',
    image: '/images/val.png',
     igHandle:''
  },
  {
    id: '4',
    title: 'Patrick Kimber',
    category: 'DJ & Producer',
    description: 'Leap Frog Landscapes is a modern and fresh Landscaping company that prides themselves on being vibrant and friendly.',
    image: '/images/patrick.png',
     igHandle:''
  },
 
  {
    id: '6',
    title: 'Mike Federico',
    category: 'DJ & Producer',
    description: 'Back 2 Balance Counseling empowers individuals towards holistic wellness through compassionate and personalized mental health counseling.',
    image: '/images/mike.png',
     igHandle:''
  },
  {
    id: '7',
    title: 'Andrea Fischer',
    category: 'Cultural Event Logistics & Coordination',
    description: 'First Thing Coffee House is a casual cafe venue located in suburbs with a cozy and welcoming energy.',
    image: '/images/andrea.png',
     igHandle:''
  },

  {
    id: '8',
    title: 'Silvia Oviedo',
    category: 'Artist & Researcher',
    description: 'First Thing Coffee House is a casual cafe venue located in suburbs with a cozy and welcoming energy.',
    image: '/images/silvia.png',
     igHandle:''
  },
]

export const archive: Archive[] = [
  {
    id: '0',
    title: 'Carmela x POS',
    category: 'Marketing, New Media & Digital Comms',
    description: 'A refreshing hard seltzer brand with a strategic marketing approach.',
    image: '/images/events/carmela-pos-26.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
  },
  {
    id: '1',
    title: 'Carmela Fugaris',
    category: 'Marketing, New Media & Digital Comms',
    description: 'A refreshing hard seltzer brand with a strategic marketing approach.',
    image: '/images/events/carmela-fugaris.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
  },

  {
    id: '2',
    title: 'Dia de los Muertos',
    category: 'Marketing, New Media & Digital Comms',
    description: 'A refreshing hard seltzer brand with a strategic marketing approach.',
    image: '/images/events/ddm-25.png',
    objectFit: 'contain',  // image will use object-contain
    igHandle: ''
  }, 

  {
    id: '3',
    title: 'Carmela x SevenEleven',
    category: 'Events',
    description: 'Underground nightclub experience with curated music programming.',
    mediaType: 'video',
    video: '/images/events/radiradio-archive.mp4',
    objectFit: 'cover',  // video with contain
    igHandle: ''
  },
 
   {
    id: '4',
    title: 'Carmela Genesis',
    category: 'Marketing, New Media & Digital Comms',
    description: 'A refreshing hard seltzer brand with a strategic marketing approach.',
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
    id: "3",
    mediaType: "image",
    src: "/images/xx.png",
    alt: "XX",
    position: { x: "70%", y: "50%" },        // Desktop
    size: { width: 240, height: 320 },       // Desktop
    parallaxSpeed: 0.4,
    mobile: {
      position: { right: "10%", y: "48%" },
      size: { width: 200, height: 200 },
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
    position: { x: "70%", y: "60%" },        // Desktop
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