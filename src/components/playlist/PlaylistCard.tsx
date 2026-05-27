import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import playlistData from '../../data/playlist.json';
import type { Song } from '../../types/song';

const songs = playlistData as Song[];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function PlaylistCard() {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [expandedArtist, setExpandedArtist] = useState<string | false>(false);

  const filtered = useMemo(() => {
    let result = songs;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.song.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
      );
    }
    if (activeLetter) {
      result = result.filter((s) => s.artist.toUpperCase().startsWith(activeLetter));
    }
    return result;
  }, [search, activeLetter]);

  const groupedByArtist = useMemo(() => {
    const map = new Map<string, Song[]>();
    for (const song of filtered) {
      const list = map.get(song.artist) ?? [];
      list.push(song);
      map.set(song.artist, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const availableLetters = useMemo(
    () => new Set(songs.map((s) => s.artist[0].toUpperCase())),
    []
  );

  const handleLetterClick = (letter: string) => {
    setActiveLetter((prev) => (prev === letter ? null : letter));
    setExpandedArtist(false);
  };

  const handleAccordionChange = (artist: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedArtist(isExpanded ? artist : false);
  };

  return (
    <Box sx={{ py: 1 }}>
      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search song or artist…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setActiveLetter(null);
          setExpandedArtist(false);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: 'grey.500', fontSize: 16 }}>🔍</Typography>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 1.5,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'grey.700' },
            '&:hover fieldset': { borderColor: 'grey.500' },
          },
          '& input::placeholder': { color: 'grey.500' },
        }}
      />

      {/* A–Z tabs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5, justifyContent: 'center' }}>
        {LETTERS.map((letter) => {
          const available = availableLetters.has(letter);
          return (
            <Chip
              key={letter}
              label={letter}
              size="small"
              clickable={available}
              onClick={available ? () => handleLetterClick(letter) : undefined}
              sx={{
                minWidth: 28,
                fontSize: 12,
                fontWeight: 'bold',
                bgcolor: activeLetter === letter ? 'grey.300' : available ? 'grey.800' : 'grey.900',
                color: activeLetter === letter ? 'grey.900' : available ? 'grey.300' : 'grey.700',
                cursor: available ? 'pointer' : 'default',
                '&:hover': available ? { bgcolor: activeLetter === letter ? 'grey.300' : 'grey.600' } : {},
              }}
            />
          );
        })}
      </Box>

      {/* Result count */}
      <Typography variant="caption" sx={{ color: 'grey.500', display: 'block', textAlign: 'center', mb: 1 }}>
        {filtered.length} song{filtered.length !== 1 ? 's' : ''}
        {activeLetter ? ` starting with "${activeLetter}"` : ''}
        {search.trim() ? ` matching "${search.trim()}"` : ''}
      </Typography>

      {/* Artist accordions */}
      {groupedByArtist.length === 0 ? (
        <Typography sx={{ color: 'grey.500', textAlign: 'center', py: 2 }}>No songs found.</Typography>
      ) : (
        groupedByArtist.map(([artist, artistSongs]) => (
          <Accordion
            key={artist}
            expanded={expandedArtist === artist}
            onChange={handleAccordionChange(artist)}
            disableGutters
            sx={{
              bgcolor: 'grey.900',
              color: 'white',
              border: '1px solid',
              borderColor: 'grey.800',
              '&:before': { display: 'none' },
              mb: 0.5,
            }}
          >
            <AccordionSummary
              expandIcon={<Typography sx={{ color: 'grey.400', fontSize: 18 }}>▾</Typography>}
              sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>{artist}</Typography>
              <Typography sx={{ color: 'grey.500', fontSize: 12, ml: 1, alignSelf: 'center' }}>
                ({artistSongs.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0, pb: 1, px: 2 }}>
              {artistSongs.map((song) => (
                <Typography key={song.id} sx={{ color: 'grey.300', fontSize: 13, py: 0.25 }}>
                  {song.song}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}

export default PlaylistCard;
