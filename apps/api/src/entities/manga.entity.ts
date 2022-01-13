import { MangaStatus } from '@duck-manga/shared-types';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { ChapterEntity } from './chapter.entity';
import { GenreEntity } from './genre.entity';
import { MANGAS_AUTHORS, MANGAS_GENRES } from './joined-table';

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
  @JoinTable({
    name: MANGAS_AUTHORS,
    joinColumn: { name: 'mangaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'authorId', referencedColumnName: 'id' },
  })
  authors: AuthorEntity[];

  @ManyToMany(() => GenreEntity)
  @JoinTable({
    name: MANGAS_GENRES,
    joinColumn: { name: 'mangaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' },
  })
  genres: GenreEntity[];
}
