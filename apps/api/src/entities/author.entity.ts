import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'authors' })
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  name: string;
}
