import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChapterImageEntity } from './chapter-image.entity';
import { MangaEntity } from './manga.entity';

@Entity({ name: 'chapters' })
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  title: string;
  @Column('varchar', { length: 255 })
  link: string;
  @Column('smallint')
  volume: number;
  @Column('smallint')
  number: number;

  @ManyToOne(() => MangaEntity, (manga) => manga.chapters)
  @JoinColumn({ name: 'mangaId' })
  manga: MangaEntity;
  @OneToMany(() => ChapterImageEntity, (chapterImage) => chapterImage.chapter)
  chapterImages: ChapterImageEntity[];
}
