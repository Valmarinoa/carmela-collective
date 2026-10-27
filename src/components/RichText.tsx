import { Fragment, type ReactNode } from 'react'

/**
 * Light "rich text" for descriptions typed in the content sheet:
 *   @handle                  → link to instagram.com/handle
 *   [some text](https://…)   → link with your own text
 *   https://…                → link
 *   line breaks              → kept (an empty line = new paragraph)
 * Everything else is plain text. Only http(s) links are allowed.
 */

// One regex, three alternatives, tried left to right: markdown link | bare URL | @handle
const TOKEN =
  /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])|(?<![\w@.\/])@([A-Za-z0-9_](?:[A-Za-z0-9_.]{0,28}[A-Za-z0-9_])?)/g

const linkClass =
  'text-cream underline underline-offset-2 decoration-cream/40 hover:decoration-[#70fe01] hover:text-[#70fe01] transition-colors duration-150'

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

export function renderRichText(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  for (const m of text.matchAll(TOKEN)) {
    const start = m.index ?? 0
    if (start > last) out.push(text.slice(last, start))
    const [whole, mdText, mdUrl, url, handle] = m
    if (mdUrl) out.push(<Link key={key++} href={mdUrl}>{mdText}</Link>)
    else if (url) out.push(<Link key={key++} href={url}>{url.replace(/^https?:\/\/(www\.)?/, '')}</Link>)
    else if (handle) out.push(<Link key={key++} href={`https://www.instagram.com/${handle}/`}>@{handle}</Link>)
    else out.push(whole)
    last = start + whole.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Renders a description. Paragraphs are split on empty lines; single line breaks are kept. */
export default function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim())
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={className} style={{ whiteSpace: 'pre-line' }}>
          {renderRichText(p.trim()).map((node, j) => <Fragment key={j}>{node}</Fragment>)}
        </p>
      ))}
    </>
  )
}

/** Same text without the link markup, for short previews (cards, meta descriptions). */
export function plainText(text: string): string {
  return text.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1')
}
