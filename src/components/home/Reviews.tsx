import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface ReviewItem {
  name: string;
  review: string[];
  company: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: 'David M.',
    review: [
      'Our 50th anniversary party was kicked up a notch with Take Cover! entertaining everyone for 3 hours. The guys had our customers singing, dancing and having a blast. We are a local family owned business and being able to support other local small businesses was a bonus on top of having great music at our party. These guys know it all and they take requests. Thanks again for a great time!',
    ],
    company: "Martin's Auto Repair",
  },
  {
    name: 'Danny G.',
    review: [
      '"Take Cover" — that\'s what I did when they started to play. Awesome sound, great vocals, super personalities when they mingled with our crowd. We had a corporate holiday party and they made the day. The only problem was they did not know the song "Ice Castles."',
      'Seriously, great day and everyone commented on the band.',
    ],
    company: "Tony's Service Center",
  },
  {
    name: 'Diana D.',
    review: [
      'What a great addition to our annual Training & Expo held at Wild Horse Pass. Holding the expo in the WHP showroom gave us an actual stage for Take Cover! to be the focus of our entertainment.',
      'We had a number of compliments on the added music and even more that it was a local live band that knew everything from the 60s to current. Thank you again for joining us and we look forward to having you back again.',
    ],
    company: 'SouthWest Automotive Professionals',
  },
  {
    name: 'Patti D.',
    review: [
      'I have had the pleasure of seeing "Take Cover" perform at various venues during the past few years and they never disappoint. So when the need came up to hire entertainment for a reunion event, I immediately thought of them. It was easy to coordinate with them, affordable, and everyone had a good time. They had amazing energy and engaged the group throughout!',
    ],
    company: 'Reunion',
  },
];

function Reviews() {
  return (
    <Box component="section" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Box component="figure" sx={{ m: 0, mb: { xs: 6, md: 9 } }}>
          <Typography
            component="blockquote"
            sx={{
              m: 0,
              fontFamily: '"Big Shoulders Display", "Arial Narrow", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.75rem', sm: '4rem', md: '5.5rem' },
              lineHeight: 0.98,
              maxWidth: '16ch',
              textWrap: 'balance',
            }}
          >
            <Box component="span" sx={{ color: 'primary.light' }}>&ldquo;</Box>
            These guys know it all and they take requests.
            <Box component="span" sx={{ color: 'primary.light' }}>&rdquo;</Box>
          </Typography>
          <Typography component="figcaption" sx={{ mt: 2.5, color: 'text.secondary', fontSize: '1.05rem' }}>
            David M., Martin&apos;s Auto Repair, after their 50th anniversary party
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            columnGap: 8,
            rowGap: { xs: 5, md: 6 },
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: { xs: 5, md: 6 },
          }}
        >
          {REVIEWS.map((item) => (
            <Box component="figure" key={item.name} sx={{ m: 0 }}>
              <Box component="blockquote" sx={{ m: 0 }}>
                {item.review.map((paragraph, i) => (
                  <Typography key={i} sx={{ lineHeight: 1.65, mb: 1.5, maxWidth: '62ch' }}>
                    {paragraph}
                  </Typography>
                ))}
              </Box>
              <Box component="figcaption" sx={{ mt: 2 }}>
                <Typography component="span" sx={{ fontWeight: 600, display: 'block' }}>
                  {item.name}
                </Typography>
                <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.company}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Reviews;
