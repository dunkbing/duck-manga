import { forwardRef, Ref } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Rating, RatingProps } from '@mui/lab';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

export const MangaRating = forwardRef<any, RatingProps>(({ value, ...props }: RatingProps, ref: Ref<any>) => {
  const classes = { ...useStyles(), ...props.classes };

  return <Rating readOnly precision={0.1} value={value || 0} className={classes.root} ref={ref} {...props} />;
});
