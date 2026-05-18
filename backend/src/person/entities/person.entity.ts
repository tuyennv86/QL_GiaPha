import { Family } from 'src/family/entities/family.entity';
import { FamilyBranch } from 'src/familybrannches/entities/family-branch.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonType } from '../enum/person-type.enum';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  family_id: number;

  @Column({ nullable: true })
  branch_id: number;

  @Column({ length: 200 })
  full_name: string;

  @Column()
  gender: number;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @Column({ type: 'date', nullable: true })
  death_date?: Date;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ length: 500, nullable: true })
  avatar: string;

  @Column({ nullable: true })
  generation: number;

  @Column({ nullable: true })
  is_alive: boolean;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  place_of_birth: string;

  @Column({ nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: PersonType,
  })
  person_type: PersonType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Family, (family) => family.persons, {
    nullable: true,
  })
  @JoinColumn({ name: 'family_id' })
  family: Family;

  @ManyToOne(() => FamilyBranch, (branch) => branch.persons, {
    nullable: true,
  })
  @JoinColumn({ name: 'branch_id' })
  branch: FamilyBranch;
}
