import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import BandFacts from '../components/home/BandFacts';
import Reviews from '../components/home/Reviews';
import Service from '../components/home/Service';
import PictureGallery from '../components/home/PictureGallery';
import PageMeta from '../components/shared/PageMeta';

function Home() {
  return (
    <>
      <PageMeta
        title="Take Cover! AZ"
        path="/"
      />
      <Box
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          minHeight: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: '124px', sm: '124px' },
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <Box sx={{ color: 'white', textAlign: 'center', position: 'relative', zIndex: 1, px: { xs: 3, sm: 2 }, width: '100%' }}>
            <Typography
              variant="h1"
              fontWeight="bold"
              sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: { xs: '3rem', md: '5rem' } }}
            >
              Take Cover!
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Divider sx={{ width: 80, borderColor: 'primary.main', borderWidth: 2 }} />
            </Box>

            <Typography variant="h5" sx={{ color: 'grey.300', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
              Playing the best of the 60&apos;s, 70&apos;s, 80&apos;s, 90&apos;s &amp; beyond!
            </Typography>

            <Typography variant="h6" sx={{ color: 'grey.400', mb: 4, fontStyle: 'italic' }}>
              We will, we will rock you!
            </Typography>

            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 'bold',
                letterSpacing: 2,
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Book Us
            </Button>
          </Box>
        </motion.div>
      </Box>

      <Box sx={{ bgcolor: 'background.paper' }}>
        <BandFacts />
      </Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <PictureGallery />
      </Box>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Reviews />
      </Box>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Service />
      </Box>
    </>
  );
}

export default Home;
