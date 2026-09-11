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
    imageUrl: '/images/artists/marianrosas-2.png',
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
    bio: 'Cameron Audio is an Amsterdam based DJ and producer from Chile. His sound ranges from latin house to UK bass music, with a heavy emphasis in percussion. He is also label manager of Carmela Collective, helping the platform to make their debut album. For Carmela’s anniversary he will play a special vinyl set blending traditional South American sounds with contemporary groove, ranging from salsa to latin pop.',
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
  'calamidadesLola': {
    id: 'calamidadesLola',
    name: 'Calamidades Lola',
    instagram: '@pissandlove',
    origin: 'Colombia/Germany',
    imageUrl: '/images/artists/calamidades.png',
    bio: "Our first artists introduction for our anniversary celebration is Calamidades Lola! A DJ, music researcher, vinyl collector and radio host, Lola was born and raised in Barranquilla, a city where massive, colorful pico soundsystems have been making entire barrios vibrate with African and Caribbean rhythms for decades. Now based in Berlin, her sound carries both those musical roots and the experience of migration with her. Afro-Caribbean music sits at the heart of what she does. Whether on a dance floor, radio show or in a listening room, her selections tell stories around migration, diaspora and music as a living memory, music that has travelled, changed and found new homes along the way. Her selections move through Guaguancó, Cumbia, Champeta, Bullerengue, Makossa, Bolero, Guaracha, Dub, Rumba, Latin Funk, Latin Disco, Reggae, Soca, Cadence and plenty more. Come for a dance and stay for a lesson!",
  },
  
  'donalirio': {
    id: 'donalirio',
    name: 'Don Alirio',
    origin: 'Colombia',
    instagram: '@don_alirio',
    bio: 'We are pleased to announce Don Alirio straight out of Barranquilla to Amsterdam! With more than four decades immersed in record collecting, Don Alirio is not a DJ, he is a Picotero, curator, selector, collectionist and musical researcher with a focus on the study and the preservation of the sounds of Latin America and the Black continent. His musical selection honors the barrio, the popular dances and the sound systems where he shows his devotion to the only element that matters, the music. ',
  imageUrl: '/images/artists/donAlirio.png'
  },
  
  'macthenarco': {
    id: 'macthenarco',
    name: 'Macthenarco',
    origin: 'Chile',
    instagram: '@andres.ns',
    bio: 'Macthenarco is a Chilean-born, Amsterdam-based DJ who’s always been more interested in finding fresh music than sticking to a specific genre. His selections come from years of digging through records, discovering new sounds and collecting music that simply feels right — from Latin and jazz to soul, funk, disco, electronic and everything that sits somewhere in between. He plays vinyl and digital, moving between records he’s had for years and tracks he’s only just discovered. His sets can be laid-back and intimate or more energetic with a groovy vibe, but there’s always a focus on creating a good atmosphere and taking people somewhere unexpected.',
  imageUrl: '/images/artists/macthenarco.png'
  },

  'ekahuil': {
    id: 'ekahuil',
    name: 'Ekahuil',
    origin: '',
    instagram: '@ekahuil.cello',
    bio: '',
    imageUrl: '/images/artists/ekahuil.png'
  },

  'chelita': {
    id: 'chelita',
    name: 'Chelita',
    origin: 'Salvador / Germany',
    instagram: '@isafrndz',
    bio: 'When Chelita researches music, she gets pulled in and follows the stream wherever it goes. Birdsong, traditional instruments, warm rhythms and warped guitars - pieces of the natural and unnatural world come together into something that sounds unknown, but feels familiar. In Amsterdam’s creative industry she moves through various organisations, also programming for @radio.temponaopara.  And in case you didn’t know, “chelita” is a Salvadoran term of endearment for someone pale, a nickname given to her by her family. Fitting for a half-German, half-Salvadoran.',
 imageUrl: '/images/artists/chelita.png'
  },

  'maki': {
    id: 'maki',
    name: 'Maki',
    origin: 'Brazil / Lisboa',
    instagram: '@makibreaks',
    imageUrl: '/images/artists/maki.png',
    soundcloudUrl: 'https://soundcloud.com/makibreaks',
    bio: "This Brazilian DJ, based between Amsterdam and Lisbon, is capable ofmoving mountains with simple resources, the journeys she proposes are driving, percussive, bassy, and more than thinking of musical genres that fit together, she thinks in her own language. Breaks, d'n'b, dubstep, trip hop, or dub are ideas that she skillfully blends in unison, a filter that is uniquely hers. Beyond the dancefloor, Maki is also online with her show undercurrent at ESR, as a programmer at RRFM and a part of Radio TNP."
  },

  'lagrima': {
    id: 'lagrima',
    name: 'Lágrima',
    origin: '',
    bio: '',
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

  'julian': {
    id: 'julian',
    name: "Buenos Díaz",
    origin: 'Colombia',
    bio: 'DJ from bogotá who mixes and plays with the different sounds he grew up with in latinamerica and the new soundscapes he found in amsterdam, bringing some leftfield ambient, triphop and more to create a playful and contemplative listening experience for this special event <3 ',
    instagram: '@juliaaaaaaand',
    imageUrl: '/images/artists/buenosdiaz.png'
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
    name: "Thy d'Amore",
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
    origin: 'Venezuela',
    instagram: '@hidden___memory',
    bio: '',
  },

  'picosoundsystem': {
    id: 'picosoundsystem',
    name: 'Pico Soundsystem El Gran Fugaris',
    origin: 'Colombia',
    bio: '',
    soundcloudUrl: 'https://soundcloud.com/pico-soundsystem',
    imageUrl: '/images/artists/pico-soundsystem.png',
  },
}

/** Look up an artist by id. Throws at build time if the id is not registered. */
export function a(id: string): Artist {
  const artist = ARTISTS[id]
  if (!artist) throw new Error(`Artist not found in registry: "${id}"`)
  return artist
}
