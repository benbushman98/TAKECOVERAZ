import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const FEATURED_VIDEO = 'https://www.youtube.com/embed/Q5SBVhpT4ls';

const imgSx = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  borderRadius: 1,
};

function PictureGallery() {
  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '3rem', md: '4.5rem' } }}>
            Hear us live
          </Typography>
          <Link component={RouterLink} to="/videos" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
            More videos
          </Link>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1, md: 1.5 },
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gridTemplateAreas: {
              xs: '"video video" "chad rob" "band band" "drum drum"',
              md: '"video video video chad" "video video video rob" "band band band drum"',
            },
            gridTemplateRows: { md: '236px 236px 340px' },
          }}
        >
          <Box sx={{ gridArea: 'video', bgcolor: 'black', borderRadius: 1, overflow: 'hidden', aspectRatio: { xs: '16 / 9', md: 'auto' } }}>
            <Box
              component="iframe"
              title="Take Cover! playing live"
              src={FEATURED_VIDEO}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </Box>

          <Box sx={{ gridArea: 'chad', aspectRatio: { xs: '1 / 1', md: 'auto' } }}>
            <Box component="img" src="/images/Chad rockin.webp" alt="Chad on guitar under red stage lights" loading="lazy" sx={{ ...imgSx, objectPosition: 'center 20%' }} />
          </Box>
          <Box sx={{ gridArea: 'rob', aspectRatio: { xs: '1 / 1', md: 'auto' } }}>
            <Box component="img" src="/images/rob_alvarez_1.webp" alt="Rob playing bass" loading="lazy" sx={{ ...imgSx, objectPosition: 'center 20%' }} />
          </Box>

          <Box component="figure" sx={{ gridArea: 'band', m: 0, position: 'relative', aspectRatio: { xs: '2 / 1', md: 'auto' } }}>
            <Box component="img" src="/images/theBand.webp" alt="Chad, Jay and Rob playing an outdoor stage" loading="lazy" sx={{ ...imgSx, objectPosition: 'center 45%' }} />
            <Box
              component="figcaption"
              sx={{ position: 'absolute', left: 12, bottom: 12, bgcolor: '#000', px: 1.5, py: 0.75, borderRadius: 0.5, fontWeight: 600, fontSize: '0.95rem' }}
            >
              Chad, Jay and Rob
            </Box>
          </Box>
          <Box sx={{ gridArea: 'drum', aspectRatio: { xs: '2 / 1', md: 'auto' } }}>
            <Box component="img" src="/images/takecover_drum.webp" alt="Jay behind the drum kit" loading="lazy" sx={{ ...imgSx, objectPosition: 'center 35%' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PictureGallery;
