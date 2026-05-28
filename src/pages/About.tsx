import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BandMembers from '../components/about/BandMembers';
import PageHeader from '../components/shared/PageHeader';

function About() {
  return (
    <Box sx={{ mt: { xs: '124px', sm: '124px' } }}>
      <PageHeader title="About Us" />
      <Container sx={{ mb: 5, px: 2 }}>
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Box
            component="img"
            src="/images/theBand.webp"
            alt="the band"
            sx={{ borderRadius: 1, my: 2, mx: 'auto', display: 'block', maxHeight: '400px', width: { xs: '100%', sm: '75%' } }}
          />
          <Typography variant="h5" sx={{ color: 'grey.400', textTransform: 'uppercase', mt: 4 }}>
            Take Cover!
          </Typography>
          <Typography sx={{ color: 'white', fontSize: '1.125rem', maxWidth: '72rem', mx: 'auto', mt: 2 }}>
            If you are planning a special event or private party and want a great entertainment
            option &quot;Take Cover!&quot; is the right choice. As seasoned professionals, we
            have the talent to deliver a fantastic performance that will keep your guests dancing
            and wanting more! Our extensive playlist includes hits from the 60&apos;s, 70&apos;s,
            80&apos;s, 90&apos;s, and beyond! &quot;Take Cover!&quot; performs hits from
            generations past to the present from the very best rock n roll bands including The
            Beatles, Rolling Stones, Stevie Wonder, Aerosmith, Rod Stewart, Cheap Trick, ZZ Top,
            Tom Petty, AC/DC, U2, Tears for Fears, Simple Minds, The Cars, Bon Jovi, Spin
            Doctors, R.E.M., The Killers, Weezer, Neon Trees, Maroon 5, Sublime, Queen and so
            much more! Finding the right musical entertainment can be a challenge, so why not
            hire &quot;Take Cover!&quot; and leave the music to us! Check out our live video for
            music samples or see us in person to get the real feel of the band in action.
          </Typography>
        </Box>
      </Container>

      <Box sx={{ mt: 3, pb: 5, px: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ textTransform: 'uppercase', color: 'grey.400', textDecoration: 'underline', fontWeight: 'bold' }}>
            Members
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          <BandMembers />
        </Box>
      </Box>

    </Box>
  );
}

export default About;
