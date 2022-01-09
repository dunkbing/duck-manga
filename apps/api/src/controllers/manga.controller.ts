import { Controller, Get, Param } from "@nestjs/common";
import { MangaRequestParams } from '@duck-manga/shared-types';

@Controller('manga')
export class MangaController {
  @Get(':id')
  get(@Param() params: MangaRequestParams) {
    return { id: params.id };
  }
}
