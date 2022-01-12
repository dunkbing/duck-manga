import { ReactEventHandler, useCallback, useState } from 'react';
import { Collapse, createStyles, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  ExpandLess,
  ExpandMore,
  List as ListIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DrawerItem } from './DrawerItem';
import { saveList } from '../../core/constants';

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    drawerWrapper: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    list: {
      paddingTop: theme.spacing(2),
      width: '250px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

type Props = {
  drawer: boolean;
  toggleDrawer: (value: boolean) => ReactEventHandler;
};

export const HeaderDrawer = ({ drawer, toggleDrawer }: Props) => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);

  const [listsOpen, setListsOpen] = useState(true);
  const openToggle = useCallback(() => {
    setListsOpen(!listsOpen);
  }, [listsOpen]);

  return (
    <SwipeableDrawer onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} open={drawer}>
      <div className={classes.drawerWrapper}>
        <List className={classes.list}>
          <DrawerItem href='/' text='Home' icon={<HomeIcon />} toggleDrawer={toggleDrawer} />
          <ListItem button onClick={openToggle}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary='Lists' />
            {listsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={listsOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {Object.entries(saveList).map(([listName, map]) => (
                <DrawerItem
                  key={listName}
                  href={`/lists/${listName}`}
                  className={classes.nested}
                  text={map.alt}
                  icon={map.icon}
                  toggleDrawer={toggleDrawer}
                />
              ))}
            </List>
          </Collapse>
          <DrawerItem href='/settings' text='Settings' icon={<SettingsIcon />} toggleDrawer={toggleDrawer} />
        </List>
        <List className={classes.list}>
          {user.access ? (
            <>
              {/* TODO: User profile */}
              <DrawerItem href='/' text={user.username} icon={<AccountBoxIcon />} toggleDrawer={toggleDrawer} />
              <DrawerItem href='/sign-out' text='Выйти' icon={<ExitToAppIcon />} toggleDrawer={toggleDrawer} />
            </>
          ) : (
            <DrawerItem href='/sign-in' text='Login' icon={<AccountBoxIcon />} toggleDrawer={toggleDrawer} />
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};
