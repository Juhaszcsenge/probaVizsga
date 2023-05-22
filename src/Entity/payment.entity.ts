import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member_id: number;

  @Column()
  amount: number;

  @Column()
  paid_at: string;
}
