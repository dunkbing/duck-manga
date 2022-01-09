import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MangaEntity } from "./manga.entity";

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
  manga: MangaEntity;
}
