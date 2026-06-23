import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleMenusService {
  constructor(
    @InjectRepository(RoleMenu)
    private readonly roleMenuRepository: Repository<RoleMenu>,
  ) {}

  findByRole(roleId: number) {
    return this.roleMenuRepository.find({ where: { role_id: roleId } });
  }

  updateRoleMenus(roleId: number, menuIds: number[]) {
    //Xóa tất cả các menu hiện có của vai trò trước khi cập nhật
    return this.roleMenuRepository.delete({ role_id: roleId }).then(() => {
      // Thêm các menu mới cho vai trò
      const newRoleMenus = menuIds.map((menuId) => ({
        role_id: roleId,
        menu_id: menuId,
      }));
      return this.roleMenuRepository.save(newRoleMenus);
    });
  }
}
