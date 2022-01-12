import { Typography } from '@mui/material';
import { ErrorView } from '../components/views/ErrorView';

export default function IndexView() {
  return (
    <ErrorView>
      <Typography variant='h4'>Offline page</Typography>
    </ErrorView>
  );
}
