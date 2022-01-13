import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChapterEntity } from '.';

@Entity('chapter-images')
export class ChapterImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  imageUrl: string;
  @Column('smallint')
  number: number;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.chapterImages)
  @JoinColumn({ name: 'chapterId' })
  chapter: ChapterEntity;
}
