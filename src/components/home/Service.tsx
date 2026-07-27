import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion.create(Box as any);

function Service() {
  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', m: 0, minHeight: '350px' }}>
        <MotionBox
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ width: { xs: '100%', lg: '50%' }, p: 0, minHeight: '300px' }}
        >
          <Box
            component="iframe"
            sx={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
            title="map of AZ"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380999.2749295337!2d-114.17278577421322!3d34.15255585532767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b08ebcb4c186b%3A0x423927b17fc1cd71!2sArizona!5e0!3m2!1sen!2sus!4v1670953547923!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ width: { xs: '100%', lg: '50%' }, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Typography variant="h4" sx={{ color: 'grey.400', textAlign: 'center', mt: 5, fontWeight: 'bold' }}>
            Service Area
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
            <Divider sx={{ width: 80, borderColor: 'primary.main', borderWidth: 2 }} />
          </Box>
          <Box sx={{ color: 'white', textAlign: 'center', p: 3, mx: 'auto', maxWidth: 420 }}>
            <Typography variant="h6">
              Arizona&apos;s favorite rock cover band travels.{' '}
              <MuiLink component={RouterLink} to="/contact" sx={{ color: 'primary.main' }}>
                Contact us
              </MuiLink>{' '}
              and let&apos;s talk!
            </Typography>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Service;
