import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birth_date: string;

  @Column()
  banned: number;

  @Column()
  created_at: string;
}
