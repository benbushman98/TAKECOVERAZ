import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Social from '../shared/Social';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ textAlign: 'center', p: 2, color: 'white' }}>
      <Social />
      <Typography>&copy; {currentYear} Take Cover. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
