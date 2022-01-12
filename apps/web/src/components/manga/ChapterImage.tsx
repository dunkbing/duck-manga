import { Avatar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { memo } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      height: '100%',
      width: '100%',
    },
  }),
);

type Props = {
  image: string;
};

export const ChapterImage = memo(({ image }: Props) => {
  // TODO: add click handler
  const classes = useStyles();
  return <Avatar variant='square' className={classes.image} src={image} />;
});
