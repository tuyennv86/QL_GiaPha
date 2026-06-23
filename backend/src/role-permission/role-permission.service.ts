import { Injectable } from '@nestjs/common';
import { RolePermission } from './entities/role-permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  findByRole(roleId: number) {
    return this.rolePermissionRepository.find({ where: { role_id: roleId } });
  }
  updateRolePermissions(roleId: number, permissionIds: number[]) {
    // Xóa tất cả các quyền hiện có của vai trò trước khi cập nhật
    return this.rolePermissionRepository
      .delete({ role_id: roleId })
      .then(() => {
        // Thêm các quyền mới cho vai trò
        const newRolePermissions = permissionIds.map((permissionId) => ({
          role_id: roleId,
          permission_id: permissionId,
        }));
        return this.rolePermissionRepository.save(newRolePermissions);
      });
  }
}
