import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaController } from '../controllers/manga.controller';
import { MangaEntity } from '../entities';
import { MangaService } from '../services/manga.service';

@Module({
  imports: [TypeOrmModule.forFeature([MangaEntity])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
