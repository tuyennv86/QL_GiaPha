import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RolePermission } from 'src/roles/entities/role-permission.entity';
import { MenuPermission } from 'src/menu/entities/menu-permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly rolePermRepo: Repository<RolePermission>,
    @InjectRepository(MenuPermission)
    private readonly menuPermRepo: Repository<MenuPermission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permRepo.find({ order: { id: 'ASC' } });
  }

  async findBySearch(search: string): Promise<Permission[]> {
    return await this.permRepo
      .createQueryBuilder('perm')
      .where('LOWER( perm.permission_code) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .orWhere('LOWER(perm.permission_name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .orderBy('perm.id', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Permission> {
    const perm = await this.permRepo.findOne({ where: { id } });
    if (!perm) throw new NotFoundException('Không tìm thấy permission');
    return perm;
  }

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const existing = await this.permRepo.findOne({
      where: { permission_code: dto.permission_code },
    });
    if (existing) throw new ConflictException('Permission code đã tồn tại');
    return this.permRepo.save(dto);
  }
  //update permission nếu có thay đổi permission_code thì phải kiểm tra trùng với permission khác chưa, nếu trùng thì throw lỗi
  // trả về Permission sau khi update
  async update(id: number, dto: UpdatePermissionDto): Promise<Permission> {
    const perm = await this.findOne(id);
    if (!perm) {
      throw new NotFoundException('Không tìm thấy permission');
    }
    if (dto.permission_code && dto.permission_code !== perm.permission_code) {
      const existing = await this.permRepo.findOne({
        where: { permission_code: dto.permission_code },
      });
      if (existing) {
        throw new ConflictException('Permission code đã tồn tại');
      }
    }
    Object.assign(perm, dto);
    return this.permRepo.save(perm);
  }

  async remove(id: number): Promise<{ message: string }> {
    const perm = await this.findOne(id);
    if (!perm) {
      throw new NotFoundException('Không tìm thấy permission');
    }
    // xóa permission khỏi tất cả role trước khi xóa permission
    await this.rolePermRepo.delete({ permission_id: id });
    //xóa permission khỏi tất cả menu trước khi xóa permission
    await this.menuPermRepo.delete({ permission_id: id });
    await this.permRepo.remove(perm);
    return { message: 'Xoá permission thành công' };
  }

  async deleteMultiple(ids: number[]): Promise<{ message: string }> {
    try {
      // xóa permission khỏi tất cả role trước khi xóa permission
      await this.rolePermRepo.delete({ permission_id: In(ids) });
      //xóa permission khỏi tất cả menu trước khi xóa permission
      await this.menuPermRepo.delete({ permission_id: In(ids) });
      await this.permRepo.delete({ id: In(ids) });
      return { message: 'Xoá permissions thành công' };
    } catch (error) {
      throw new NotFoundException('Lỗi :' + error);
    }
  }

  // mở rộng quyền: nếu có create/edit/delete thì tự động thêm view
  expand(perms: string[]): string[] {
    const result = new Set(perms);

    for (const perm of perms) {
      const parts = perm.split('.');
      if (parts.length !== 2) continue;

      const [resource, action] = parts;

      if (['create', 'edit', 'delete'].includes(action)) {
        result.add(`${resource}.view`);
      }
    }

    return Array.from(result);
  }

  async getScopesByCodes(codes: string[]): Promise<string[]> {
    if (!codes?.length) return [];

    const perms = await this.permRepo.find({
      where: { permission_code: In(codes) },
      select: ['scope'],
    });

    return perms.map((p) => p.scope);
  }
}
