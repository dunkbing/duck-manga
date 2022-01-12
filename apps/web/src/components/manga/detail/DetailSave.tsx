import { FormControl, FormHelperText, MenuItem, Select, Theme, IconButton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { ChangeEvent, useCallback, useMemo } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, favor, removeFromList, unFavor } from '../../../redux/saveLists/actions';
import { RootState } from '../../../redux/store';
import { inList, inWhichList } from '../../../redux/saveLists/utils';
import { ListType } from '../../../redux/saveLists/types';
import { Manga } from '@duck-manga/shared-types';

type Props = {
  manga: Manga;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginBottom: theme.spacing(1) },
    heart: {
      color: '#e3344e',
    },
    helperText: { marginTop: 0 },
  }),
);

export const DetailSave = ({ manga }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const saveLists = useSelector((state: RootState) => state.saveLists);

  const isFavorite = useMemo(() => inList(manga, saveLists.favorite), [saveLists.favorite, manga]);
  const setFavorite = useCallback(() => {
    if (isFavorite) dispatch(dispatch(unFavor(manga)));
    else dispatch(dispatch(favor(manga)));
  }, [isFavorite, manga, dispatch]);

  const currentList = useMemo(() => inWhichList(manga, saveLists) || '', [saveLists, manga]);
  const setCurrentList = useCallback(
    (e: ChangeEvent<any>) => {
      if (currentList) {
        dispatch(removeFromList(manga, currentList));
      }
      if (e.target.value) {
        dispatch(addToList(manga, e.target.value as ListType));
      }
    },
    [currentList, manga, dispatch],
  );

  return (
    <div className={classes.root}>
      <IconButton onClick={setFavorite}>
        {isFavorite ? <FavoriteIcon className={classes.heart} /> : <FavoriteBorderIcon className={classes.heart} />}
      </IconButton>
      <FormControl variant='outlined' size='small'>
        <Select value={currentList} onChange={setCurrentList}>
          <MenuItem value=''>
            <em>No list selected</em>
          </MenuItem>
          <MenuItem value={'readLater'}>Read later</MenuItem>
        </Select>
        <FormHelperText className={classes.helperText}>Save to list</FormHelperText>
      </FormControl>
    </div>
  );
};
