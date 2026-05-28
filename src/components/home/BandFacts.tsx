import LocationCityIcon from '@mui/icons-material/LocationCity';
import MicIcon from '@mui/icons-material/Mic';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SvgIconComponent } from '@mui/icons-material';
import playlist from '../../data/playlist.json';

interface StatCardProps {
  Icon: SvgIconComponent;
  value: string;
  label: string;
}

function StatCard({ Icon, value, label }: StatCardProps) {
  return (
    <Box sx={{ width: { xs: '100%', sm: '33.33%' }, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ m: 2, borderRadius: 1, color: 'white', textAlign: 'center', width: 288 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 144, height: 144, border: '4px solid', borderColor: 'error.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 112, height: 112, bgcolor: 'grey.800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <Icon sx={{ fontSize: 64, color: 'white'}} />
            </Box>
          </Box>
        </Box>
        <Typography variant="h3" fontWeight="bold">{value}</Typography>
        <Typography variant="h6">{label}</Typography>
      </Box>
    </Box>
  );
}

function BandFacts() {
  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'grey.400', textTransform: 'uppercase', letterSpacing: 2 }}>
          By The Numbers
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
          <Divider sx={{ width: 80, borderColor: 'error.main', borderWidth: 2 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <StatCard Icon={MicIcon} value="1067" label="Events Played" />
        <StatCard Icon={LocationCityIcon} value="45" label="Venues Played" />
        <StatCard Icon={QueueMusicIcon} value={String(playlist.length)} label="Current Playlist" />
      </Box>
    </Container>
  );
}

export default BandFacts;
