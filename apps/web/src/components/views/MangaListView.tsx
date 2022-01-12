import { MangaList } from '@duck-manga/shared-types';
import { List, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { MangaListItem } from '../../components/manga/list/MangaListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      minHeight: '100vh',
    },
  }),
);

type Props = {
  header: string;
  mangaList: MangaList;
};

export const MangaListView = ({ header, mangaList }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header ? (
        <Typography variant='h4' align='center' gutterBottom>
          {header}
        </Typography>
      ) : null}
      <List>
        {mangaList.map((element) => (
          <MangaListItem key={element.id} {...element} />
        ))}
      </List>
    </div>
  );
};
