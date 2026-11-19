import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Photo shown on the right of the header, fading into the background. */
  image?: string;
  /** CSS object-position for the photo, e.g. "center 30%". */
  imagePosition?: string;
}

export default function PageHeader({ title, subtitle, image, imagePosition = 'center' }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#000' }}
    >
      {image && (
        <Box aria-hidden sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: { xs: '100%', md: '62%' } }}>
          <Box
            component="img"
            src={image}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition, display: 'block' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: {
                xs: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 100%)',
                md: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 100%)',
              },
            }}
          />
        </Box>
      )}
      <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 7 } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '3.25rem', md: '5.5rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 1.5, fontSize: '1.15rem', maxWidth: '46ch' }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
