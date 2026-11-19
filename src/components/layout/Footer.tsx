import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Social from '../shared/Social';

const LINKS = [
  { label: 'Upcoming shows', path: '/calendar' },
  { label: 'Playlist', path: '/playlist' },
  { label: 'Videos', path: '/videos' },
  { label: 'Book us', path: '/contact' },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ bgcolor: '#000', borderTop: '1px solid', borderColor: 'divider' }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600 }}>Take Cover!</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Rock and pop cover band, Phoenix, Arizona
          </Typography>
        </Box>

        <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, listStyle: 'none', m: 0, p: 0 }}>
          {LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link component={RouterLink} to={path} underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'common.white' } }}>
                {label}
              </Link>
            </li>
          ))}
        </Box>

        <Social />
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', pb: 3, px: 2 }}>
        &copy; {currentYear} Take Cover!
      </Typography>
    </Box>
  );
}

export default Footer;
