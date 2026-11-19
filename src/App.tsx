import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Calendar from './pages/Calendar';
import Playlist from './pages/Playlist';
import VideoGallery from './pages/VideoGallery';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Accessibility from './pages/Accessibility';
import Login from './pages/Login';
import Admin from './pages/admin/Admin';
import ErrorPage from './pages/Error';

const DISPLAY_FONT = '"Big Shoulders Display", "Arial Narrow", sans-serif';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C8102E',
      light: '#E8566B',
    },
    background: {
      default: '#0b0b0b',
      paper: '#151515',
    },
    text: {
      primary: '#f2f2f2',
      secondary: '#b3b3b3',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '"Archivo", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: DISPLAY_FONT, fontWeight: 900, lineHeight: 0.95, textTransform: 'uppercase' },
    h2: { fontFamily: DISPLAY_FONT, fontWeight: 800, lineHeight: 1, textTransform: 'uppercase' },
    h3: { fontFamily: DISPLAY_FONT, fontWeight: 800, lineHeight: 1.05 },
    h4: { fontFamily: DISPLAY_FONT, fontWeight: 800, lineHeight: 1.1 },
    h5: { fontFamily: DISPLAY_FONT, fontWeight: 700 },
    h6: { fontFamily: DISPLAY_FONT, fontWeight: 700, letterSpacing: '0.01em' },
    body1: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0, fontSize: '0.95rem' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#000' },
      },
    },
    MuiLink: {
      defaultProps: { color: 'primary.light' },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 4, padding: '8px 18px' },
        sizeLarge: { padding: '12px 26px', fontSize: '1rem' },
      },
    },
  },
});

function AdminRoute() {
  return localStorage.getItem('session') ? <Admin /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <HelmetProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Box
            component="a"
            href="#main"
            sx={{
              position: 'absolute',
              left: 8,
              top: -100,
              zIndex: 2000,
              bgcolor: 'primary.main',
              color: 'common.white',
              px: 2,
              py: 1,
              borderRadius: 1,
              fontWeight: 600,
              textDecoration: 'none',
              '&:focus': { top: 8 },
            }}
          >
            Skip to content
          </Box>
          <Header />
          <Box component="main" id="main" tabIndex={-1} sx={{ flexGrow: 1, outline: 'none' }}>
            <Routes>
              <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
              <Route path="/about" element={<About />} errorElement={<ErrorPage />} />
              <Route path="/calendar" element={<Calendar />} errorElement={<ErrorPage />} />
              <Route path="/playlist" element={<Playlist />} errorElement={<ErrorPage />} />
              <Route path="/videos" element={<VideoGallery />} errorElement={<ErrorPage />} />
              <Route path="/contact" element={<Contact />} errorElement={<ErrorPage />} />
              <Route path="/privacy" element={<Privacy />} errorElement={<ErrorPage />} />
              <Route path="/accessibility" element={<Accessibility />} errorElement={<ErrorPage />} />
              <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
              <Route path="/admin" element={<AdminRoute />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
