import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from 'src/users/entities/user-role.entity';
import { RoleMenu } from 'src/role-menus/entities/role-menu.entity';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  role_name: string;

  @Column({ length: 300, nullable: true })
  description: string;

  @OneToMany(() => UserRole, (ur) => ur.role)
  user_roles: UserRole[];

  @OneToMany(() => RolePermission, (rp) => rp.role)
  role_permissions: RolePermission[];

  // @ManyToMany(() => Role, (r) => r.menus)
  // menus: MenuItem[];

  @OneToMany(() => RoleMenu, (rm) => rm.role)
  roleMenus: RoleMenu[];
}
