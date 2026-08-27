/**
 * Date helpers for show dates.
 *
 * Show dates come from an `<input type="date">`, so they are always plain `YYYY-MM-DD`
 * calendar days with no time and no timezone — "the 27th", not an instant. Every bug this
 * module exists to prevent comes from letting one of them get parsed as an instant:
 *
 *   new Date('2026-08-27')            // 2026-08-27T00:00:00Z  <- UTC, per spec
 *   new Date('2026-08-27T00:00:00')   // 2026-08-27T00:00:00    <- local
 *
 * The bare form is UTC because ECMA-262 says date-only ISO strings are, and that put a
 * show 7 hours in the past the moment its own day started in Arizona — so a show
 * disappeared from the calendar at midnight on the day it was actually being played.
 *
 * Compare calendar days as strings and there is no instant to get wrong: `YYYY-MM-DD`
 * sorts lexicographically in the same order it sorts chronologically.
 */

/**
 * Today as `YYYY-MM-DD` in the visitor's own timezone.
 *
 * Deliberately not `new Date().toISOString().split('T')[0]`, which is the *UTC* date:
 * west of Greenwich that rolls over before the local day ends (17:00 in Arizona), so a
 * show would drop out of "upcoming" hours early on the day it was being played.
 */
export function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/**
 * True while the show is still to come, and through the whole of its own day — a show
 * stops being upcoming the day *after* it happens, not the morning of.
 */
export function isUpcoming(showDate: string, today: string = todayISO()): boolean {
  return showDate >= today;
}

/** A show's `YYYY-MM-DD` rendered in the visitor's locale, parsed as a local day. */
export function formatShowDate(showDate: string): string {
  return new Date(`${showDate}T00:00:00`).toLocaleDateString();
}
