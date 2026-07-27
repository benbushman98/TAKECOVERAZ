import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Carousel from 'react-material-ui-carousel';

const MotionBox = motion.create(Box as any);

interface ReviewItem {
  name: string;
  review: string;
  company: string;
}

const REVIEWS: ReviewItem[] = [
  {
    name: 'Danny G.',
    review:
      '"Take Cover" — that\'s what I did when they started to play. Awesome sound, great vocals, super personalities when they mingled with our crowd. We had a corporate holiday party and they made the day. The only problem was they did not know the song "Ice Castles." \n Seriously, great day and everyone commented on the band.',
    company: "Tony's Service Center",
  },
  {
    name: 'Patti D.',
    review:
      'I have had the pleasure of seeing "Take Cover" perform at various venues during the past few years and they never disappoint. So when the need came up to hire entertainment for a reunion event, I immediately thought of them. It was easy to coordinate with them, affordable, and everyone had a good time. They had amazing energy and engaged the group throughout!',
    company: 'Reunion',
  },
  {
    name: 'Diana D.',
    review:
      'What a great addition to our annual Training & Expo held at Wild Horse Pass. Holding the expo in the WHP showroom gave us an actual stage for Take Cover! to be the focus of our entertainment. \n We had a number of compliments on the added music and even more that it was a local live band that knew everything from the 60s to current. Thank you again for joining us and we look forward to having you back again.',
    company: 'SouthWest Automotive Professionals',
  },
  {
    name: 'David M.',
    review:
      'Our 50th anniversary party was kicked up a notch with Take Cover! entertaining everyone for 3 hours. The guys had our customers singing, dancing and having a blast. We are a local family owned business and being able to support other local small businesses was a bonus on top of having great music at our party. These guys know it all and they take requests. Thanks again for a great time!',
    company: "Martin's Auto Repair",
  },
];

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <Paper elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Box sx={{ textAlign: 'center', color: 'white', px: 1.5 }}>
        <Typography>{item.review}</Typography>
        <Typography variant="h5" fontWeight="bold">{item.name}</Typography>
        <Typography sx={{ color: 'grey.400' }}>{item.company}</Typography>
        <br />
      </Box>
    </Paper>
  );
}

function Reviews() {
  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 0, minHeight: '500px' }}>
        <MotionBox
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ width: { xs: '100%', lg: '50%' }, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Typography variant="h4" sx={{ color: 'grey.400', textAlign: 'center', mt: 5, fontWeight: 'bold', px: { xs: 3, lg: 0 } }}>
            Hear Our Clients Thoughts
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
            <Divider sx={{ width: 80, borderColor: 'primary.main', borderWidth: 2 }} />
          </Box>
          <Box sx={{ my: 3, py: 1.5, display: 'flex', justifyContent: 'center' }}>
            <Carousel sx={{ width: '75%', overflow: 'hidden' }}>
              {REVIEWS.map((item, i) => (
                <ReviewCard key={i} item={item} />
              ))}
            </Carousel>
          </Box>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ width: { xs: '100%', lg: '50%' }, p: 0, minHeight: '400px' }}
        >
          <Box
            component="img"
            src="/images/theBand.webp"
            alt="Take Cover Band"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </MotionBox>
      </Box>
    </Box>
  );
}

export default Reviews;
