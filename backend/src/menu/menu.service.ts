import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import { MenuPermission } from '../entities/menu-permission.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { TreeUtil } from './tree-builder.util';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PermissionScope } from 'src/permissions/require-permissions.decorator';

type MenuNode = MenuItem & { children: MenuNode[] };

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,

    @InjectRepository(MenuPermission)
    private readonly menuPermRepo: Repository<MenuPermission>,
    private readonly permissionService: PermissionsService,
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
    const isAdmin = roles?.some((r) => r?.toLowerCase() === 'admin');
    const isBranchAdmin = roles?.some(
      (r) => r?.toLowerCase() === 'branch admin',
    );

    // load full menu + permissions
    const menus = await this.menuRepo.find({
      relations: ['permissions'],
      order: { sort_order: 'ASC' },
    });

    // ADMIN → full
    if (isAdmin) {
      return TreeUtil.buildTree(menus);
    }

    // Nếu có các quyền nào đó → mở rộng ra full list quyền (ví dụ: có 'user.create' → thêm quyền 'user.view')
    const userPerms = new Set(
      this.permissionService.expand(permissionCodes ?? []),
    );

    // FILTER
    const filtered = menus.filter((menu) => {
      // menu public
      if (!menu.permissions || menu.permissions.length === 0) {
        return true;
      }

      // BRANCH ADMIN: chặn global
      if (isBranchAdmin) {
        const hasGlobal = menu.permissions.some(
          (p) => p.scope === PermissionScope.GLOBAL,
        );

        if (hasGlobal) return false;

        // branch admin có full branch → không cần check permissionCodes
        return true;
      }

      // USER thường → phải có permission
      return menu.permissions.some((p) => userPerms.has(p.permission_code));
    });

    return TreeUtil.buildTree(filtered);
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
