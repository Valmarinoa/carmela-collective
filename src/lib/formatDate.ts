const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/**
 * '2026-06-15' → '15 JUN 2026'
 * Reads the date parts directly (no Date object), so it never shifts a day because of time zones.
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d || m > 12) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}
