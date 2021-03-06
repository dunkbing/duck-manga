import React, { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import ForwardIcon from '@mui/icons-material/Forward';
import ExitIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { getNextChapter } from '../pager/hooks';
import { fetchChapterImages, setCurrentChapter } from '../../redux/manga/actions';
import { shallowNavigate } from '../../common/router';
import { Theme } from '@mui/material';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  goNext: {
    color: theme.palette.text.primary,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type Props = {
  nextUrl: string;
  setCurrentImage?: Dispatch<SetStateAction<number>>;
  exit?: boolean;
};

export const GoNextButton = ({ nextUrl, setCurrentImage, exit }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { current: manga, chapter } = useSelector((state: RootState) => state.manga);
  const nextChapter = useMemo(() => (manga ? getNextChapter(manga, chapter) : undefined), [manga, chapter]);

  useEffect(() => {
    router.prefetch(String(nextUrl));
  }, [router, nextUrl]);

  const goNext = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (nextUrl) {
        if (exit) shallowNavigate(router, nextUrl, 'replace');
        else if (nextChapter) {
          shallowNavigate(router, nextUrl, 'replace').then(() => {
            setCurrentImage && setCurrentImage(1);
            dispatch(setCurrentChapter(nextChapter));
            dispatch(fetchChapterImages(nextChapter.id));
          });
        }
      }
    },
    [nextUrl, exit, setCurrentImage, nextChapter, router, dispatch],
  );

  return (
    <Fab className={classes.goNext} aria-label='goNext' variant='circular' color='primary' onClick={goNext}>
      {!exit ? <ForwardIcon /> : <ExitIcon />}
    </Fab>
  );
};
