import { Chapter, ChapterImages, Manga, MangaList } from '@duck-manga/shared-types';
import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentManga,
  loadViewedManga,
  pushViewedManga,
  fetchMangaDetail,
  fetchMangaChapters,
  setCurrentChapter,
  fetchChapterImages,
  fetchAll,
  setRead,
} from './actions';

export type CurrentChapterImages = { images?: ChapterImages };
export type CurrentChapter = Chapter & CurrentChapterImages;

type StateType = {
  current?: Manga;
  chapter?: CurrentChapter;
  viewed: MangaList;
  readChapters: Record<number, number>;
};

const initialState: StateType = {
  viewed: [],
  readChapters: {},
};

const reducer = createReducer(initialState, (builder) => {
  // Manga
  builder.addCase(setCurrentManga, (state, action) => {
    const chapters = (action.payload.chapters?.length && action.payload.chapters) || state.current?.chapters;
    state.current = {
      ...action.payload,
    };
    if (chapters) state.current.chapters = chapters;
  });
  builder.addCase(fetchMangaDetail.fulfilled, (state, action) => {
    state.current = { ...state.current, ...action.payload };
  });

  // Chapter
  builder.addCase(setCurrentChapter, (state, action) => {
    state.chapter = action.payload;
  });
  builder.addCase(fetchChapterImages.fulfilled, (state, action) => {
    if (state.chapter) state.chapter.images = action.payload;
  });
  builder.addCase(fetchMangaChapters.fulfilled, (state, action) => {
    if (state.current) state.current.chapters = action.payload;
  });
  builder.addCase(setRead, (state, action) => {
    state.readChapters[action.payload.mangaId] = action.payload.chapterId;
  });

  // Viewed
  builder.addCase(loadViewedManga, (state, action) => {
    state.viewed = action.payload;
  });
  builder.addCase(pushViewedManga, (state, action) => {
    let newViewed = state.viewed.filter((element) => element.id !== action.payload.id);
    newViewed.unshift(action.payload);
    // If some values were removed after filter
    while (newViewed.length > 3) {
      newViewed.pop();
    }

    state.viewed = newViewed;
  });

  // Other
  builder.addCase(fetchAll.fulfilled, (state, action) => {
    state.current = action.payload.manga;
    state.chapter = action.payload.chapter;
  });
});

export default reducer;
