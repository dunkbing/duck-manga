import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MangaEntity } from '../entities';
import { CrudService } from './crud.service';

@Injectable()
export class MangaService extends CrudService {
  constructor(@InjectRepository(MangaEntity) private readonly mangaRepository: Repository<MangaEntity>) {
    super();
  }

  get(id: number): Promise<MangaEntity> {
    return this.mangaRepository.findOne(id);
  }
}
