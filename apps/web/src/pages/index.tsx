import { List, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { MangaListItem } from '../components/manga/list/MangaListItem';
import { saveList } from '../core/constants';
import { RootState } from '../redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      minHeight: '100vh',
    },
  }),
);

export default function IndexView() {
  const classes = useStyles();
  const lastVisited = useSelector((state: RootState) => state.manga.viewed);
  const favorites = useSelector((state: RootState) => state.saveLists.favorite);

  return (
    <div className={classes.root}>
      {favorites.length ? (
        <>
          <Typography variant='h4' align='center' gutterBottom>
            {saveList.favorite.alt}
          </Typography>
          <List>
            {favorites.map((element) => (
              <MangaListItem key={element.id} {...element} />
            ))}
          </List>
        </>
      ) : null}
      <Typography variant='h4' align='center' gutterBottom>
        {lastVisited.length ? 'Recently viewed' : 'No manga viewed'}
      </Typography>
      <List>
        {lastVisited.map((element) => (
          <MangaListItem key={element.id} {...element} />
        ))}
      </List>
    </div>
  );
}
