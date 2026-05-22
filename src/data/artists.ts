import type { Artist } from '@/types/index'

// Central registry of all artist profiles.
// Add new artists here — reference them in lineups via a('artistname').
export const ARTISTS: Record<string, Artist> = {

  // ── Core residents / recurring ──────────────────────────────────────────
  'marianrosas': {
    id: 'marianrosas',
    name: 'MarianRosas',
    origin: 'Colombia',
    bio: "Cali-born selector and DJ known for weaving together Caribbean folklore and Brazilian rhythms with contemporary club sounds. Resident at Carmela since 2025, she has become one of the most sought-after DJs in Amsterdam's underground Latin-American diaspora circuit. Her mixes are full of joy, percussion — it's impossible to remain seated.",
    instagram: '@valmarino.a',
    soundcloudUrl: 'https://soundcloud.com/marianrosas',
    imageUrl: '/images/artists/marianrosas.png',
  },

  'ukab': {
    id: 'ukab',
    name: 'Ukab',
    origin: 'México',
    bio: "Ukab is a DJ and selector whose sets move fluidly across borders, weaving together diasporic club sounds with a deeply intuitive sense of rhythm and rooted energy. Born and raised in Mexico, his musical language pulls from a wide spectrum of influences — cumbia, guaracha, dembow, banda, pachanga through to techno, breakbeat, and bass-driven electronic sounds — creating a hybrid, high-impact sound that resists fixed genre boundaries. His selections hold both intensity and playfulness, often blending percussive, folkloric elements with contemporary club textures to shape sets that feel both energetic and grounded.",
    instagram: '@ukab.__dj',
    soundcloudUrl: 'https://soundcloud.com/dj-ukab',
    imageUrl: '/images/artists/ukab.png',
  },

  'faedro': {
    id: 'faedro',
    name: 'Faedro',
    origin: 'Colombia — Netherlands',
    bio: "Faedro is what Amsterdam-based, Colombian-born Mike Federico calls it when his search for his Afro-Latino roots starts running the mixer — percussive house spiced with baile, dembow, Caribbean lift and African weight. Every set is another step back into the ancestry: pulling from continents he's still mapping, played at the tempo of a journey. Music that wonders where one's from and sticks around until the dancefloor answers.",
    instagram: '@_mikefederico_',
    soundcloudUrl: 'https://soundcloud.com/faedro',
    imageUrl: '/images/artists/faedro.png',
  },

  'cameronaudio': {
    id: 'cameronaudio',
    name: 'Cameron Audio',
    origin: 'Chile',
    bio: 'Amsterdam-based DJ and producer whose sound bridges Latin rhythmic traditions with modern house music. Drawing from his Chilean roots and shaped by his move to Europe, his productions focus on tightly programmed percussion, deep low-end grooves, and subtle melodic details.',
    instagram: '@patrickcameron__audio',
    soundcloudUrl: 'https://soundcloud.com/cameron59',
    imageUrl: '/images/artists/patrick.png',
  },

  'tresde': {
    id: 'tresde',
    name: 'Tresdé',
    origin: 'Colombia',
    bio: 'Tresdé, with her SadPink Sessions creates a dreamy & melancholic sonic experience infused with her memories growing up in Cali, Colombia to the sounds of salsa and the nostalgia of yearning for echoes of the mountains, as a now migrant in the flatlands.',
    instagram: '@julianaerazo__',
  },

  // ── Guest artists / collaborators ───────────────────────────────────────
  'conjuntomedialuna': {
    id: 'conjuntomedialuna',
    name: 'Conjunto Medialuna',
    origin: 'Colombia',
    bio: "Conjunto Media Luna, one of the most prominent figures in contemporary cumbia today. Iván Medellín, the musician and producer from Medellín, Colombia, brings his distinctive accordion-driven sounds from Montes de María with a modern twist that reimagines traditional melodies through synths, samplers, and drum machines.",
    instagram: '@conjuntomedialuna',
    soundcloudUrl: 'https://conjuntomedialuna.com',
    imageUrl: '/images/artists/conjuntomedialuna.png',
  },

  'apushii': {
    id: 'apushii',
    name: 'Apushii',
    origin: 'Colombia',
    bio: 'Selector pushing the boundaries between cumbia, reggaetón, and experimental club music. Prolific remixer and editor who treats records as raw material for something entirely new.',
    instagram: '@apushii__',
    soundcloudUrl: '',
    imageUrl: '/images/artists/apushii.png',
  },

  // ── Archive-only artists (minimal profiles) ─────────────────────────────
  'lagrima': {
    id: 'lagrima',
    name: 'Lágrima',
    origin: '',
    bio: '',
  },

  'silviaoviedo': {
    id: 'silviaoviedo',
    name: 'Silvia Oviedo',
    origin: 'Colombia',
    bio: '',
    instagram: '@silvisalvaje',
  },

  'nenemone': {
    id: 'nenemone',
    name: 'Nené Mone',
    origin: '',
    bio: '',
  },

  'jonathancastro': {
    id: 'jonathancastro',
    name: 'Jonathan Castro',
    origin: '',
    bio: '',
  },

  'sebastianvasquezcipriani': {
    id: 'sebastianvasquezcipriani',
    name: 'Sebastian Vasquez Cipriani',
    origin: '',
    bio: '',
    instagram: '@seb_____vc',
  },

  'juliant': {
    id: 'juliant',
    name: "Julián't",
    origin: '',
    bio: '',
    instagram: '@juliaaaaaaand',
  },

  'nicoba': {
    id: 'nicoba',
    name: 'Nicoba',
    origin: '',
    bio: '',
    instagram: '@nicoba.cl',
  },

  'alexiacalderon': {
    id: 'alexiacalderon',
    name: 'Alexia Calderón',
    origin: '',
    bio: '',
  },

  'raices': {
    id: 'raices',
    name: 'Apuchi & Ale Caceres aka rAiceS',
    origin: '',
    bio: '',
  },

  'thydamore': {
    id: 'thydamore',
    name: "Thy d' Amore",
    origin: '',
    bio: '',
  },

  'djlicuaditomix': {
    id: 'djlicuaditomix',
    name: 'DJ Licuadito Mix',
    origin: '',
    bio: '',
  },

  'hiddenmemory': {
    id: 'hiddenmemory',
    name: 'Hidden Memory',
    origin: '',
    bio: '',
  },

  'picosoundsystem': {
    id: 'picosoundsystem',
    name: 'Pico Soundsystem El Gran Fugaris',
    origin: '',
    bio: '',
  },
}

/** Look up an artist by id. Throws at build time if the id is not registered. */
export function a(id: string): Artist {
  const artist = ARTISTS[id]
  if (!artist) throw new Error(`Artist not found in registry: "${id}"`)
  return artist
}
