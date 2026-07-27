import { motion } from 'motion/react';
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
        bgcolor: 'background.paper',
        borderBottom: '3px solid',
        borderColor: 'primary.main',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: 'white', letterSpacing: 2, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
          <Divider sx={{ width: 80, borderColor: 'primary.main', borderWidth: 2 }} />
        </Box>
        {subtitle && (
          <Typography sx={{ color: 'grey.400', mt: 2, fontSize: '1.1rem' }}>
            {subtitle}
          </Typography>
        )}
      </motion.div>
    </Box>
  );
}
