export interface Chapter {
  id: number;
  title: string;
  link?: string;
  volume: number;
  number: number;
}

export type ChapterImages = Array<string>

export type Chapters = Array<Chapter>
