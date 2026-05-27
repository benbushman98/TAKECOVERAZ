import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <Box sx={{ textAlign: 'center', color: 'white', mt: '80px', p: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>Oops!</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>Sorry, an unexpected error has occurred.</Typography>
      <Typography sx={{ color: 'grey.400' }}>
        <em>{error?.statusText ?? error?.message ?? 'Unknown error'}</em>
      </Typography>
    </Box>
  );
}

export default ErrorPage;
