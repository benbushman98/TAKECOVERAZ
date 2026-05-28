import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import BandFacts from '../components/home/BandFacts';
import Reviews from '../components/home/Reviews';
import Service from '../components/home/Service';
import PictureGallery from '../components/home/PictureGallery';

function Home() {
  return (
    <>
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
        <Box sx={{ color: 'white', textAlign: 'center', position: 'relative', zIndex: 1, px: { xs: 3, sm: 2 }, width: '100%' }}>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{ textTransform: 'uppercase', letterSpacing: 4, fontSize: { xs: '3rem', md: '5rem' } }}
          >
            Take Cover!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Divider sx={{ width: 80, borderColor: 'error.main', borderWidth: 2 }} />
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
              bgcolor: 'error.main',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: 2,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'uppercase',
              '&:hover': { bgcolor: 'error.dark' },
            }}
          >
            Book Us
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#212529' }}>
        <BandFacts />
      </Box>
      <Box sx={{ bgcolor: 'black' }}>
        <PictureGallery />
      </Box>
      <Box sx={{ bgcolor: '#212529' }}>
        <Reviews />
      </Box>
      <Box sx={{ bgcolor: '#212529' }}>
        <Service />
      </Box>
    </>
  );
}

export default Home;
