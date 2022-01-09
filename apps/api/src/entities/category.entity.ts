import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  name: string;
}
