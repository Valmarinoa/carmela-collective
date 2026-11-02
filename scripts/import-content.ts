/**
 * pnpm import-content
 *
 * Turns the Carmela content sheet (tabs: Events, Artists, Lists) into src/data/*.generated.ts.
 *
 *   pnpm import-content                    → downloads the Google Sheet (CONTENT_SHEET_ID in .env.local)
 *   pnpm import-content ./carmela.xlsx     → uses a downloaded copy (File → Download → .xlsx)
 *
 * Flags:
 *   --dry-run            validate + show what would change, write nothing
 *   --allow-removals     needed when the sheet would remove events/artists that are live now
 *   --allow-missing-media  missing flyers / photos become warnings instead of errors
 *
 * Nothing is written if there is a single error.
 */
import readXlsx from 'read-excel-file/node'
import { imageSize } from 'image-size'
import fs from 'node:fs'
import path from 'node:path'

// ── Config ────────────────────────────────────────────────────────────────
const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')
const OUT_EVENTS = path.join(ROOT, 'src/data/events.generated.ts')
const OUT_ARTISTS = path.join(ROOT, 'src/data/artists.generated.ts')
const TYPES_IMPORT = '@/types/index' // where Event and Artist types live
const ARTIST_IMG_DIR = '/images/artists'

/** Footage card heights for the masonry grid. */
const FOOTAGE = {
  // 'ratio'   → height follows each photo's real proportions (baseWidth wide), clamped to min/max
  // 'pattern' → the hand-made rhythm used so far, repeated
  mode: 'ratio' as 'ratio' | 'pattern',
  baseWidth: 360,
  min: 280,
  max: 560,
  pattern: [480, 340, 520, 380, 300, 460, 440, 310, 500, 420, 350, 470],
  videoHeight: 440,
}
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']
const VIDEO_EXT = ['.mp4', '.webm', '.mov']
const TRACKING_PARAMS = /^(utm_.*|fbclid|gclid|igshid|mc_cid|mc_eid|_ga)$/i

// ── Small helpers ─────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const input = args.find((a) => !a.startsWith('--'))
const DRY = flags.has('--dry-run')

