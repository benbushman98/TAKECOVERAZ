import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DRAWER_WIDTH = 200;
const NAV_ITEMS = [
  { label: 'About', path: '/about' },
  { label: 'Videos', path: '/videos' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Playlist', path: '/playlist' },
  { label: 'Contact', path: '/contact' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.toLowerCase() === path.toLowerCase();

  const drawer = (
    <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: 'center', bgcolor: '#000000', height: '100%' }}>
      <Typography variant="h6" sx={{ color: 'white', textTransform: 'uppercase', fontWeight: 'bold', my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            sx={{ justifyContent: 'center', color: location.pathname === '/' ? 'error.main' : 'white', my: 1 }}
          >
            <ListItemText primary="Home" sx={{ textAlign: 'center' }} />
          </ListItemButton>
        </ListItem>
        {NAV_ITEMS.map(({ label, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={path}
              sx={{ justifyContent: 'center', color: isActive(path) ? 'error.main' : 'white', my: 1 }}
            >
              <ListItemText primary={label} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#000000' }}>
      <AppBar component="nav" elevation={0} sx={{ backgroundColor: '#000000' }}>
        <Toolbar sx={{ pb: 1 }}>
          {/* Mobile: hamburger left */}
          <Box sx={{ display: { sm: 'none' }, width: 48, flexShrink: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo: centered on mobile via flexGrow, left-aligned on desktop */}
          <Box sx={{ flexGrow: { xs: 1, sm: 0 }, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box component="img" src="/images/take-cover_tiny.webp" alt="Take Cover AZ logo" sx={{ display: 'block', height: '100px', my: 1 }} />
          </Box>

          {/* Desktop: spacer then nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: location.pathname === '/' ? 'error.main' : 'white' }}
            >
              Home
            </Button>
            {NAV_ITEMS.map(({ label, path }) => (
              <Button
                key={path}
                component={RouterLink}
                to={path}
                sx={{ color: isActive(path) ? 'error.main' : 'white' }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Mobile: right placeholder balances hamburger so logo is truly centered */}
          <Box sx={{ display: { sm: 'none' }, width: 48, flexShrink: 0 }} />
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: '#000000' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
