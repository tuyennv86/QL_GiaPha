import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_branch_roles')
export class UserBranchRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  branch_id: number;

  @Column({ nullable: false })
  role_id: number;
}
