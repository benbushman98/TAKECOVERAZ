import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Carousel from 'react-material-ui-carousel';

const ITEMS = [
  { name: 'Chad', src: 'Chad 3.webp' },
  { name: 'Jay', src: 'jay.webp' },
  { name: 'Chad', src: 'Chad 4.webp' },
  { name: 'Rob', src: 'rob_alvarez_2.webp' },
  { name: 'Chad', src: 'Chad 5.webp' },
  { name: 'Jay', src: 'jay_3.webp' },
  { name: 'Chad', src: 'Chad 6.webp' },
  { name: 'Jay', src: 'jay_1.webp' },
  { name: 'Rob', src: 'rob_alvarez_1.webp' },
  { name: 'Jay', src: 'takecover_drum.webp' },
  { name: 'Chad', src: 'Chad rockin.webp' },
  { name: 'Jay', src: 'jay_2.webp' },
  { name: 'Group', src: 'takecover_group.webp' },
];

const VIDEO_URLS = [
  "https://www.youtube.com/embed/Q5SBVhpT4ls",
  "https://www.youtube.com/embed/uPLO5Rw1h5c",
  "https://www.youtube.com/embed/Bu3uq56zWpk",
  "https://www.youtube.com/embed/wKPn5tYczjY",
];

function VideoPanel({ src }: { src: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', py: { xs: 2, lg: 0 } }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 460,
          aspectRatio: '16/9',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'black',
        }}
      >
        <Box
          component="iframe"
          title="Take Cover Band Showcase"
          src={src}
          sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allowFullScreen
        />
      </Box>
    </Box>
  );
}

function GalleryItem({ item }: { item: { name: string; src: string } }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ width: '100%', height: 420, overflow: 'hidden', borderRadius: 3 }}>
        <Box
          component="img"
          alt={item.name}
          src={`/images/${item.src}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
      </Box>
    </Paper>
  );
}

function PictureGallery() {
  return (
    <Box sx={{ width: '100%', m: 0, px: { xs: 1.5, lg: 5 }, mb: 5 }}>
      <Typography variant="h4" sx={{ color: 'grey.400', textAlign: 'center', mt: 5, mb: 3, fontWeight: 'bold' }}>
        See the Band in Action
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: { xs: '100%', lg: '30%' }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <VideoPanel src={VIDEO_URLS[0]} />
          <VideoPanel src={VIDEO_URLS[2]} />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: { xs: '100%', lg: 0 } }}>
          <Carousel autoPlay animation="slide" interval={4000} navButtonsAlwaysVisible sx={{ borderRadius: 3, overflow: 'hidden' }}>
            {ITEMS.map((item, i) => (
              <GalleryItem key={i} item={item} />
            ))}
          </Carousel>
        </Box>

        <Box sx={{ width: { xs: '100%', lg: '30%' }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <VideoPanel src={VIDEO_URLS[1]} />
          <VideoPanel src={VIDEO_URLS[3]} />
        </Box>
      </Box>
    </Box>
  );
}

export default PictureGallery;
