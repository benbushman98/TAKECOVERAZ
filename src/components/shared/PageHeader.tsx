import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 50%, #1a0000 100%)',
        borderBottom: '2px solid',
        borderColor: 'error.main',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            'repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)',
        }}
      />
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ color: 'white', letterSpacing: 4, textTransform: 'uppercase', position: 'relative', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
        <Divider sx={{ width: 80, borderColor: 'error.main', borderWidth: 2 }} />
      </Box>
      {subtitle && (
        <Typography sx={{ color: 'grey.400', mt: 2, fontSize: '1.1rem', position: 'relative' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
