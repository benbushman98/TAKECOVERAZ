import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import bandMemberData from '../../data/bandmembers.json';
import type { BandMember } from '../../types/bandMember';

const MotionBox = motion.create(Box as any);
const members = bandMemberData as BandMember[];

function BandMembers() {
  return (
    <>
      {members.map((member, i) => (
        <MotionBox
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          transition={{
            default: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.2, ease: 'easeOut' },
          }}
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: 'calc(33.333% - 16px)' },
            maxWidth: { xs: 420, sm: 320 },
            borderRadius: 2,
            overflow: 'hidden',
            aspectRatio: '3/4',
            cursor: 'default',
          }}
        >
          <Box
            component="img"
            src={member.img}
            alt={member.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
              px: 2.5,
              pb: 2.5,
              pt: 6,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white">
              {member.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.300', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              {member.instrument}
            </Typography>
          </Box>
        </MotionBox>
      ))}
    </>
  );
}

export default BandMembers;
