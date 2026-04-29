import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from './permission.entity';

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

  @Column({ nullable: false })
  icon: string;

  // TREE
  @ManyToOne(() => MenuItem, (m) => m.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: MenuItem;

  @OneToMany(() => MenuItem, (m) => m.parent)
  children: MenuItem[];

  // QUAN TRỌNG NHẤT
  @ManyToMany(() => Permission, (p) => p.menus)
  @JoinTable({
    name: 'menu_permissions',
    joinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
