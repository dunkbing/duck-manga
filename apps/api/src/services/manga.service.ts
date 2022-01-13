import { Manga } from '@duck-manga/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { AuthorEntity, ChapterEntity, GenreEntity, MangaEntity } from '../entities';
import { MANGAS_AUTHORS, MANGAS_GENRES } from '../entities/joined-table';
import { CrudService } from './crud.service';

@Injectable()
export class MangaService extends CrudService {
  constructor(
    @InjectRepository(MangaEntity) private readonly mangaRepository: Repository<MangaEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
  ) {
    super();
  }

  async get(id: number): Promise<Manga> {
    const mangaEntity = await this.mangaRepository.findOne(id);
    const authors = await this.authorRepository
      .createQueryBuilder('author')
      .select('author.name', 'name')
      .innerJoin(`${MANGAS_AUTHORS}`, 'ma', 'author.id = ma.authorsId AND ma.mangasId = :id', { id })
      .getRawMany();
    const genres = await getRepository(GenreEntity)
      .createQueryBuilder('genre')
      .select('genre.name', 'name')
      .innerJoin(`${MANGAS_GENRES}`, 'mg', 'genre.id = mg.genresId AND mg.mangasId = :id', { id })
      .getRawMany();
    const chapters = (await getRepository(ChapterEntity)
      .createQueryBuilder('chapter')
      .where('chapter.mangaId = :id', { id })
      .getMany()) as any;

    const manga = {
      ...mangaEntity,
      authors: authors.map((author) => author.name),
      genres: genres.map((genre) => genre.name),
      chapters,
    };
    return manga;
  }
}
