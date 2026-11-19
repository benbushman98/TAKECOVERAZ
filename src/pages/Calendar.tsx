import { useState, useEffect, useMemo } from 'react';
import { WORKER_URL } from './admin/adminUtils';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';
import Social from '../components/shared/Social';
import type { Show } from '../types/show';
import { isUpcoming, todayISO } from '../utils/date';
import { displayUrl, normalizeUrl } from '../utils/url';
import { buildEventSchema, formatTime } from '../utils/eventSchema';

const SKELETON_COUNT = 4;
const DISPLAY_FONT = '"Big Shoulders Display", "Arial Narrow", sans-serif';

function getMapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** Show dates are plain `YYYY-MM-DD` days; parse them as local days, never UTC. */
function localDay(showDate: string): Date {
  return new Date(`${showDate}T00:00:00`);
}

function monthLabel(showDate: string): string {
  return localDay(showDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

const rowSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '84px 1fr', md: '112px 1fr auto' },
  columnGap: { xs: 2.5, md: 4 },
  rowGap: 1,
  alignItems: 'start',
  py: { xs: 3, md: 3.5 },
  borderTop: '1px solid',
  borderColor: 'divider',
};

function DateBlock({ date, highlight }: { date: string; highlight: boolean }) {
  const d = localDay(date);
  return (
    <Box
      sx={{
        textAlign: 'center',
        borderRadius: 1,
        py: 1.25,
        bgcolor: highlight ? 'primary.main' : 'transparent',
        border: '1px solid',
        borderColor: highlight ? 'primary.main' : 'rgba(255,255,255,0.18)',
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
        {d.toLocaleDateString(undefined, { weekday: 'short' })}
      </Typography>
      <Typography sx={{ fontFamily: DISPLAY_FONT, fontWeight: 900, fontSize: { xs: '2.75rem', md: '3.5rem' }, lineHeight: 0.9 }}>
        {d.getDate()}
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
        {d.toLocaleDateString(undefined, { month: 'short' })}
      </Typography>
    </Box>
  );
}

function ShowRow({ show, isNext }: { show: Show; isNext: boolean }) {
  const hasAddress = !!show.address.trim();
  const time = `${formatTime(show.timeStart)} – ${formatTime(show.timeEnd)}`;

  return (
    <Box component="li" sx={rowSx}>
      <Box sx={{ gridRow: { xs: 'span 2', md: 'auto' } }}>
        <DateBlock date={show.date} highlight={isNext} />
      </Box>

      <Box>
        {isNext && (
          <Typography sx={{ color: 'primary.light', fontWeight: 600, mb: 0.5 }}>Next show</Typography>
        )}
        <Typography
          component="h3"
          sx={{ fontFamily: DISPLAY_FONT, fontWeight: 800, textTransform: 'uppercase', fontSize: { xs: '1.75rem', md: '2.25rem' }, lineHeight: 1 }}
        >
          {show.title}
        </Typography>
        <Typography sx={{ display: { md: 'none' }, fontWeight: 600, mt: 0.75 }}>{time}</Typography>
        {show.notes && <Typography sx={{ mt: 1 }}>{show.notes}</Typography>}

        {hasAddress ? (
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>{show.address}</Typography>
        ) : /private/i.test(show.title) ? null : (
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>Private event</Typography>
        )}

        {(hasAddress || show.link) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2.5, rowGap: 0.5, mt: 1 }}>
            {hasAddress && (
              <Link href={getMapsLink(show.address)} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>
                Directions
              </Link>
            )}
            {show.link && (
              <Link href={normalizeUrl(show.link)} target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>
                {displayUrl(show.link)}
              </Link>
            )}
          </Box>
        )}
      </Box>

      <Typography sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap', pt: 0.5 }}>
        {time}
      </Typography>
    </Box>
  );
}