const errors: string[] = []
const warnings: string[] = []
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`)
const warn = (where: string, msg: string) => warnings.push(`${where}: ${msg}`)
const mediaProblem = flags.has('--allow-missing-media') ? warn : err

type Cell = string | number | boolean | Date | null | undefined
type Sheet = { sheet: string; data: Cell[][] }

/** Cell value → trimmed string (dates become YYYY-MM-DD). */
function text(v: Cell): string {
  if (v == null) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  return String(v).trim()
}

type Row = Record<string, string> & { _row: string }

function readTab(sheets: Sheet[], name: string, columns: Record<string, RegExp>): Row[] {
  const tab = sheets.find((s) => s.sheet === name)
  if (!tab) throw new Error(`Tab "${name}" not found in the sheet`)
  // Columns are found by their header text, so the team can reorder or add columns safely.
  const colOf: Record<string, number> = {}
  ;(tab.data[0] ?? []).forEach((cell, col) => {
    const h = text(cell).replace(/\s+/g, ' ')
    for (const [key, re] of Object.entries(columns)) if (re.test(h) && colOf[key] === undefined) colOf[key] = col
  })
  for (const key of Object.keys(columns)) if (colOf[key] === undefined) throw new Error(`Tab "${name}": column for "${key}" not found`)
  return tab.data.slice(1).map((cells, i) => {
    const r = { _row: `${name} row ${i + 2}` } as Row
    for (const [key, col] of Object.entries(colOf)) r[key] = text(cells[col])
    return r
  })
}

function parseDate(raw: string, where: string): string {
  let m
  if ((m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return iso(+m[1], +m[2], +m[3], raw, where)
  if ((m = raw.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/))) return iso(+m[3], +m[2], +m[1], raw, where) // DD-MM-YYYY (NL)
  if (/^\d{5}(\.\d+)?$/.test(raw)) return new Date(Date.UTC(1899, 11, 30) + +raw * 864e5).toISOString().slice(0, 10)
  err(where, `date "${raw}" not understood, use YYYY-MM-DD`)
  return raw
}
function iso(y: number, mo: number, d: number, raw: string, where: string) {
  const dt = new Date(Date.UTC(y, mo - 1, d))
  if (dt.getUTCMonth() !== mo - 1) err(where, `date "${raw}" does not exist`)
  return dt.toISOString().slice(0, 10)
}

function cleanUrl(raw: string, where: string): string {
  if (!raw) return ''
  try {
    const u = new URL(raw)
    const junk = [...u.searchParams.keys()].filter((k) => TRACKING_PARAMS.test(k))
    if (!junk.length) return raw // leave clean links exactly as typed
    for (const k of junk) u.searchParams.delete(k)
    return u.toString()
  } catch {
    err(where, `"${raw}" is not a valid link`)
    return raw
  }
}

const splitLinks = (raw: string) => raw.split(/[\n\s,]+/).map((s) => s.trim()).filter(Boolean)
const exists = (publicPath: string) => fs.existsSync(path.join(PUBLIC_DIR, publicPath))
const listDir = (publicPath: string) => {
  const dir = path.join(PUBLIC_DIR, publicPath)
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => !f.startsWith('.')).sort() : []
}

function footageFor(folder: string) {
  const files = listDir(`events/${folder}/footage`).filter((f) =>
    [...IMAGE_EXT, ...VIDEO_EXT].includes(path.extname(f).toLowerCase()),
  )
  return files.map((file, i) => {
    const img = `/events/${folder}/footage/${file}`
    const isVideo = VIDEO_EXT.includes(path.extname(file).toLowerCase())
    let height = FOOTAGE.pattern[i % FOOTAGE.pattern.length]
    if (isVideo) height = FOOTAGE.videoHeight
    else if (FOOTAGE.mode === 'ratio') {
      try {
        const { width, height: h } = imageSize(path.join(PUBLIC_DIR, img))
        if (width && h) height = Math.min(FOOTAGE.max, Math.max(FOOTAGE.min, Math.round((FOOTAGE.baseWidth * h) / width)))
      } catch {
        warn(`events/${folder}`, `could not read size of ${file}, using default height`)
      }
    }
    return { id: `${folder}-${i + 1}`, type: isVideo ? 'video' : 'image', img, height }
  })
}

// ── Load the sheet ────────────────────────────────────────────────────────
async function loadWorkbook(): Promise<Sheet[]> {
  if (input) return (await readXlsx(fs.readFileSync(path.resolve(input)))) as Sheet[]
  const envFile = path.join(ROOT, '.env.local')
  const env = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : ''
  const id = process.env.CONTENT_SHEET_ID ?? env.match(/^CONTENT_SHEET_ID=(.+)$/m)?.[1]?.trim()
  if (!id) throw new Error('No sheet given. Pass a .xlsx path, or set CONTENT_SHEET_ID in .env.local')
  // Works when the sheet is shared as "Anyone with the link can view".
  const res = await fetch(`https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`).catch(() => {
    throw new Error('Could not reach Google Sheets. Are you online?')
  })
  if (!res.ok || !res.headers.get('content-type')?.includes('spreadsheet'))
    throw new Error(`Could not download the sheet (${res.status}). Is it shared as "anyone with the link can view"?`)
  return (await readXlsx(Buffer.from(await res.arrayBuffer()))) as Sheet[]
}

// ── Build ─────────────────────────────────────────────────────────────────
async function main() {
  const wb = await loadWorkbook()

  const lists = wb.find((s) => s.sheet === 'Lists')?.data ?? []
  const allowedTags = new Set(lists.slice(1).map((r) => text(r[0])).filter(Boolean))

  // Lineup lives on the Events tab as Set 1 / Note 1, Set 2 / Note 2, … (as many as the sheet has)
  const eventsHeader = (wb.find((t) => t.sheet === 'Events')?.data[0] ?? []).map((h) => text(h))
  const setNumbers = eventsHeader.map((h) => h.match(/^Set (\d+)\b/)?.[1]).filter(Boolean).map(Number)
  const setColumns: Record<string, RegExp> = {}
  for (const n of setNumbers) { setColumns[`set${n}`] = new RegExp(`^Set ${n}\\b`, 'i'); setColumns[`note${n}`] = new RegExp(`^Note ${n}\\b`, 'i') }

  const eventRows = readTab(wb, 'Events', {
    ...setColumns,
    id: /^Folder/i, status: /^Status/i, kind: /^Kind/i, title: /^Title/i, date: /^Date/i, venue: /^Venue$/i,
    venueAddress: /^Venue address/i, venueUrl: /^Venue .*links/i, ticketUrl: /^Ticket/i, listenUrl: /^Listen/i,
    tag1: /^Tag 1/i, tag2: /^Tag 2/i, tag3: /^Tag 3/i, tag4: /^Tag 4/i, objectFit: /^Flyer fit/i, description: /^Description/i,
  }).filter((r) => r.id || r.title)
  const artistRows = readTab(wb, 'Artists', {
    id: /^Artist ID/i, name: /^Name/i, group: /^Group/i, origin: /^Origin/i, bio: /^Bio/i,
    instagram: /^Instagram/i, soundcloudUrl: /^SoundCloud/i, image: /^Photo/i,
  }).filter((r) => r.id || r.name)

  // Artists
  const artists: { group: string; data: Record<string, string> }[] = []
  const artistIds = new Set<string>()
  const artistByName = new Map<string, string>() // what the Set dropdowns contain → id
  for (const r of artistRows) {
    const where = `${r._row} (${r.id || r.name})`
    if (!r.id) { err(where, 'Artist ID is empty'); continue }
    if (!/^[A-Za-z0-9]+$/.test(r.id)) err(where, `Artist ID "${r.id}" may only contain letters and numbers`)
    if (artistIds.has(r.id)) err(where, `Artist ID "${r.id}" is used twice`)
    if (!r.name) err(where, 'Name is empty')
    if (r.name.includes(',')) err(where, `Name "${r.name}" can't contain a comma (commas separate B2B artists)`)
    if (artistByName.has(r.name.toLowerCase())) err(where, `Name "${r.name}" is used twice`)
    artistIds.add(r.id)
    artistByName.set(r.name.toLowerCase(), r.id)
    const data: Record<string, string> = { id: r.id, name: r.name, origin: r.origin, bio: r.bio }
    if (r.instagram) data.instagram = r.instagram.startsWith('@') ? r.instagram : `@${r.instagram}`
    if (r.soundcloudUrl) data.soundcloudUrl = cleanUrl(r.soundcloudUrl, where)
    if (r.image) {
      data.imageUrl = `${ARTIST_IMG_DIR}/${r.image.replace(/^.*\//, '')}`
      if (!exists(data.imageUrl)) {
        warn(where, `photo not found: public${data.imageUrl}, shown without photo`)
        delete data.imageUrl
      }
    }
    artists.push({ group: r.group || 'Archive', data })
  }

  /** One Set cell → artist ids. Accepts names (from the dropdown) or ids; B2B = several, comma-separated. */
  function lineupFor(r: Row, where: string) {
    const list: any[] = []
    for (const n of setNumbers) {
      const cell = r[`set${n}`]
      const note = r[`note${n}`]
      if (!cell) { if (note) warn(where, `Note ${n} has text but Set ${n} has no artist`); continue }
      const ids: string[] = []
      for (const part of cell.split(/\s*[,+]\s*|\s+b2b\s+/i).filter(Boolean)) {
        const id = artistByName.get(part.toLowerCase()) ?? (artistIds.has(part) ? part : undefined)
        if (!id) err(where, `Set ${n}: "${part}" is not on the Artists tab`)
        else if (!ids.includes(id)) ids.push(id)
      }
      if (!ids.length) continue
      let slotId = `${r.id}-${ids.join('-')}`
      while (list.some((s) => s.id === slotId)) slotId += '-x'
      list.push({ id: slotId, isB2B: ids.length > 1, artists: ids, ...(note && { note }) })
    }
    return list
  }

  // Events
  const events: Record<string, any>[] = []
  const seen = new Set<string>()
  let drafts = 0
  for (const r of eventRows) {
    const where = `${r._row} (${r.id || r.title})`
    if (!r.id) { err(where, 'Folder / ID is empty'); continue }
    if (!/^[A-Za-z0-9-]+$/.test(r.id)) err(where, `Folder / ID "${r.id}" may only contain letters, numbers and dashes`)
    if (seen.has(r.id)) err(where, `Folder / ID "${r.id}" is used twice`)
    seen.add(r.id)
    const status = r.status.toLowerCase()
    if (status !== 'published' && status !== 'draft') err(where, `Status must be Published or Draft, got "${r.status}"`)
    if (status !== 'published') { drafts++; continue }
    for (const f of ['title', 'date', 'venue', 'description'] as const) if (!r[f]) err(where, `${f} is empty`)

    const folder = `/events/${r.id}`
    const flyer = ['flyer.png', 'flyer.jpg', 'flyer.jpeg', 'flyer.webp'].map((f) => `${folder}/${f}`).find(exists)
    const footage = footageFor(r.id)
    let video = exists(`${folder}/video.mp4`) ? `${folder}/video.mp4` : undefined
    if (!video && !flyer) video = footage.find((f) => f.type === 'video')?.img
    if (!flyer && !video) mediaProblem(where, `no flyer: expected public${folder}/flyer.png`)

    const tags: string[] = []
    for (const t of [r.tag1, r.tag2, r.tag3, r.tag4].filter(Boolean)) {
      if (allowedTags.size && !allowedTags.has(t)) err(where, `tag "${t}" is not in the Lists tab`)
      if (!tags.includes(t)) tags.push(t)
    }
    if (r.objectFit && !['contain', 'cover'].includes(r.objectFit)) err(where, `Flyer fit must be contain or cover`)

    const e: Record<string, any> = {
      id: r.id,
      title: r.title,
      date: parseDate(r.date, where),
      venue: r.venue,
    }
    const venueUrl = splitLinks(r.venueUrl).map((u) => cleanUrl(u, where))
    if (venueUrl.length) e.venueUrl = venueUrl
    if (r.venueAddress) e.venueAddress = r.venueAddress
    e.description = r.description
    if (video) { e.mediaType = 'video'; e.video = video }
    if (flyer) e.flyer = flyer
    if (r.objectFit) e.objectFit = r.objectFit
    if (/radio/i.test(r.kind)) e.type = 'radio'
    if (r.ticketUrl) e.ticketUrl = cleanUrl(r.ticketUrl, where)
    if (r.listenUrl) e.listenUrl = cleanUrl(r.listenUrl, where)
    if (tags.length) e.tags = tags
    e.lineup = lineupFor(r, where)
    if (footage.length) e.footage = footage
    events.push(e)
  }
  events.sort((a, b) => b.date.localeCompare(a.date))

  // Safety net: the sheet is the source of truth, so warn before anything live disappears.
  const removed = [
    ...previousIds(OUT_EVENTS, 'event').filter((id) => !events.some((e) => e.id === id)).map((id) => `event "${id}"`),
    ...previousIds(OUT_ARTISTS, 'artist').filter((id) => !artistIds.has(id)).map((id) => `artist "${id}"`),
  ]
  if (removed.length && !flags.has('--allow-removals'))
    err('Safety check', `this import would REMOVE ${removed.join(', ')} from the website. ` +
      `If a row was deleted by accident, restore it in the sheet. If it's on purpose, run again with --allow-removals.`)

  // Report
  for (const w of warnings) console.warn(`⚠  ${w}`)
  if (errors.length) {
    console.error(`\n✖ ${errors.length} problem(s) — nothing was written:\n`)
    for (const e of errors) console.error(`  • ${e}`)
    process.exit(1)
  }
  const out = [[OUT_ARTISTS, renderArtists(artists)], [OUT_EVENTS, renderEvents(events)]] as const
  for (const [file, content] of out) {
    const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
    const rel = path.relative(ROOT, file)
    if (before === content) console.log(`= ${rel} unchanged`)
    else if (DRY) console.log(`~ ${rel} would change`)
    else { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); console.log(`✓ ${rel} written`) }
  }
  console.log(`\n${events.length} published events (${drafts} drafts skipped), ${artists.length} artists.` +
    (removed.length ? `\nRemoved: ${removed.join(', ')}` : '') + (DRY ? '\n(dry run)' : '\nReview with: git diff src/data'))
}

