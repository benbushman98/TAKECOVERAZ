import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BandFacts from '../components/home/BandFacts';
import Reviews from '../components/home/Reviews';
import Service from '../components/home/Service';
import PictureGallery from '../components/home/PictureGallery';

function Home() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url("https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          height: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Box sx={{ color: 'white', textAlign: 'center', position: 'absolute', bottom: 2, left: 0, width: '100%', px: { xs: 3, sm: 0 } }}>
          <Typography variant="h6">Playing the best of the 60&apos;s, 70&apos;s, 80&apos;s, 90&apos;s &amp; beyond!</Typography>
          <Typography variant="h6">We will, we will rock you!</Typography>
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
