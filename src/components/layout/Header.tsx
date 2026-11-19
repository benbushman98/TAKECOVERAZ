import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const DRAWER_WIDTH = 240;
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Videos', path: '/videos' },
  { label: 'Shows', path: '/calendar' },
  { label: 'Playlist', path: '/playlist' },
];
const BOOK = { label: 'Book us', path: '/contact' };

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.toLowerCase() === path.toLowerCase();

  const drawer = (
    <Box onClick={() => setMobileOpen(false)} sx={{ bgcolor: '#000', height: '100%', pt: 2 }}>
      <List>
        {[...NAV_ITEMS, BOOK].map(({ label, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={path}
              aria-current={isActive(path) ? 'page' : undefined}
              sx={{ px: 3, py: 1.25, color: isActive(path) ? 'primary.light' : 'text.primary' }}
            >
              <ListItemText primary={label} primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: '#000', borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 76 }, gap: 2, maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <IconButton
            color="inherit"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' }, ml: -1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box component={RouterLink} to="/" sx={{ display: 'flex', mr: 'auto' }}>
            <Box
              component="img"
              src="/images/take-cover_tiny.webp"
              alt="Take Cover! home"
              sx={{ display: 'block', height: { xs: 44, sm: 56 } }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {NAV_ITEMS.map(({ label, path }) => (
              <Button
                key={path}
                component={RouterLink}
                to={path}
                aria-current={isActive(path) ? 'page' : undefined}
                sx={{
                  color: isActive(path) ? 'common.white' : 'text.secondary',
                  borderRadius: 0,
                  px: 1.5,
                  boxShadow: isActive(path) ? 'inset 0 -2px 0 #C8102E' : 'none',
                  '&:hover': { color: 'common.white', bgcolor: 'transparent' },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Button component={RouterLink} to={BOOK.path} variant="contained" sx={{ ml: { md: 1.5 } }}>
            {BOOK.label}
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: '#000' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
