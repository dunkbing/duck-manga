import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaController } from '../controllers/manga.controller';
import { AuthorEntity, MangaEntity } from '../entities';
import { MangaService } from '../services/manga.service';

@Module({
  imports: [TypeOrmModule.forFeature([MangaEntity, AuthorEntity])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
