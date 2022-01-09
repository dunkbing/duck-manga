import { Module } from '@nestjs/common';
import { MangaController } from '../controllers/manga.controller';

@Module({
  imports: [],
  controllers: [MangaController],
  providers: [],
})
export class MangaModule {}
