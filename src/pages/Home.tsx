import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import ArtistWall from '../components/home/ArtistWall';
import PictureGallery from '../components/home/PictureGallery';
import Reviews from '../components/home/Reviews';
import PageMeta from '../components/shared/PageMeta';
import { WORKER_URL } from './admin/adminUtils';
import { isUpcoming, todayISO } from '../utils/date';
import { formatTime } from '../utils/eventSchema';
import type { Show } from '../types/show';

// Concert crowd photo, downloaded from Pexels (https://www.pexels.com/photo/2078076/).
const HERO_IMAGE = '/images/hero-crowd.webp';

const DISPLAY_FONT = '"Big Shoulders Display", "Arial Narrow", sans-serif';

/** The next public show, or null if there isn't one or the list can't load. */
function useNextShow(): Show | null {
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    fetch(`${WORKER_URL}/shows`)
      .then((res) => res.json())
      .then((data: Show[]) => {
        const today = todayISO();
        const next = data
          .filter((s) => isUpcoming(s.date, today))
          .sort((a, b) => a.date.localeCompare(b.date))[0];
        setShow(next ?? null);
      })
      .catch(() => setShow(null));
  }, []);

  return show;
}

function showDateParts(showDate: string) {
  const d = new Date(`${showDate}T00:00:00`);
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: 'short' }),
    month: d.toLocaleDateString(undefined, { month: 'short' }),
    day: d.getDate(),
  };
}

function NextShowTicket({ show }: { show: Show }) {
  const { weekday, month, day } = showDateParts(show.date);
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'common.white',
        borderRadius: 1,
        p: { xs: 2.5, md: 3 },
        width: { xs: '100%', sm: 300 },
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>Next show</Typography>
      <Typography
        sx={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: 'uppercase', fontSize: '3.25rem', lineHeight: 1, mt: 0.5 }}
      >
        {weekday} {month} {day}
      </Typography>
      <Typography sx={{ fontWeight: 600, mt: 1 }}>
        {formatTime(show.timeStart)}, {show.title}
      </Typography>
      <Link component={RouterLink} to="/calendar" underline="always" sx={{ color: 'common.white', display: 'inline-block', mt: 1.5 }}>
        All upcoming shows
      </Link>
    </Box>
  );
}

function Home() {
  const nextShow = useNextShow();

  return (
    <>
      <PageMeta path="/" />

      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 640, md: 'min(88vh, 860px)' },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        <Box
          component="img"
          src={HERO_IMAGE}
          alt=""
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', pb: { xs: 4, md: 7 }, pt: 16 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '5.25rem', sm: '8rem', md: 'clamp(8rem, 15vw, 13rem)' },
              lineHeight: 0.82,
              ml: { md: '-0.04em' },
            }}
          >
            Take Cover!
          </Typography>

          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box sx={{ maxWidth: '40ch' }}>
              <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.45rem' }, fontWeight: 500, lineHeight: 1.4 }}>
                Arizona&apos;s rock and pop cover band for weddings, parties, corporate events and venues.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1.5 }}>
                1,067 events played at 45 venues so far.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
                <Button component={RouterLink} to="/contact" variant="contained" size="large">
                  Book us
                </Button>
                <Button
                  component={RouterLink}
                  to="/videos"
                  variant="outlined"
                  size="large"
                  sx={{ color: 'common.white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(0,0,0,0.3)' } }}
                >
                  Watch us play
                </Button>
              </Box>
            </Box>

            {nextShow && <NextShowTicket show={nextShow} />}
          </Box>
        </Container>
      </Box>

      <ArtistWall />
      <PictureGallery />
      <Reviews />

      <Box component="section">
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '4rem', sm: '6rem', md: '9rem' },
              lineHeight: 0.85,
            }}
          >
            Book the band
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 3, mt: 4 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.15rem', maxWidth: '52ch' }}>
              We&apos;re based in the Phoenix area and travel anywhere in Arizona. Send us the date,
              the place and roughly how many guests, and we&apos;ll get back to you with availability.
            </Typography>
            <Button component={RouterLink} to="/contact" variant="contained" size="large">
              Send a booking request
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;
