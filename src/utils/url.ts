/**
 * Venue links are typed in by hand in the admin panel, so they arrive in every shape:
 * `HTTPS://www.fos-Az.com`, `Http://vabeneaz.com`, `vabeneaz.com/`, ... These helpers
 * give them one consistent form for both the saved value and what visitors see.
 */

function parse(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // No scheme typed (e.g. "vabeneaz.com") — assume https.
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

/** Canonical href: lowercase scheme and host, scheme added when missing. */
export function normalizeUrl(raw: string): string {
  const url = parse(raw);
  if (!url) return raw.trim();
  // URL lowercases the scheme and host; drop a lone trailing "/" on a bare domain.
  return url.pathname === '/' && !url.search && !url.hash ? url.origin : url.href;
}

/** Short label for display: "fos-az.com" rather than "HTTPS://www.fos-Az.com/". */
export function displayUrl(raw: string): string {
  const url = parse(raw);
  if (!url) return raw.trim();
  const host = url.host.replace(/^www\./, '');
  const path = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
  return `${host}${path}`;
}
