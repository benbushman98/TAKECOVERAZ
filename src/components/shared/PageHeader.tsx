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
        background: 'linear-gradient(135deg, #1a0000 0%, #0d0d0d 50%, #1a0000 100%)',
        borderTop: '2px solid',
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
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: 'white', letterSpacing: 4, textTransform: 'uppercase', position: 'relative', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
        >
          {title}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}
      >
        <Divider sx={{ width: 80, borderColor: 'error.main', borderWidth: 2 }} />
      </motion.div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          <Typography sx={{ color: 'grey.400', mt: 2, fontSize: '1.1rem', position: 'relative' }}>
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}
