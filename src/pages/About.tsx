import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BandMembers from '../components/about/BandMembers';
import PageHeader from '../components/shared/PageHeader';

const MotionBox = motion.create(Box as any);

function About() {
  return (
    <Box sx={{ mt: { xs: '124px', sm: '124px' } }}>
      <PageHeader title="About Us" />
      <Container sx={{ mb: 5, px: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', py: 3 }}>
          <MotionBox
            component="img"
            src="/images/theBand.webp"
            alt="the band"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            sx={{ borderRadius: 2, width: { xs: '100%', md: '50%' }, maxHeight: 420, objectFit: 'cover' }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ flex: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: 'grey.300', textTransform: 'uppercase', mb: 2 }}>
                Take Cover!
              </Typography>
              <Typography sx={{ color: 'grey.400', fontSize: '1rem', lineHeight: 1.8 }}>
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
          </motion.div>
        </Box>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ bgcolor: 'grey.900', py: 2.5, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ textTransform: 'uppercase', color: 'grey.300', fontWeight: 'bold', letterSpacing: '0.15em' }}>
            Members
          </Typography>
        </Box>
      </motion.div>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 5, px: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, alignItems: 'stretch' }}>
          <BandMembers />
        </Box>
      </Container>
    </Box>
  );
}

export default About;
