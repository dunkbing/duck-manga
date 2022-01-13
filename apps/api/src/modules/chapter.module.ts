import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterController } from '../controllers/chapter.controller';
import { ChapterEntity } from '../entities';
import { ChapterService } from '../services/chapter.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
