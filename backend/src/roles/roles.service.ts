import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolePermission } from 'src/roles/entities/role-permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseList } from './response/role.response';
import { RoleSumUserResponse } from 'src/roles/response/role.sumuser.response';
import { RoleMapper } from './mapper/role.mapper';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermRepo: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepo.find({ order: { id: 'ASC' } });
  }

  async getRolesWithUserCount(search?: string): Promise<RoleSumUserResponse[]> {
    return await this.roleRepo
      .createQueryBuilder('role')
      .leftJoin('role.user_roles', 'ur')
      .leftJoin('ur.user', 'user')
      .select('role.id', 'id')
      .addSelect('role.role_name', 'role_name')
      .addSelect('role.description', 'description')
      .addSelect('COUNT(user.id)', 'users_count')
      .where('LOWER(role.role_name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .groupBy('role.id')
      .addGroupBy('role.role_name')
      .orderBy('role.id', 'ASC')
      .getRawMany();
  }

  async search(
    page: number,
    limit: number,
    search?: string,
  ): Promise<RoleResponseList> {
    // COUNT riêng (không join)
    const countQuery = this.roleRepo.createQueryBuilder('role');

    if (search) {
      countQuery
        .where('role.role_name LIKE :search', { search: `%${search}%` })
        .orWhere('role.description LIKE :search', { search: `%${search}%` });
    }

    const total = await countQuery.getCount();

    // DATA query
    const query = this.roleRepo
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.role_permissions', 'rp')
      .leftJoinAndSelect('rp.permission', 'permission');

    if (search) {
      query
        .where('role.role_name LIKE :search', { search: `%${search}%` })
        .orWhere('role.description LIKE :search', { search: `%${search}%` });
    }

    const roles = await query
      .orderBy('role.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return RoleMapper.toResponseList(roles, total, page, limit);
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
