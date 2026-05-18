import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Person } from 'src/person/entities/person.entity';

@Entity('families')
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 200 })
  family_name: string;

  @Column({ length: 200 })
  ancestor_name: string;

  @Column({ length: 300 })
  origin_location: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => User, (user) => user.family)
  users: User[];

  @OneToMany(() => Person, (person) => person.family)
  persons: Person[];
}
