import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('family_branches')
export class FamilyBranch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  family_id: number;

  @Column({ nullable: false, length: 200 })
  branch_name: string;

  @Column({ nullable: true })
  branch_order: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Person, (person) => person.branch)
  persons: Person[];
}
