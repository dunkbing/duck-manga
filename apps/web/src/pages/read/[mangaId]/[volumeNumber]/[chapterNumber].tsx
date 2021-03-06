import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { Typography, Slide } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Reader } from '../../../../components/reader/Reader';
import { RootState, useAppDispatch, wrapper } from '../../../../redux/store';
import { fetchAll, fetchChapterImages, setCurrentChapter, setCurrentManga } from '../../../../redux/manga/actions';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';
import { CurrentChapter, CurrentChapterImages } from '../../../../redux/manga/reducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useInitialEffect } from '../../../../common/hooks';
import { Header } from '../../../../components/header/Header';
import { isClientSideNavigation, navigateToDetail } from '../../../../common/router';
import { requestAllMangaData } from '../../../../redux/manga/utils';
import { captureAxiosToError } from '../../../../common/utils';

const useStyles = makeStyles(() =>
  createStyles({
    headerInner: {},
    header: { opacity: 0.7 },
  }),
);

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
};

export default function Read({ mangaId, volumeNumber, chapterNumber }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { current: manga, chapter } = useSelector((state: RootState) => state.manga);
  const [headerImageNumber, setHeaderImageNumber] = useState(0);
  const [mode, setMode] = useState(undefined as ReaderMode | undefined);
  const [showHeader, setShowHeader] = useState(false);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    if (mangaId && volumeNumber && chapterNumber) {
      if (!manga || !chapter) {
        dispatch(fetchAll({ mangaId, volumeNumber, chapterNumber }));
      } else if (chapter && !chapter?.images) {
        dispatch(fetchChapterImages(chapter.id));
      }
    } else {
      router.replace('/search');
    }
  });

  useEffect(() => {
    if (chapter?.images?.length) {
      const img = new Image();
      img.src = chapter.images[0];
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        if (ratio > 2) {
          setMode('webtoon');
        } else {
          setMode('default');
        }
      };
    }
  }, [chapter?.images]);

  const chapterReady = useMemo(
    () => Boolean(chapter && chapter.number === chapterNumber && chapter.images !== undefined),
    [chapter, chapterNumber],
  );

  // Current chapter.number may differ from chapterNumber in case of replacing route
  return chapterReady && manga ? (
    <>
      <Slide appear={false} direction='down' in={!showHeader}>
        <Header className={classes.header} icon={<ArrowBackIcon />} onIconClick={() => navigateToDetail(router, manga.id, 1)}>
          <div className={classes.headerInner}>
            <Typography color='textPrimary' variant='h6'>
              {chapter?.title}
            </Typography>
            {chapter?.images ? (
              <Typography color='textPrimary' variant='subtitle1'>
                {headerImageNumber} / {chapter.images.length}
              </Typography>
            ) : null}
          </div>
        </Header>
      </Slide>
      <Reader
        onClick={() => setShowHeader(!showHeader)}
        manga={manga}
        chapter={chapter as CurrentChapter & Required<CurrentChapterImages>}
        mode={mode}
        setHeaderImageNumber={setHeaderImageNumber}
      />
    </>
  ) : (
    <CenteredProgress />
  );
}

/**
 * Server-side props for chapter read view.
 * 1. Ignore client-side requests
 * 2. If all needed params were provided, then fetch
 *    - If fetch fails, then send empty props which triggers client-side redirect.
 *        This is because there is not hydration if we redirect from SSR and we want to show error alerts
 * 3. If it's not provided - redirect to search
 */
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const mangaId = Number(query.mangaId);
  const volumeNumber = Number(query.volumeNumber);
  const chapterNumber = Number(query.chapterNumber);
  const props = {
    mangaId,
    volumeNumber,
    chapterNumber,
  };

  const clientSideNavigation = isClientSideNavigation(req);

  if (clientSideNavigation) return { props };

  if (mangaId && volumeNumber && chapterNumber) {
    try {
      const ssrData = await requestAllMangaData(mangaId, volumeNumber, chapterNumber);
      store.dispatch(setCurrentManga(ssrData.current));
      store.dispatch(setCurrentChapter(ssrData.chapter));
      return { props: { mangaId } };
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 404) return { notFound: true };
      Sentry.captureException(e);
      captureAxiosToError(store.dispatch, error);
      return {
        props: { mangaId: null },
      };
    }
  }
  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  };
});
