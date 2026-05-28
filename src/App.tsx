import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Calendar from './pages/Calendar';
import Playlist from './pages/Playlist';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/admin/Admin';
import ErrorPage from './pages/Error';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
      paper: '#111',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#000' },
      },
    },
  },
});

function AdminRoute() {
  return localStorage.getItem('session') ? <Admin /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'black' }}>
          <Header />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
              <Route path="/about" element={<About />} errorElement={<ErrorPage />} />
              <Route path="/calendar" element={<Calendar />} errorElement={<ErrorPage />} />
              <Route path="/playlist" element={<Playlist />} errorElement={<ErrorPage />} />
              <Route path="/contact" element={<Contact />} errorElement={<ErrorPage />} />
              <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
              <Route path="/admin" element={<AdminRoute />} />
            </Routes>
          </Box>
          <Box sx={{ bgcolor: 'black', height: '75px' }}>
            <Footer />
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
