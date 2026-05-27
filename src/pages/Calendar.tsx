import { useState, useEffect } from 'react';
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
import Link from '@mui/material/Link';
import PageHeader from '../components/shared/PageHeader';
import type { Show } from '../types/show';

function getMapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function Calendar() {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/benbushman98/TAKECOVERAZ/main/public/data/shows.json')
      .then((res) => res.json())
      .then((data: Show[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = data
          .filter((show) => new Date(show.date) >= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setShows(upcoming);
      });
  }, []);

  return (
    <Box sx={{ mt: { xs: '116px', sm: '80px' } }}>
      <PageHeader title="Upcoming Shows" subtitle="Catch us live — we'll see you in the pit." />
    <Container sx={{ color: 'white', py: 5 }}>

      {/* Desktop table */}
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'grey.900' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.900' }}>
              <TableCell sx={{ color: 'white', textAlign: 'center', width: '25%' }}>Date</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', width: '25%' }}>Time</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', width: '50%' }}>Venue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shows.map((show) => (
              <TableRow key={show.id}>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography fontWeight="bold">{show.day}</Typography>
                  <Typography>{new Date(show.date + 'T00:00:00').toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                  {show.timeStart} &ndash; {show.timeEnd}
                </TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography fontWeight="bold">{show.title}</Typography>
                  <Link href={getMapsLink(show.address)} target="_blank" rel="noopener noreferrer">
                    {show.address}
                  </Link>
                  {show.link && (
                    <Box sx={{ mt: 1 }}>
                      <Link href={show.link} target="_blank" rel="noopener noreferrer" variant="body2">
                        {show.link}
                      </Link>
                    </Box>
                  )}
                  {show.notes && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'error.light', fontStyle: 'italic' }}>
                      {show.notes}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile cards */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {shows.map((show) => (
          <Card key={show.id} sx={{ bgcolor: '#202529', color: 'white', mb: 1.5, border: '1px solid', borderColor: 'grey.500', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{show.title}</Typography>
              <Typography><strong>Date:</strong> {new Date(show.date + 'T00:00:00').toLocaleDateString()}</Typography>
              <Typography><strong>Time:</strong> {show.timeStart} &ndash; {show.timeEnd}</Typography>
              <Typography>
                <strong>Address:</strong>{' '}
                <Link href={getMapsLink(show.address)} target="_blank" rel="noopener noreferrer">
                  {show.address}
                </Link>
              </Typography>
              {show.notes && (
                <Typography variant="body2" sx={{ color: 'error.light', fontStyle: 'italic' }}>
                  {show.notes}
                </Typography>
              )}
              {show.link && (
                <Link href={show.link} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ mt: 1, display: 'block' }}>
                  {show.link}
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

    </Container>
    </Box>
  );
}

export default Calendar;
