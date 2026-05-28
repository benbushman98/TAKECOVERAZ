import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import playlist from '../../data/playlist.json';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Box sx={{ width: { xs: '100%', sm: '33.33%' }, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ m: 2, borderRadius: 1, color: 'white', textAlign: 'center', width: 288 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 144, height: 144, border: '4px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 112, height: 112, bgcolor: 'grey.600', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box component="img" src={icon} alt={label} sx={{ width: 64, height: 64 }} />
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
    <Container sx={{ mt: 5, mb: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <StatCard icon="/images/icons8-drum-64.webp" value="1067" label="Events Played" />
        <StatCard icon="/images/icons8-company-64.webp" value="45" label="Venues Played" />
        <StatCard icon="/images/icons8-song-64.webp" value={String(playlist.length)} label="Current Playlist" />
      </Box>
    </Container>
  );
}

export default BandFacts;
