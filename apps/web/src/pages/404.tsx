import { Typography } from '@mui/material';
import { ErrorView } from '../components/views/ErrorView';
import Image from 'next/image';

export default function IndexView() {
  return (
    <ErrorView>
      <Typography gutterBottom variant='h4'>
        Not found
      </Typography>
      <Image src='/assets/404.png' alt='404' width='417' height='384' />
    </ErrorView>
  );
}
