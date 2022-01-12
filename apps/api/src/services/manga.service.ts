import { Manga } from '@duck-manga/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { AuthorEntity, ChapterEntity, GenreEntity, MangaEntity } from '../entities';
import { CrudService } from './crud.service';

@Injectable()
export class MangaService extends CrudService {
  constructor(
    @InjectRepository(MangaEntity) private readonly mangaRepository: Repository<MangaEntity>,
    @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,
  ) {
    super();
  }

  async get(id: number): Promise<any> {
    const mangaEntity = await this.mangaRepository.findOne(id);
    const authors = await this.authorRepository
      .createQueryBuilder('author')
      .select('author.name', 'name')
      .innerJoin('mangas_authors_authors', 'maa', 'author.id = maa.authorsId AND maa.mangasId = :id', { id })
      .getRawMany();
    const genres = await getRepository(GenreEntity)
      .createQueryBuilder('genre')
      .select('genre.name', 'name')
      .innerJoin('mangas_genres_genres', 'mg', 'genre.id = mg.genresId AND mg.mangasId = :id', { id })
      .getRawMany();
    const chapters = await getRepository(ChapterEntity).createQueryBuilder('chapter').where('chapter.mangaId = :id', { id }).getMany();

    const manga = {
      ...mangaEntity,
      authors: authors.map((author) => author.name),
      genres: genres.map((genre) => genre.name),
      chapters,
    };
    return manga;
  }
}
