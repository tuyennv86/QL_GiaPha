import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('parent_child')
export class ParentChild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  father_id?: number;

  @Column({ nullable: true })
  mother_id?: number;

  @Column()
  child_id: number;

  @Column({ type: 'smallint' })
  relationship_type: number;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'father_id' })
  father: Person;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'mother_id' })
  mother: Person;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'child_id' })
  child: Person;
}
