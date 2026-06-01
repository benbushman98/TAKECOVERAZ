import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import PlaylistCard from '../components/playlist/PlaylistCard';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';

function Playlist() {
  return (
    <Box sx={{ mt: { xs: '124px', sm: '124px' } }}>
      <PageMeta
        title="Playlist"
        path="/playlist"
        description="Browse the Take Cover! AZ setlist — hits from the Beatles, Queen, Bon Jovi, The Killers, and many more."
      />
      <PageHeader title="Playlist" />
      <Container sx={{ pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Paper variant="outlined" sx={{ width: '100%', maxWidth: 700, border: '4px solid', borderColor: 'grey.900' }}>
              <Box sx={{ px: 2 }}>
                <PlaylistCard />
              </Box>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Playlist;
