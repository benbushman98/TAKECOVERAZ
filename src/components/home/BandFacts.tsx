import { motion } from 'motion/react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MicIcon from '@mui/icons-material/Mic';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SvgIconComponent } from '@mui/icons-material';
import playlist from '../../data/playlist.json';

const MotionBox = motion.create(Box as any);

interface StatCardProps {
  Icon: SvgIconComponent;
  value: string;
  label: string;
  delay?: number;
}

function StatCard({ Icon, value, label, delay = 0 }: StatCardProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: 'easeOut' }}
      sx={{ width: { xs: '100%', sm: '33.33%' }, display: 'flex', justifyContent: 'center' }}
    >
      <Box sx={{ m: 2, borderRadius: 1, color: 'white', textAlign: 'center', width: 288 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 144, height: 144, border: '4px solid', borderColor: 'error.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 112, height: 112, bgcolor: 'grey.800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: 'translateZ(0)' }}>
              <Icon sx={{ fontSize: 64, color: 'white'}} />
            </Box>
          </Box>
        </Box>
        <Typography variant="h3" fontWeight="bold">{value}</Typography>
        <Typography variant="h6">{label}</Typography>
      </Box>
    </MotionBox>
  );
}

function BandFacts() {
  return (
    <Container sx={{ py: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'grey.400', textTransform: 'uppercase', letterSpacing: 2 }}>
            By The Numbers
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
            <Divider sx={{ width: 80, borderColor: 'error.main', borderWidth: 2 }} />
          </Box>
        </Box>
      </motion.div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <StatCard Icon={MicIcon} value="1067" label="Events Played" delay={0} />
        <StatCard Icon={LocationCityIcon} value="45" label="Venues Played" delay={0.15} />
        <StatCard Icon={QueueMusicIcon} value={String(playlist.length)} label="Current Playlist" delay={0.3} />
      </Box>
    </Container>
  );
}

export default BandFacts;
