import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChapterModule } from './chapter.module';
import { DatabaseModule } from './database.module';
import { MangaModule } from './manga.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, MangaModule, ChapterModule],
})
export class AppModule {}
