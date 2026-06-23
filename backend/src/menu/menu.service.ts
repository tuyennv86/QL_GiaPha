import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from 'src/menu/entities/menu-item.entity';

import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { TreeUtil } from './tree-builder.util';
import { Role } from 'src/roles/entities/role.entity';
import { MenuPermissionResponse } from './response/menu.permission.response';
import { RoleMenu } from 'src/role-menus/entities/role-menu.entity';

type MenuNode = MenuItem & { children: MenuNode[] };

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepo: Repository<RoleMenu>,
  ) {}

  findAll(): Promise<MenuItem[]> {
    return this.menuRepo.find({ order: { sort_order: 'ASC' } });
  }

  async findOne(id: number): Promise<MenuItem> {
    const item = await this.menuRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Không tìm thấy menu item');
    return item;
  }

  async getTree(): Promise<MenuNode[]> {
    const items = await this.menuRepo.find({ order: { sort_order: 'ASC' } });
    return TreeUtil.buildTree(items);
  }
  // lấy dánh sách menu theo role của user (dùng để render menu động ở frontend)
  async getMenuForUser(roles: string[]): Promise<MenuItem[]> {
    const menus = await this.menuRepo
      .createQueryBuilder('menu')
      .innerJoin(RoleMenu, 'rm', 'rm.menu_id = menu.id')
      .innerJoin(Role, 'role', 'role.id = rm.role_id')
      .where('role.role_name IN (:...roleNames)', {
        roleNames: roles,
      })
      .orderBy('menu.sort_order', 'ASC')
      .distinct(true)
      .getMany();
    return TreeUtil.buildTree(menus);
  }

  async getMenuNotRouter(): Promise<MenuItem[]> {
    return await this.menuRepo
      .createQueryBuilder('menu')
      .where('menu.menu_type = :type', { type: 'page' })
      .orderBy('menu.sort_order', 'ASC')
      .getMany();
  }

  async getMenuPermissions(): Promise<MenuPermissionResponse[]> {
    const menus: any[] = await this.menuRepo.query(`
      SELECT m.id, m.menu_name, m.route, m.parent_id, m.sort_order, m.icon, m.module_name, m.component_path, m.menu_type,
          COALESCE(
              json_agg(
                  json_build_object(
                      'id', p.id,
                      'permission_code', p.permission_code,
                      'permission_name', p.permission_name,
                      'description', p.description
                  )
              ) FILTER (WHERE p.id IS NOT NULL),
              '[]'
          ) AS permissions
      FROM menu_items m
      LEFT JOIN permissions p
          ON p.module = m.module_name
    
      GROUP BY m.id, m.menu_name, m.route, m.parent_id, m.sort_order, m.icon, m.module_name, m.component_path, m.menu_type
      ORDER BY m.sort_order ASC;`);

    return menus as MenuPermissionResponse[];
  }

  async create(dto: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuRepo.save(this.menuRepo.create(dto));
  }

  async update(id: number, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await this.findOne(id);
    const updatedItem = Object.assign(item, dto);
    return this.menuRepo.save(updatedItem);
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    // xóa tất cả menu_roles
    await this.roleMenuRepo.delete({ menu_id: id });
    await this.menuRepo.remove(item);
    return { message: 'Xoá menu item thành công' };
  }
}
