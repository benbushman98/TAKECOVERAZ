import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';

const MotionBox = motion.create(Box as any);

type Orientation = 'landscape' | 'portrait';

const VIDEOS: { src: string; orientation: Orientation }[] = [
  { src: 'https://www.youtube.com/embed/Q5SBVhpT4ls', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/uPLO5Rw1h5c', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/Bu3uq56zWpk', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/wKPn5tYczjY', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/IYxXZbga_Uw', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/0A1HkxHHyy0', orientation: 'landscape' },
  { src: 'https://www.youtube.com/embed/DamPl1rQ33A', orientation: 'portrait' },
];

function VideoCard({ src, orientation, index }: { src: string; orientation: Orientation; index: number }) {
  const isPortrait = orientation === 'portrait';
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
      sx={{ width: isPortrait ? { xs: '70%', sm: '45%', md: '22%' } : { xs: '100%', sm: '45%', md: '30%' } }}
    >
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'black' }}>
        <Box sx={{ width: '100%', aspectRatio: isPortrait ? '9/16' : '16/9' }}>
          <Box
            component="iframe"
            title="Take Cover Band video"
            src={src}
            sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allowFullScreen
          />
        </Box>
      </Paper>
    </MotionBox>
  );
}

function VideoGallery() {
  return (
    <Box sx={{ mt: { xs: '124px', sm: '124px' } }}>
      <PageMeta
        title="Video Gallery"
        path="/videos"
        description="Watch Take Cover! AZ in action — live performance videos from shows across Arizona."
      />
      <PageHeader title="Video Gallery" subtitle="Watch us in action" />
      <Container maxWidth="lg" sx={{ py: 5, px: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.src} src={video.src} orientation={video.orientation} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default VideoGallery;
