import { ChapterImages } from '@duck-manga/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChapterEntity } from '../entities';
import { CrudService } from './crud.service';

@Injectable()
export class ChapterService extends CrudService {
  constructor(@InjectRepository(ChapterEntity) private readonly chapterRepository: Repository<ChapterEntity>) {
    super();
  }

  async getChapters(mangaId: number): Promise<ChapterEntity[]> {
    return this.chapterRepository.createQueryBuilder('chapter').where('chapter.mangaId = :id', { id: mangaId }).getMany();
  }

  async getImages(id: number): Promise<ChapterImages> {
    const images = await this.chapterRepository
      .createQueryBuilder('chapter')
      .innerJoin('chapter-images', 'ci', 'chapter.id = ci.chapterId')
      .where('chapter.id = :id', { id })
      .select('ci.imageUrl', 'imageUrl')
      .getRawMany();

    return images.map(({ imageUrl }) => imageUrl);
  }
}
