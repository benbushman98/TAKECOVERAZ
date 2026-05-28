import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import bandMemberData from '../../data/bandmembers.json';
import type { BandMember } from '../../types/bandMember';

const members = bandMemberData as BandMember[];

function BandMembers() {
  return (
    <>
      {members.map((member) => (
        <Box
          key={member.id}
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: 'calc(33.333% - 16px)' },
            maxWidth: { xs: 420, sm: 320 },
            borderRadius: 2,
            overflow: 'hidden',
            aspectRatio: '3/4',
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
        </Box>
      ))}
    </>
  );
}

export default BandMembers;
