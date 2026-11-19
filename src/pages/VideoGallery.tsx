import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';

const youtube = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;

const FEATURED = youtube('Q5SBVhpT4ls');
const PORTRAIT = youtube('DamPl1rQ33A');
const PAIR = [youtube('uPLO5Rw1h5c'), youtube('Bu3uq56zWpk')];
const TRIO = [youtube('wKPn5tYczjY'), youtube('IYxXZbga_Uw'), youtube('0A1HkxHHyy0')];

function Video({ src, title }: { src: string; title: string }) {
  return (
    <Box
      component="iframe"
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
    />
  );
}

const tileSx = { bgcolor: 'black', borderRadius: 1, overflow: 'hidden' };

function VideoGallery() {
  return (
    <Box>
      <PageMeta path="/videos" />
      <PageHeader title="Videos" subtitle="Watch us in action" image="/images/header-videos.webp" imagePosition="center 45%" />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1, md: 1.5 },
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' },
          }}
        >
          {/* Featured video with the one portrait video standing beside it */}
          <Box sx={{ ...tileSx, gridColumn: { sm: '1 / -1', md: 'span 9' }, aspectRatio: '16 / 9' }}>
            <Video src={FEATURED} title="Take Cover! featured live video" />
          </Box>
          <Box
            sx={{
              ...tileSx,
              gridColumn: { sm: '1 / -1', md: 'span 3' },
              aspectRatio: { xs: '9 / 16', md: 'auto' },
              width: { xs: '100%', sm: 320, md: 'auto' },
              justifySelf: { xs: 'center', md: 'stretch' },
              maxWidth: { xs: 360, md: 'none' },
            }}
          >
            <Video src={PORTRAIT} title="Take Cover! live video (vertical)" />
          </Box>

          {PAIR.map((src, i) => (
            <Box key={src} sx={{ ...tileSx, gridColumn: { md: 'span 6' }, aspectRatio: '16 / 9' }}>
              <Video src={src} title={`Take Cover! live video ${i + 2}`} />
            </Box>
          ))}

          {TRIO.map((src, i) => (
            <Box
              key={src}
              sx={{
                ...tileSx,
                gridColumn: { sm: i === 2 ? '1 / -1' : 'auto', md: 'span 4' },
                aspectRatio: '16 / 9',
              }}
            >
              <Video src={src} title={`Take Cover! live video ${i + 4}`} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default VideoGallery;
