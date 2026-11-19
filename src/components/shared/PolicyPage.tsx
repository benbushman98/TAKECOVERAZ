import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from './PageHeader';
import PageMeta from './PageMeta';
import type seo from '../../data/seo.json';

interface PolicyPageProps {
  path: keyof typeof seo.pages;
  title: string;
  subtitle: string;
  /** Shown as "Last updated …"; change it whenever the text changes. */
  updated: string;
  children: ReactNode;
}

/** Long-form text page (privacy policy, accessibility statement). Content is plain h2/p/ul/a. */
export default function PolicyPage({ path, title, subtitle, updated, children }: PolicyPageProps) {
  return (
    <Box>
      <PageMeta path={path} />
      <PageHeader title={title} subtitle={subtitle} />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>Last updated {updated}</Typography>
        <Box
          sx={{
            maxWidth: '68ch',
            color: 'text.secondary',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            '& h2': {
              fontFamily: '"Big Shoulders Display", "Arial Narrow", sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: { xs: '1.75rem', md: '2rem' },
              lineHeight: 1.1,
              color: 'text.primary',
              mt: 6,
              mb: 1.5,
            },
            '& h2:first-of-type': { mt: 0 },
            '& p': { m: 0, mb: 2 },
            '& ul': { m: 0, mb: 2, pl: 3 },
            '& li': { mb: 1 },
            '& strong': { color: 'text.primary', fontWeight: 600 },
            '& a': { color: 'primary.light', textUnderlineOffset: '0.15em' },
            '& a:hover': { color: 'common.white' },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
