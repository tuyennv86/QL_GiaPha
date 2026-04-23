import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100, nullable: true })
  permission_code: string;

  @Column({ length: 200, nullable: true })
  permission_name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  role_permissions: RolePermission[];
}
