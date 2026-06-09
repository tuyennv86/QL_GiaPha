import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person1_id' })
  person1: Person;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person2_id' })
  person2: Person;
}
