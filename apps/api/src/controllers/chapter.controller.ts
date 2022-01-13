import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { FastifyReply } from '@nestjs/platform-fastify/node_modules/fastify';
import { ChapterService } from '../services/chapter.service';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get(':id/images')
  async getImages(@Param('id') id: number, @Res() res: FastifyReply): Promise<any> {
    const images = await this.chapterService.getImages(id);
    return res.status(HttpStatus.OK).send(images);
  }
}
