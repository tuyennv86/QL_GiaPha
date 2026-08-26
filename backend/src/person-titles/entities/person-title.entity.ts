import { Person } from 'src/person/entities/person.entity';
import { Title } from 'src/titles/entities/title.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('person_titles')
export class PersonTitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  person_id: number;

  @Column()
  title_id: number;

  @Column({ nullable: true })
  branch_id: number;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Person, (person) => person.personTitles)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(() => Title)
  @JoinColumn({ name: 'title_id' })
  title: Title;
}
