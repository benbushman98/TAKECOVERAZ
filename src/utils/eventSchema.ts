import type { Show } from '../types/show';
import { normalizeUrl } from './url';

/**
 * schema.org `MusicEvent` data for public shows, so Google can list them in event
 * search results ("live music Mesa this weekend").
 *
 * Arizona doesn't observe daylight saving, so every show is at UTC-07:00 all year.
 */
const AZ_OFFSET = '-07:00';
const BAND = {
  '@type': 'MusicGroup',
  name: 'Take Cover!',
  url: 'https://takecoveraz.com',
};

/** "7:00 PM", "8:30pm", "9PM" -> "19:00". Null if it can't be read. */
export function to24h(time: string): string | null {
  const m = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([ap])\.?\s*m\.?$/i);
  if (!m) return null;
  let hour = Number(m[1]) % 12;
  if (m[3].toLowerCase() === 'p') hour += 12;
  return `${String(hour).padStart(2, '0')}:${m[2] ?? '00'}`;
}

/** "8:00Pm", "9:00PM", "8:30pm" -> "8:00 PM", "9:00 PM", "8:30 PM". Unreadable text is shown as typed. */
export function formatTime(time: string): string {
  const t = to24h(time);
  if (!t) return time.trim();
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

/** Google needs a full address; most are typed without the state. */
function withState(address: string): string {
  const a = address.trim();
  return /\b(AZ|Arizona)\b/i.test(a) ? a : `${a}, AZ`;
}

function dateTime(date: string, time: string, nextDay = false): string {
  const t = to24h(time);
  if (!t) return date;
  let day = date;
  if (nextDay) {
    const d = new Date(`${date}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + 1);
    day = d.toISOString().slice(0, 10);
  }
  return `${day}T${t}:00${AZ_OFFSET}`;
}

/** Private gigs (no address) are left out — Google requires a public location. */
export function buildEventSchema(shows: Show[]) {
  return shows
    .filter((show) => show.address.trim() && show.date)
    .map((show) => {
      const start = to24h(show.timeStart);
      const end = to24h(show.timeEnd);
      // A show that ends past midnight (8:30pm - 12:00am) ends on the next day.
      const endsNextDay = !!(start && end && end <= start);
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: `Take Cover! at ${show.title}`,
        startDate: dateTime(show.date, show.timeStart),
        ...(start && end && { endDate: dateTime(show.date, show.timeEnd, endsNextDay) }),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: show.title,
          address: withState(show.address),
          ...(show.link.trim() && { url: normalizeUrl(show.link) }),
        },
        image: ['https://takecoveraz.com/images/theBand.webp'],
        description: show.notes.trim()
          ? `Live music from Take Cover! — ${show.notes.trim()}`
          : 'Live rock and pop covers from Take Cover!, a high-energy Arizona cover band.',
        performer: BAND,
        organizer: BAND,
        url: 'https://takecoveraz.com/calendar',
      };
    });
}
