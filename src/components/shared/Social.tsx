import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

function Social() {
  return (
    <Box sx={{ textAlign: 'center', width: '100%', py: 1 }}>
      <Box sx={{ my: 1, display: 'inline-flex', bgcolor: 'white', borderRadius: '50px', px: 1, py: 0.5 }}>
        <IconButton
          component="a"
          href="https://www.facebook.com/takecoveraz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Profile"
          sx={{ color: 'black', fontSize: '1.875rem' }}
        >
          <FaFacebook />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.youtube.com/@takecover2434"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Profile"
          sx={{ color: 'black', fontSize: '1.875rem' }}
        >
          <FaYoutube />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Social;
