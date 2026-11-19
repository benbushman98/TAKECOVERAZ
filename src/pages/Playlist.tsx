import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import PlaylistCard from '../components/playlist/PlaylistCard';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';
import playlist from '../data/playlist.json';

function Playlist() {
  return (
    <Box>
      <PageMeta path="/playlist" />
      <PageHeader
        title="Playlist"
        subtitle={`All ${playlist.length} songs we play right now, from the '60s to today.`}
        image="/images/header-playlist.webp"
        imagePosition="center 50%"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlaylistCard />
        <Typography sx={{ color: 'text.secondary', mt: 5, fontSize: '1.05rem' }}>
          Don&apos;t see a song you want?{' '}
          <Link component={RouterLink} to="/contact">
            Ask when you book us
          </Link>
          . We take requests.
        </Typography>
      </Container>
    </Box>
  );
}

export default Playlist;
