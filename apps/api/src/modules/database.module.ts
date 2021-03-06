import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity, CategoryEntity, ChapterEntity, GenreEntity, MangaEntity } from '../entities';

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const entities = [
  AuthorEntity,
  CategoryEntity,
  ChapterEntity,
  GenreEntity,
  MangaEntity,
];
const synchronize = true;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities,
      synchronize,
      logging: true,
      ssl: { rejectUnauthorized: false },
    }),
  ],
})
export class DatabaseModule {}
