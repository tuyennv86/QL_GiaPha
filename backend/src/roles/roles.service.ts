import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermRepo: Repository<RolePermission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['role_permissions', 'role_permissions.permission'],
    });
    if (!role) throw new NotFoundException('Không tìm thấy role');
    return role;
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepo.findOne({
      where: { role_name: dto.role_name },
    });
    if (existing) throw new ConflictException('Tên role đã tồn tại');

    const role = await this.roleRepo.save(this.roleRepo.create(dto));

    if (dto.permission_ids?.length) {
      await this.assignPermissions(role.id, dto.permission_ids);
    }

    return this.findOne(role.id);
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    await this.findOne(id);
    const { permission_ids, ...updateData } = dto;
    await this.roleRepo.update(id, updateData);

    if (permission_ids !== undefined) {
      await this.assignPermissions(id, permission_ids);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('Không tìm thấy role');
    await this.roleRepo.remove(role);
    return { message: 'Xoá role thành công' };
  }

  async assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<{ message: string }> {
    await this.rolePermRepo.delete({ role_id: roleId });
    if (permissionIds.length) {
      const perms = permissionIds.map((permission_id) =>
        this.rolePermRepo.create({ role_id: roleId, permission_id }),
      );
      await this.rolePermRepo.save(perms);
    }
    return { message: 'Cập nhật permissions thành công' };
  }
}
