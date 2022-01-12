import { forwardRef, Ref } from 'react';
import { Chip, ChipProps, createStyles, Theme, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      fontSize: 'large',
      borderRadius: 5,
    },
  }),
);

export type DuckChipProps = ChipProps<any, { component: any }>;

export const DuckChip = forwardRef<any, DuckChipProps>((props: DuckChipProps, ref: Ref<any>) => {
  let classes = { ...useStyles(), ...props.classes };

  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chip size={smallMedia ? 'small' : 'medium'} color='primary' className={classes.root} ref={ref} {...props} />;
});
