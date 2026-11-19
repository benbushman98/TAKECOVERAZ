import { Fragment, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import playlistData from '../../data/playlist.json';
import type { Song } from '../../types/song';

const songs = playlistData as Song[];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DISPLAY_FONT = '"Big Shoulders Display", "Arial Narrow", sans-serif';

/** "The Cure" files under C, like it would in a record store. */
function sortName(artist: string): string {
  return artist.replace(/^the\s+/i, '');
}

function letterFor(artist: string): string {
  const first = sortName(artist)[0]?.toUpperCase() ?? '#';
  return /[A-Z]/.test(first) ? first : '#';
}

/** Wraps the part of `text` that matches `query` in a highlight. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Box component="mark" sx={{ bgcolor: 'primary.main', color: 'common.white', px: '1px', borderRadius: '2px' }}>
        {text.slice(i, i + query.length)}
      </Box>
      {text.slice(i + query.length)}
    </>
  );
}

function PlaylistCard() {
  const [search, setSearch] = useState('');
  const query = search.trim();

  const filtered = useMemo(() => {
    if (!query) return songs;
    const q = query.toLowerCase();
    return songs.filter((s) => s.song.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [query]);

  /** letter -> [artist, songs][] */
  const sections = useMemo(() => {
    const byArtist = new Map<string, Song[]>();
    for (const song of filtered) {
      const list = byArtist.get(song.artist) ?? [];
      list.push(song);
      byArtist.set(song.artist, list);
    }
    const byLetter = new Map<string, [string, Song[]][]>();
    const artists = [...byArtist.entries()].sort(([a], [b]) => sortName(a).localeCompare(sortName(b)));
    for (const [artist, list] of artists) {
      list.sort((a, b) => a.song.localeCompare(b.song));
      const letter = letterFor(artist);
      const group = byLetter.get(letter) ?? [];
      group.push([artist, list]);
      byLetter.set(letter, group);
    }
    return [...byLetter.entries()];
  }, [filtered]);

  const available = useMemo(() => new Set(sections.map(([letter]) => letter)), [sections]);
  const artistCount = useMemo(() => sections.reduce((n, [, group]) => n + group.length, 0), [sections]);

  const jumpTo = (letter: string) => {
    document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a song or artist"
          inputProps={{ 'aria-label': 'Search for a song or artist' }}
          sx={{
            flex: '1 1 320px',
            maxWidth: 560,
            '& .MuiOutlinedInput-root': {
              fontSize: '1.1rem',
              bgcolor: 'background.paper',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position="end">
                <IconButton aria-label="Clear search" onClick={() => setSearch('')} edge="end">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
        <Typography sx={{ color: 'text.secondary' }} aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'song' : 'songs'} by {artistCount}{' '}
          {artistCount === 1 ? 'artist' : 'artists'}
          {query ? ` matching “${query}”` : ''}
        </Typography>
      </Box>

      {/* Letter bar: stays under the site header while scrolling */}
      <Box
        component="nav"
        aria-label="Jump to letter"
        sx={{
          position: 'sticky',
          top: { xs: 64, sm: 76 },
          zIndex: 2,
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 1,
          mb: 2,
          display: 'flex',
          flexWrap: { xs: 'nowrap', md: 'wrap' },
          overflowX: { xs: 'auto', md: 'visible' },
          scrollbarWidth: 'none',
          '& > button': { flexShrink: 0 },
          gap: 0.25,
        }}
      >
        {LETTERS.map((letter) => {
          const on = available.has(letter);
          return (
            <Box
              key={letter}
              component="button"
              type="button"
              disabled={!on}
              onClick={() => jumpTo(letter)}
              sx={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 800,
                fontSize: '1.15rem',
                lineHeight: 1,
                minWidth: 30,
                height: 34,
                px: 0.5,
                border: 0,
                borderRadius: 0.5,
                bgcolor: 'transparent',
                color: on ? 'common.white' : 'rgba(255,255,255,0.25)',
                cursor: on ? 'pointer' : 'default',
                '&:hover:not(:disabled)': { bgcolor: 'primary.main' },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.light' },
              }}
            >
              {letter}
            </Box>
          );
        })}
      </Box>

      {sections.length === 0 ? (
        <Box sx={{ py: 6 }}>
          <Typography variant="h4" component="p">
            Not on the list yet
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>
            Nothing matches “{query}”. Ask us about it when you book, we take requests.
          </Typography>
        </Box>
      ) : (
        sections.map(([letter, group]) => (
          <Box
            component="section"
            key={letter}
            id={`letter-${letter}`}
            aria-label={letter}
            sx={{
              scrollMarginTop: { xs: 140, sm: 150 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '88px 1fr' },
              gap: { xs: 1, md: 3 },
              py: { xs: 3, md: 4 },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              aria-hidden
              sx={{ fontFamily: DISPLAY_FONT, fontWeight: 900, color: 'primary.main', fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 0.85 }}
            >
              {letter}
            </Typography>

            <Box sx={{ columnCount: { xs: 1, sm: 2, lg: 3 }, columnGap: 5 }}>
              {group.map(([artist, artistSongs]) => (
                <Box key={artist} sx={{ breakInside: 'avoid', mb: 2.5 }}>
                  <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    <Highlight text={artist} query={query} />
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {artistSongs.map((song) => (
                      <Fragment key={song.id}>
                        <Typography component="li" sx={{ color: 'text.secondary', lineHeight: 1.55 }}>
                          <Highlight text={song.song} query={query} />
                        </Typography>
                      </Fragment>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}

export default PlaylistCard;
