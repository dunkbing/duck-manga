import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { CategoryEntity } from "./category.entity";
import { ChapterEntity } from "./chapter.entity";
import { GenreEntity } from "./genre.entity";

export enum MangaStatus {
  ONGOING,
  COMPLETED,
}

@Entity({ name: 'mangas' })
export class MangaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  title: string;
  @Column('varchar', { length: 255, nullable: true })
  altTitle?: string;
  @Column()
  rating?: number;
  @Column()
  thumbnail?: string;
  @Column()
  image?: string;
  @Column()
  description: string;
  @Column()
  source?: string;
  @Column()
  sourceUrl?: string;
  @Column('enum', { enum: MangaStatus, default: MangaStatus.ONGOING })
  status?: MangaStatus;
  @Column()
  year?: string;
  @Column()
  updatedDetail?: string;
  @Column()
  updatedChapters?: string;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.manga)
  chapters: ChapterEntity[];

  @ManyToMany(() => AuthorEntity)
  @JoinTable()
  authors: AuthorEntity[];

  @ManyToMany(() => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}
