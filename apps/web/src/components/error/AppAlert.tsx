import { forwardRef, Ref } from 'react';
import { createStyles, darken, lighten, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Alert, { AlertProps } from '@mui/lab/Alert';

type Severity = 'error' | 'info' | 'success' | 'warning';

const useStyles = makeStyles<Theme, AppAlertProps>((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      backgroundColor: ({ severity }) => {
        const getColor = theme.palette.mode == 'dark' ? darken : lighten;
        return getColor(theme.palette[severity as Severity].main, 0.3);
      },
      cursor: 'pointer',
      width: '200px',
      textOverflow: 'ellipsis ellipsis',
    },
    message: {
      overflowX: 'clip',
      textOverflow: 'ellipsis ellipsis',
    },
  }),
);

export type AppAlertProps = Omit<AlertProps, 'severity'> & { severity: Severity };

export const AppAlert = forwardRef<any, AppAlertProps>((props: AppAlertProps, ref: Ref<any>) => {
  const classes = { ...useStyles(props), ...props.classes };

  return <Alert classes={classes} ref={ref} {...props} />;
});
