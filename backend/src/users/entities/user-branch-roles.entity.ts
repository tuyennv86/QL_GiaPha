import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { User } from './user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('user_branch_roles')
export class UserBranchRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  branch_id: number;

  @Column()
  role_id: number;

  // @ManyToOne(() => User, (u) => u.branch_roles)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