function previousIds(file: string, kind: 'event' | 'artist'): string[] {
  if (!fs.existsSync(file)) return []
  return [...fs.readFileSync(file, 'utf8').matchAll(new RegExp(`// @${kind} (\\S+)`, 'g'))].map((m) => m[1])
}

// ── Output ────────────────────────────────────────────────────────────────
const HEADER = `// ⚠️  GENERATED by \`pnpm import-content\` from the Carmela content sheet.
// Don't edit by hand: change the sheet and run the import again.
`
// Single quotes like the rest of the codebase; double quotes when the text contains an apostrophe.
const q = (s: string) =>
  s.includes("'") && !s.includes('"') ? JSON.stringify(s) : `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
function lit(v: any, indent: string): string {
  if (typeof v === 'string') return q(v)
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    if (v.every((x) => typeof x !== 'object')) return `[${v.map((x) => lit(x, indent)).join(', ')}]`
    return `[\n${v.map((x) => `${indent}  ${lit(x, indent + '  ')},`).join('\n')}\n${indent}]`
  }
  const entries = Object.entries(v).filter(([, x]) => x !== undefined)
  return `{ ${entries.map(([k, x]) => `${k}: ${lit(x, indent)}`).join(', ')} }`
}

function renderArtists(list: { group: string; data: Record<string, string> }[]) {
  const titles: Record<string, string> = { Resident: 'Core residents / recurring', Guest: 'Guest artists / collaborators', Archive: 'Archive-only artists' }
  const order = ['Resident', 'Guest', 'Archive']
  let s = `${HEADER}import type { Artist } from '${TYPES_IMPORT}'\n\nexport const ARTISTS: Record<string, Artist> = {\n`
  for (const g of [...order, ...new Set(list.map((a) => a.group).filter((g) => !order.includes(g)))]) {
    const group = list.filter((a) => a.group === g)
    if (!group.length) continue
    s += `\n  // ── ${titles[g] ?? g} ${'─'.repeat(Math.max(4, 60 - (titles[g] ?? g).length))}\n`
    for (const { data } of group) {
      s += `  // @artist ${data.id}\n  ${q(data.id)}: {\n`
      for (const [k, v] of Object.entries(data)) s += `    ${k}: ${q(v)},\n`
      s += `  },\n`
    }
  }
  return s + `}\n`
}

function renderEvents(list: Record<string, any>[]) {
  let s = `${HEADER}import type { Event } from '${TYPES_IMPORT}'\nimport { a } from './artists'\n\nexport const events: Event[] = [\n`
  for (const e of list) {
    s += `  // @event ${e.id}\n  {\n`
    for (const [k, v] of Object.entries(e)) {
      if (k === 'lineup') {
        s += v.length ? `    lineup: [\n${v.map((l: any) =>
          `      { id: ${q(l.id)}, isB2B: ${l.isB2B}, artists: [${l.artists.map((id: string) => `a(${q(id)})`).join(', ')}]${l.note ? `, note: ${q(l.note)}` : ''} },`).join('\n')}\n    ],\n` : `    lineup: [],\n`
      } else if (k === 'footage' || k === 'venueUrl') {
        s += `    ${k}: [\n${v.map((x: any) => `      ${lit(x, '      ')},`).join('\n')}\n    ],\n`
      } else s += `    ${k}: ${lit(v, '    ')},\n`
    }
    s += `  },\n`
  }
  return s + `]\n`
}

main().catch((e) => {
  console.error(`✖ ${e.message}`)
  process.exit(1)
})
