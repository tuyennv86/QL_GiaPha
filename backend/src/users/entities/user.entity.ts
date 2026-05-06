import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
// import { UserBranchRoles } from './user-branch-roles.entity';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { Family } from 'src/family/entities/family.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ length: 500, select: false })
  password_hash: string;

  @Column({ length: 200, nullable: true })
  full_name: string;

  @Column({ length: 200, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ nullable: true })
  family_id: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  last_login: Date;

  @ManyToOne(() => Family, (family) => family.users, { nullable: true })
  @JoinColumn({ name: 'family_id' })
  family: Family;

  @OneToMany(() => UserRole, (ur) => ur.user)
  user_roles: UserRole[];

  // @OneToMany(() => UserBranchRoles, (ubp) => ubp.user)
  // branch_roles: UserBranchRoles[];

  @OneToMany(() => RefreshToken, (rt) => rt.user)
  refresh_tokens: RefreshToken[];
}
