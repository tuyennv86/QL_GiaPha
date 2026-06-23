import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  permission_code: string;

  @Column({ length: 200, nullable: true })
  permission_name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ length: 200, nullable: true })
  module: string;

  // role mapping
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  role_permissions: RolePermission[];
}
