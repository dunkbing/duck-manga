import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { MangaRequestParams } from '@duck-manga/shared-types';
import { MangaService } from '../services/manga.service';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get(':id')
  async get(@Param() params: MangaRequestParams, @Res() res: FastifyReply): Promise<any> {
    const manga = await this.mangaService.get(params.id);
    return res.send(manga);
  }

  @Get(':id/chapters')
  async getChapters(@Param() params: MangaRequestParams, @Res() res: FastifyReply): Promise<any> {
    const chapters = await this.mangaService.getChapters(params.id);
    return res.send(chapters);
  }

  @Get('search')
  async search(@Query('title') title: string, @Query('author') author: string, @Res() res: FastifyReply): Promise<any> {
    console.log(title, author);
    const results = await this.mangaService.search({ title, author });
    return res.status(HttpStatus.OK).send(results);
  }
}
