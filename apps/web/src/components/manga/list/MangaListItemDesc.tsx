import { ListItemText, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { DuckChip } from '../../DuckChip';
import { MangaRating } from '../MangaRating';
import { memo } from 'react';
import { useMemo } from 'react';
import { Manga } from '@duck-manga/shared-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        paddingTop: 0,
      },
    },
    footer: {},
    title: {
      marginTop: 0,
    },
    authors: {
      color: theme.palette.text.secondary,
    },
    genres: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
  }),
);

export const MangaListItemDesc = memo((manga: Manga) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const titleVariant = useMemo(() => {
    return smallDevice ? 'h5' : 'h4';
  }, [smallDevice]);

  return (
    <div className={classes.root}>
      <ListItemText className={classes.title}>
        <Typography variant={titleVariant}>{manga.title}</Typography>
      </ListItemText>

      <MangaRating value={manga.rating} />
      <div className={classes.footer}>
        <ul className={classes.genres}>
          {manga.genres?.map((genre) => (
            <DuckChip key={genre} component='li' label={genre} />
          ))}
        </ul>
      </div>
    </div>
  );
});
