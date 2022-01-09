import { Chapters } from "./chapter";

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
  authors?: string[];
  genres?: string[];
  categories?: string[];
  status?: string;
  year?: string;
  chapters?: Chapters;
  updatedDetail?: string;
  updatedChapters?: string;
}

export type MangaList = Array<Manga>

export interface MangaSearchResult {
  count: number;
  next?: string;
  previous?: string;
  results: MangaList;
}
