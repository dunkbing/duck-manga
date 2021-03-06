import { useState, MouseEvent, useMemo } from 'react';
import { Divider, List, MenuItem, Theme, useMediaQuery } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { ThemePage } from '../components/settings/theme/ThemePage';

const mediaPx = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      [`@media (max-width:${mediaPx}px)`]: {
        flexDirection: 'column',
      },
      width: '100%',
    },
    sidebar: {
      width: '200px',
      [`@media (max-width:${mediaPx}px)`]: {
        width: '100%',
        marginBottom: theme.spacing(1),
      },
    },
    divider: {
      [`@media (min-width:${mediaPx}px)`]: {
        minHeight: '100vh',
      },
    },
    content: {
      padding: theme.spacing(3),
      [`@media (max-width:${mediaPx}px)`]: {
        padding: theme.spacing(1),
      },
    },
  }),
);

export default function Settings() {
  const classes = useStyles();
  const [menuItem, setMenuItem] = useState('theme');
  const bp = useMediaQuery(`(max-width:${mediaPx}px)`);

  const menuComponent = useMemo(() => {
    switch (menuItem) {
      case 'theme':
        return <ThemePage />;
      default:
        return <ThemePage />;
    }
  }, [menuItem]);

  const handleClick = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLLIElement)) {
      return;
    }
    setMenuItem(String(e.target.dataset.item));
  };

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <List>
          <MenuItem data-item='theme' onClick={handleClick} selected={menuItem === 'theme'}>
            Theme
          </MenuItem>
        </List>
      </div>
      <Divider className={classes.divider} orientation={bp ? 'horizontal' : 'vertical'} flexItem={!bp} />
      <div className={classes.content}>{menuComponent}</div>
    </div>
  );
}
