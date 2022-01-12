import { forwardRef, Ref } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);

export const MangaImage = forwardRef<any, AvatarProps>((props: AvatarProps, ref: Ref<any>) => {
  const classes = { ...useStyles(), ...props.classes };

  return <Avatar className={classes.root} variant='rounded' ref={ref} {...props} />;
});
