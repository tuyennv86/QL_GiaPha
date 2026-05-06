import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { RolePermission } from 'src/roles/entities/role-permission.entity';
import { MenuItem } from 'src/menu/entities/menu-item.entity';
import { PermissionScope } from 'src/permissions/require-permissions.decorator';

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

  // 🔥 QUAN TRỌNG
  @Column({
    type: 'enum',
    enum: PermissionScope,
    default: PermissionScope.BRANCH,
  })
  scope: PermissionScope;

  // role mapping
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  role_permissions: RolePermission[];

  // map menu_permissions
  @ManyToMany(() => MenuItem, (menu) => menu.permissions)
  menus: MenuItem[];
}
