import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const LINKS = [
  { href: 'https://www.facebook.com/takecoveraz/', label: 'Take Cover! on Facebook', Icon: FaFacebook },
  { href: 'https://www.instagram.com/takecoveraz/', label: 'Take Cover! on Instagram', Icon: FaInstagram },
  { href: 'https://www.youtube.com/@takecover2434', label: 'Take Cover! on YouTube', Icon: FaYoutube },
];

function Social() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {LINKS.map(({ href, label, Icon }) => (
        <IconButton
          key={href}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={{ color: 'text.secondary', fontSize: '1.4rem', '&:hover': { color: 'common.white' } }}
        >
          <Icon />
        </IconButton>
      ))}
    </Box>
  );
}

export default Social;
