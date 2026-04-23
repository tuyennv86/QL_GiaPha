import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('families')
export class Family {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, length: 200 })
  family_name: string;

  @Column({ length: 200 })
  ancestor_name: string;

  @Column({ length: 300 })
  origin_location: string;

  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => User, (user) => user.family_id)
  users: User[];
}
