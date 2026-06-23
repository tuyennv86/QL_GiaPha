import { MenuItem } from 'src/menu/entities/menu-item.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('role_menus')
export class RoleMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false })
  menu_id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => MenuItem)
  @JoinColumn({ name: 'menu_id' })
  menu: MenuItem;
}
