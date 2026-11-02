/**
 * ONE-TIME: puts public/events into the shape the import expects.
 *
 *   pnpm tsx scripts/migrate-media-folders.ts          → shows what it would do
 *   pnpm tsx scripts/migrate-media-folders.ts --apply  → does it (uses git mv, so history is kept)
 *
 * - Event folders are renamed to match the event id (ids stay the same, so shared links keep working).
 * - Footage moves into a footage/ subfolder, named so alphabetical order = the current order.
 * - Safe to run twice: moves that are already done are skipped.
 * Delete this file once it has run.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC = path.join(process.cwd(), 'public')
const APPLY = process.argv.includes('--apply')

const FOLDERS: [string, string][] = [
  ['events/carmela-ruigoord', 'events/carmela-boogieBos'],
  ['events/carmela-cheninchenin', 'events/carmela-chenin'],
  ['events/carmela-cumbialibre', 'events/cumbia-libre'],
]

const FILES: [string, string][] = [
  ['events/carmela-sf/footage/flyer.png', 'events/carmela-sf/flyer.png'],
  ['events/carmela-fugaris/fulgaris.png', 'events/carmela-fugaris/footage/01-fulgaris.png'],
  ['events/carmela-fugaris/01.png', 'events/carmela-fugaris/footage/01.png'],
  ['events/carmela-fugaris/02.png', 'events/carmela-fugaris/footage/02.png'],
  ['events/carmela-fugaris/03.png', 'events/carmela-fugaris/footage/03.png'],
  ['events/carmela-fugaris/04.png', 'events/carmela-fugaris/footage/04.png'],
  ['events/carmela-fugaris/05.png', 'events/carmela-fugaris/footage/05.png'],
  ['events/carmela-fugaris/06.png', 'events/carmela-fugaris/footage/06.png'],
  ['events/carmela-fugaris/07.png', 'events/carmela-fugaris/footage/07.png'],
  ['events/carmela-fugaris/08.png', 'events/carmela-fugaris/footage/08.png'],
  ['events/carmela-fugaris/09.png', 'events/carmela-fugaris/footage/09.png'],
  ['events/carmela-fugaris/10.png', 'events/carmela-fugaris/footage/10.png'],
  ['events/carmela-fugaris/11.png', 'events/carmela-fugaris/footage/11.png'],
  ['events/carmela-fugaris/12.png', 'events/carmela-fugaris/footage/12.png'],
  ['events/carmela-fugaris/13.png', 'events/carmela-fugaris/footage/13.png'],
  ['events/ddm-25/01.png', 'events/ddm-25/footage/01.png'],
  ['events/ddm-25/02.png', 'events/ddm-25/footage/02.png'],
  ['events/ddm-25/03.png', 'events/ddm-25/footage/03.png'],
  ['events/ddm-25/04.png', 'events/ddm-25/footage/04.png'],
  ['events/ddm-25/05.png', 'events/ddm-25/footage/05.png'],
  ['events/ddm-25/06.png', 'events/ddm-25/footage/06.png'],
  ['events/ddm-25/07.png', 'events/ddm-25/footage/07.png'],
  ['events/ddm-25/08.png', 'events/ddm-25/footage/08.png'],
  ['events/ddm-25/09.png', 'events/ddm-25/footage/09.png'],
  ['events/ddm-25/10.png', 'events/ddm-25/footage/10.png'],
  ['events/ddm-25/11.png', 'events/ddm-25/footage/11.png'],
  ['events/ddm-25/12.png', 'events/ddm-25/footage/12.png'],
  ['events/carmela-seven-eleven/footage/video.mp4', 'events/carmela-seven-eleven/footage/01-video.mp4'],
  ['events/carmela-seven-eleven/footage/virgen.png', 'events/carmela-seven-eleven/footage/02-virgen.png'],
  ['events/carmela-seven-eleven/footage/poster-radioradio.png', 'events/carmela-seven-eleven/footage/03-poster-radioradio.png'],
  ['events/carmela-sept-25/01.png', 'events/carmela-sept-25/footage/01.png'],
  ['events/carmela-sept-25/02.png', 'events/carmela-sept-25/footage/02.png'],
  ['events/carmela-sept-25/03.png', 'events/carmela-sept-25/footage/03.png'],
  ['events/carmela-sept-25/04.png', 'events/carmela-sept-25/footage/04.png'],
  ['events/carmela-sept-25/05.png', 'events/carmela-sept-25/footage/05.png'],
  ['events/carmela-sept-25/06.png', 'events/carmela-sept-25/footage/06.png'],
  ['events/carmela-sept-25/07.png', 'events/carmela-sept-25/footage/07.png'],
  ['events/carmela-sept-25/08.png', 'events/carmela-sept-25/footage/08.png'],
  ['events/carmela-sept-25/09.png', 'events/carmela-sept-25/footage/09.png'],
  ['events/carmela-sept-25/10.png', 'events/carmela-sept-25/footage/10.png'],
  ['events/carmela-sept-25/11.png', 'events/carmela-sept-25/footage/11.png'],
  ['events/carmela-sept-25/12.png', 'events/carmela-sept-25/footage/12.png'],
  ['events/carmela-sept-25/ceviche.png', 'events/carmela-sept-25/footage/13-ceviche.png'],
]

let inGit = false
try { execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); inGit = true } catch {}

function move(from: string, to: string) {
  const a = path.join(PUBLIC, from)
  const b = path.join(PUBLIC, to)
  if (!fs.existsSync(a)) {
    console.log(fs.existsSync(b) ? `= already done  ${to}` : `⚠ missing       ${from}`)
    return
  }
  if (fs.existsSync(b) && fs.statSync(b).isFile()) { console.log(`✖ target exists ${to} (skipped)`); return }
  console.log(`${APPLY ? '→' : '·'} ${from}  →  ${to}`)
  if (!APPLY) return
  fs.mkdirSync(path.dirname(b), { recursive: true })
  if (inGit) {
    try { execSync(`git mv "${a}" "${b}"`, { stdio: 'ignore' }); return } catch { /* untracked file → plain rename */ }
  }
  fs.renameSync(a, b)
}

console.log(APPLY ? 'Applying…\n' : 'Dry run (add --apply to do it)\n')
for (const [a, b] of FOLDERS) move(a, b)
for (const [a, b] of FILES) move(a, b)

// Anything left in a footage/ folder will be SHOWN on the site from now on: list it so nothing surprises you.
if (APPLY) {
  console.log('\nFootage that will be shown per event:')
  for (const ev of fs.readdirSync(path.join(PUBLIC, 'events'))) {
    const dir = path.join(PUBLIC, 'events', ev, 'footage')
    if (fs.existsSync(dir)) console.log(`  ${ev}: ${fs.readdirSync(dir).filter((f) => !f.startsWith('.')).join(', ')}`)
  }
}
