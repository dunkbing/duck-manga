import { Chapters } from './chapter';

export interface Manga {
  id: number;
  title: string;
  altTitle?: string;
  rating?: number;
  thumbnail?: string;
  image?: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  status?: string;
  year?: string;
  updatedDetail?: string;
  updatedChapters?: string;
  authors?: string[];
  genres?: string[];
  categories?: string[];
  chapters?: Chapters;
}

export type MangaList = Array<Manga>;

export interface MangaSearchResult {
  count: number;
  next?: string;
  previous?: string;
  results: MangaList;
}

export interface MangaRequestParams {
  id?: number;
}
