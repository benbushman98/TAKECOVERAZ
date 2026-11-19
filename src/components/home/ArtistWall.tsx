import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import playlist from '../../data/playlist.json';

// All of these are on the current playlist (src/data/playlist.json).
const ARTISTS = [
  'The Beatles',
  'Tom Petty',
  'George Strait',
  'Journey',
  'Red Hot Chili Peppers',
  'Queen',
  'The Cure',
  'ZZ Top',
  'Oasis',
  'Billy Idol',
  'Eagles',
  'Sublime',
  'U2',
  'Aerosmith',
  'The Killers',
  'Brooks & Dunn',
  'Pink Floyd',
  'Michael Jackson',
  'The Black Keys',
  'Elvis',
  'Stevie Ray Vaughan',
  'Lenny Kravitz',
  'The Cars',
  'Waylon Jennings',
];

function ArtistWall() {
  return (
    <Box component="section" sx={{ bgcolor: 'primary.main', color: 'common.white' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>
          {playlist.length} songs on the list right now, by bands like
        </Typography>

        <Typography
          component="p"
          sx={{
            fontFamily: '"Big Shoulders Display", "Arial Narrow", sans-serif',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.75rem' },
            lineHeight: 0.98,
            textWrap: 'balance',
          }}
        >
          {ARTISTS.map((name, i) => (
            <Fragment key={name}>
              <Box component="span" sx={{ color: i % 2 === 0 ? 'common.white' : 'rgba(0,0,0,0.82)', whiteSpace: 'nowrap' }}>
                {name}
              </Box>{' '}
            </Fragment>
          ))}
          <Box component="span" sx={{ color: 'common.white', whiteSpace: 'nowrap' }}>
            and more.
          </Box>
        </Typography>

        <Button
          component={RouterLink}
          to="/playlist"
          variant="contained"
          size="large"
          sx={{ mt: 5, bgcolor: '#000', color: 'common.white', '&:hover': { bgcolor: '#1a1a1a' } }}
        >
          See every song we play
        </Button>
      </Container>
    </Box>
  );
}

export default ArtistWall;
