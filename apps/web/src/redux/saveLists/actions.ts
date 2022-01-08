import { Manga } from '@duck-manga/shared-types';
import { createAction } from '@reduxjs/toolkit';
import { ListType } from './types';

export const favor = createAction<Manga>('saveLists/favor');
export const unFavor = createAction<Manga>('saveLists/unfavor');

export const addToList = createAction('saveLists/addToList', (manga: Manga, list: ListType) => {
  return {
    payload: {
      manga,
      list,
    },
  };
});

export const removeFromList = createAction('saveLists/removeFromList', (manga: Manga, list: ListType) => {
  return {
    payload: {
      manga,
      list,
    },
  };
});
