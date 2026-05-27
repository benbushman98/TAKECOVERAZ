import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import bandMemberData from '../../data/bandmembers.json';
import type { BandMember } from '../../types/bandMember';

const members = bandMemberData as BandMember[];

function BandMembers() {
  return (
    <>
      {members.map((member) => (
        <Card
          key={member.id}
          variant="outlined"
          sx={{ border: '4px solid', borderColor: 'grey.600', borderRadius: 1, m: 1.5, color: 'white', textAlign: 'center', width: '100%', maxWidth: 450, bgcolor: 'transparent' }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
            <Box
              component="img"
              src={member.img}
              alt={member.alt}
              sx={{ width: '75%', my: 1, borderRadius: 1 }}
            />
            <Typography variant="body1">{member.instrument}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default BandMembers;
