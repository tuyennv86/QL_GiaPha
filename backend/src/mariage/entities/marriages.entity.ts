import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('marriages')
export class Marriages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  person1_id: number;

  @Column({ nullable: true })
  person2_id: number;

  @Column({ nullable: false })
  marriage_date: Date;

  @Column({ nullable: true })
  divorce_date: Date;

  @Column({ nullable: false })
  marriage_status: number;

  @Column({ nullable: false })
  marriage_order: number;

  @Column({ nullable: false, length: 500 })
  note: string;

  @CreateDateColumn()
  created_at: Date;
}
