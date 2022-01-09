import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const entities = [];
const synchronize = true;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      entities,
      synchronize,
      logging: true,
      ssl: { rejectUnauthorized: true },
    }),
  ],
})
export class DatabaseModule {}
