import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { WORKER_URL } from './admin/adminUtils';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import PageMeta from '../components/shared/PageMeta';
import type { Show } from '../types/show';
import { formatShowDate, isUpcoming, todayISO } from '../utils/date';
import { displayUrl, normalizeUrl } from '../utils/url';
import { buildEventSchema, formatTime } from '../utils/eventSchema';

const SKELETON_COUNT = 4;

function getMapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function Calendar() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${WORKER_URL}/shows`)
      .then((res) => res.json())
      .then((data: Show[]) => {
        // Compared as `YYYY-MM-DD` strings, not Dates: `new Date(show.date)` parses a
        // date-only string as UTC midnight while a local `today` is 7 hours later in
        // Arizona, which hid every show for the whole of the day it was being played.
        const today = todayISO();
        const upcoming = data
          .filter((show) => isUpcoming(show.date, today))
          .sort((a, b) => a.date.localeCompare(b.date));
        setShows(upcoming);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mt: { xs: '124px', sm: '124px' } }}>
      <PageMeta path="/calendar" />
      {shows.length > 0 && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(buildEventSchema(shows))}</script>
        </Helmet>
      )}
      <PageHeader title="Upcoming Shows" subtitle="Catch us live — we'll see you in the pit." />
      <Container sx={{ color: 'white', py: 5 }}>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <TableContainer component={Paper} sx={{ display: { xs: 'none', md: !loading && shows.length === 0 ? 'none' : 'block' }, bgcolor: 'grey.900' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.900' }}>
                  <TableCell sx={{ color: 'white', textAlign: 'center', width: '25%' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center', width: '25%' }}>Time</TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center', width: '50%' }}>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                      <TableRow key={i} sx={{ bgcolor: 'grey.900' }}>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Skeleton variant="text" width={60} sx={{ mx: 'auto', bgcolor: 'grey.800' }} />
                          <Skeleton variant="text" width={80} sx={{ mx: 'auto', bgcolor: 'grey.800' }} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Skeleton variant="text" width={100} sx={{ mx: 'auto', bgcolor: 'grey.800' }} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Skeleton variant="text" width={140} sx={{ mx: 'auto', bgcolor: 'grey.800' }} />
                          <Skeleton variant="text" width={200} sx={{ mx: 'auto', bgcolor: 'grey.800' }} />
                        </TableCell>
                      </TableRow>
                    ))
                  : shows.map((show) => (
                      <TableRow key={show.id}>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                          <Typography fontWeight="bold">{show.day}</Typography>
                          <Typography>{formatShowDate(show.date)}</Typography>
                        </TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                          {formatTime(show.timeStart)} &ndash; {formatTime(show.timeEnd)}
                        </TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                          <Typography fontWeight="bold">{show.title}</Typography>
                          {show.address.trim() ? (
                            <Link href={getMapsLink(show.address)} target="_blank" rel="noopener noreferrer">
                              {show.address}
                            </Link>
                          ) : (
                            <Typography variant="body2" sx={{ color: 'grey.500' }}>Private event</Typography>
                          )}
                          {show.link && (
                            <Box sx={{ mt: 1 }}>
                              <Link href={normalizeUrl(show.link)} target="_blank" rel="noopener noreferrer" variant="body2">
                                {displayUrl(show.link)}
                              </Link>
                            </Box>
                          )}
                          {show.notes && (
                            <Typography variant="body2" sx={{ mt: 1, color: 'primary.light', fontStyle: 'italic' }}>
                              {show.notes}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>

        {/* Mobile cards */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <Card key={i} sx={{ bgcolor: 'background.paper', mb: 1.5, border: '1px solid', borderColor: 'grey.700', borderRadius: 3 }}>
                  <CardContent>
                    <Skeleton variant="text" width="60%" sx={{ bgcolor: 'grey.800', mb: 0.5 }} height={32} />
                    <Skeleton variant="text" width="45%" sx={{ bgcolor: 'grey.800' }} />
                    <Skeleton variant="text" width="40%" sx={{ bgcolor: 'grey.800' }} />
                    <Skeleton variant="text" width="70%" sx={{ bgcolor: 'grey.800' }} />
                  </CardContent>
                </Card>
              ))
            : shows.map((show) => (
                <Card key={show.id} sx={{ bgcolor: 'background.paper', color: 'white', mb: 1.5, border: '1px solid', borderColor: 'grey.500', borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{show.title}</Typography>
                    <Typography><strong>Date:</strong> {formatShowDate(show.date)}</Typography>
                    <Typography><strong>Time:</strong> {formatTime(show.timeStart)} &ndash; {formatTime(show.timeEnd)}</Typography>
                    {show.address.trim() ? (
                      <Typography>
                        <strong>Address:</strong>{' '}
                        <Link href={getMapsLink(show.address)} target="_blank" rel="noopener noreferrer">
                          {show.address}
                        </Link>
                      </Typography>
                    ) : (
                      <Typography sx={{ color: 'grey.500' }}>Private event</Typography>
                    )}
                    {show.notes && (
                      <Typography variant="body2" sx={{ color: 'primary.light', fontStyle: 'italic' }}>
                        {show.notes}
                      </Typography>
                    )}
                    {show.link && (
                      <Link href={normalizeUrl(show.link)} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ mt: 1, display: 'block' }}>
                        {displayUrl(show.link)}
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
        </Box>

        {!loading && shows.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {error ? "We couldn't load the show list" : 'No public shows on the books right now'}
            </Typography>
            <Typography sx={{ color: 'grey.400', mb: 3 }}>
              {error
                ? 'Please refresh the page, or check our Facebook for the latest dates.'
                : 'New dates are added often — or bring the party to you.'}
            </Typography>
            <Button component={RouterLink} to="/contact" variant="contained" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              Book Take Cover! for your event
            </Button>
          </Box>
        )}

      </Container>
    </Box>
  );
}

export default Calendar;
