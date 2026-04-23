import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import { MenuPermission } from '../entities/menu-permission.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { TreeUtil } from './tree-builder.util';

type MenuNode = MenuItem & { children: MenuNode[] };

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,

    @InjectRepository(MenuPermission)
    private readonly menuPermRepo: Repository<MenuPermission>,
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

  async getMenuForUser(
    permissionCodes: string[],
    roles: string[],
  ): Promise<MenuItem[]> {
    const isAdmin =
      roles.some((role) => role?.toLowerCase() === 'admin') ?? false;
    if (isAdmin) {
      const menus = await this.menuRepo.find({});
      return TreeUtil.buildTree(menus);
    }

    const menus = await this.menuRepo
      .createQueryBuilder('m')
      .leftJoin('menu_permissions', 'mp', 'mp.menu_id = m.id')
      .leftJoin('permissions', 'p', 'p.id = mp.permission_id')
      .where('mp.id IS NULL OR p.permission_code IN (:...codes)', {
        codes: permissionCodes,
      })
      .orderBy('m.sort_order', 'ASC')
      .getMany();
    return TreeUtil.buildTree(menus);
  }

  async create(dto: CreateMenuItemDto): Promise<MenuItem> {
    const { permission_ids, ...menuData } = dto;
    const item = await this.menuRepo.save(this.menuRepo.create(menuData));

    if (permission_ids?.length) {
      const perms = permission_ids.map((permission_id) =>
        this.menuPermRepo.create({ menu_id: item.id, permission_id }),
      );
      await this.menuPermRepo.save(perms);
    }

    return item;
  }

  async update(id: number, dto: UpdateMenuItemDto): Promise<MenuItem> {
    await this.findOne(id);
    const { permission_ids, ...menuData } = dto;
    await this.menuRepo.update(id, menuData);

    if (permission_ids !== undefined) {
      await this.menuPermRepo.delete({ menu_id: id });
      if (permission_ids.length) {
        const perms = permission_ids.map((permission_id) =>
          this.menuPermRepo.create({ menu_id: id, permission_id }),
        );
        await this.menuPermRepo.save(perms);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const item = await this.findOne(id);
    await this.menuRepo.remove(item);
    return { message: 'Xoá menu item thành công' };
  }
}
