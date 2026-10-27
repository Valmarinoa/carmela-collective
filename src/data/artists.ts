import type { Artist } from '@/types/index'

// The artist list lives in the content sheet → src/data/artists.generated.ts (pnpm import-content).
export { ARTISTS } from './artists.generated'
import { ARTISTS } from './artists.generated'

/** Look up an artist by id. Throws at build time if the id is not registered. */
export function a(id: string): Artist {
  const artist = ARTISTS[id]
  if (!artist) throw new Error(`Artist not found in registry: "${id}"`)
  return artist
}
