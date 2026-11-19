import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BandMembers from '../components/about/BandMembers';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';

const bodySx = { color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.7, mb: 2, maxWidth: '62ch' };

function About() {
  return (
    <Box>
      <PageMeta path="/about" />
      <PageHeader title="About us" subtitle="Three Arizona musicians playing rock, pop and country hits for every kind of crowd." image="/images/header-about.webp" imagePosition="center 40%" />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 7 },
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ position: 'relative', minHeight: { xs: 240, md: 360 }, borderRadius: 1.5, overflow: 'hidden' }}>
            <Box
              component="img"
              src="/images/theBand.webp"
              alt="Take Cover! on stage"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
            />
          </Box>
          <Box>
            <Typography sx={{ ...bodySx, color: 'text.primary', fontSize: '1.2rem' }}>
              If you are planning a special event or private party and want a great entertainment
              option, Take Cover! is the right choice. As seasoned professionals, we have the talent
              to deliver a fantastic performance that will keep your guests dancing and wanting more.
            </Typography>
            <Typography sx={bodySx}>
              Our playlist covers hits from the &apos;60s, &apos;70s, &apos;80s, &apos;90s and beyond,
              from The Beatles, Rolling Stones, Stevie Wonder, Aerosmith, Rod Stewart, Cheap Trick,
              ZZ Top, Tom Petty, AC/DC, U2, Tears for Fears, Simple Minds, The Cars, Bon Jovi, Spin
              Doctors, R.E.M., The Killers, Weezer, Neon Trees, Maroon 5, Sublime, Queen and many more.
            </Typography>
            <Typography sx={bodySx}>
              Finding the right musical entertainment can be a challenge, so leave the music to us.
              Check out our live videos for samples, or come see us at a show to get the real feel of
              the band.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box component="section" sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.25rem' }, mb: 4 }}>
            The band
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            <BandMembers />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