function SkeletonRow() {
  return (
    <Box sx={rowSx}>
      <Skeleton variant="rounded" sx={{ bgcolor: 'grey.900', height: { xs: 100, md: 116 } }} />
      <Box>
        <Skeleton variant="text" width="55%" sx={{ bgcolor: 'grey.900', fontSize: '2rem' }} />
        <Skeleton variant="text" width="40%" sx={{ bgcolor: 'grey.900' }} />
        <Skeleton variant="text" width="30%" sx={{ bgcolor: 'grey.900' }} />
      </Box>
    </Box>
  );
}

function Calendar() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${WORKER_URL}/shows`)
      .then((res) => res.json())
      .then((data: Show[]) => {
        // Compared as `YYYY-MM-DD` strings, not Dates: `new Date(show.date)` parses a
        // date-only string as UTC midnight while a local `today` is 7 hours later in
        // Arizona, which hid every show for the whole of the day it was being played.
        const today = todayISO();
        const upcoming = data
          .filter((show) => isUpcoming(show.date, today))
          .sort((a, b) => a.date.localeCompare(b.date));
        setShows(upcoming);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /** [month label, shows][] in date order. */
  const months = useMemo(() => {
    const groups = new Map<string, Show[]>();
    for (const show of shows) {
      const key = show.date.slice(0, 7);
      const list = groups.get(key) ?? [];
      list.push(show);
      groups.set(key, list);
    }
    return [...groups.values()].map((list) => [monthLabel(list[0].date), list] as const);
  }, [shows]);

  const nextId = shows[0]?.id;

  return (
    <Box>
      <PageMeta path="/calendar" />
      {shows.length > 0 && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(buildEventSchema(shows))}</script>
        </Helmet>
      )}
      <PageHeader title="Upcoming shows" subtitle="Catch us live. We'll see you in the pit." image="/images/header-shows.webp" imagePosition="center 55%" />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          <Box>
            {loading &&
              Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonRow key={i} />)}

            {!loading &&
              months.map(([label, list]) => (
                <Box component="section" key={label} sx={{ mb: { xs: 4, md: 6 } }}>
                  <Typography
                    component="h2"
                    sx={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: 'uppercase', fontSize: { xs: '2.25rem', md: '3rem' }, lineHeight: 1, mb: 2 }}
                  >
                    {label}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {list.map((show) => (
                      <ShowRow key={show.id} show={show} isNext={show.id === nextId} />
                    ))}
                  </Box>
                </Box>
              ))}

            {!loading && shows.length === 0 && (
              <Box sx={{ py: 6 }}>
                <Typography variant="h3" component="p" sx={{ mb: 1 }}>
                  {error ? "We couldn't load the show list" : 'No public shows on the books right now'}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: '52ch' }}>
                  {error
                    ? 'Please refresh the page, or check our Facebook for the latest dates.'
                    : 'New dates are added often. Or bring the band to your own event.'}
                </Typography>
                <Button component={RouterLink} to="/contact" variant="contained" size="large">
                  Book Take Cover! for your event
                </Button>
              </Box>
            )}
          </Box>

          <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
            <Box
              component="img"
              src="/images/theBand.webp"
              alt="Chad, Jay and Rob playing an outdoor stage"
              loading="lazy"
              sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', objectPosition: 'center 40%', borderRadius: 1, display: 'block' }}
            />
            <Box sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 3, mt: 1.5 }}>
              <Typography component="h2" sx={{ fontFamily: DISPLAY_FONT, fontWeight: 800, textTransform: 'uppercase', fontSize: '1.9rem', lineHeight: 1 }}>
                Have a date in mind?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mt: 1.5 }}>
                We play weddings, private parties, corporate events and venues across Arizona.
              </Typography>
              <Button component={RouterLink} to="/contact" variant="contained" fullWidth sx={{ mt: 2.5 }}>
                Book us
              </Button>
              <Typography sx={{ color: 'text.secondary', mt: 3, fontWeight: 600 }}>
                Follow us for new dates
              </Typography>
              <Box sx={{ ml: -1, mt: 0.5 }}>
                <Social />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Calendar;
