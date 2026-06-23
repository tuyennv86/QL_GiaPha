import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: true })
  menu_name: string;

  @Column({ length: 200, nullable: true })
  route: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  sort_order: number;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  module_name: string;

  @Column({ nullable: true })
  component_path: string;

  @Column({ nullable: true })
  menu_type: string;

  // TREE
  @ManyToOne(() => MenuItem, (m) => m.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: MenuItem;

  @OneToMany(() => MenuItem, (m) => m.parent)
  children: MenuItem[];

  @OneToMany(() => Role, (r) => r.roleMenus)
  roles: Role[];
}
