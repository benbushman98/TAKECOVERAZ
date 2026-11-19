import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import bandMemberData from '../../data/bandmembers.json';
import type { BandMember } from '../../types/bandMember';

const members = bandMemberData as BandMember[];

function BandMembers() {
  return (
    <>
      {members.map((member) => (
        <Box component="figure" key={member.id} sx={{ m: 0 }}>
          <Box
            component="img"
            src={member.img}
            alt={member.alt}
            loading="lazy"
            sx={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              borderRadius: 1.5,
              display: 'block',
            }}
          />
          <Box component="figcaption" sx={{ mt: 1.5 }}>
            <Typography variant="h5" component="span" sx={{ display: 'block', fontSize: '1.6rem' }}>
              {member.name}
            </Typography>
            <Typography component="span" sx={{ color: 'text.secondary' }}>
              {member.instrument}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default BandMembers;
