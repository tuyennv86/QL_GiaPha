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
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { PermissionListResponse } from './response/permission.list.response';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly rolePermRepo: Repository<RolePermission>,
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

  async findSearchPageding(
    search: string,
    page: number,
    limit: number,
  ): Promise<PermissionListResponse> {
    const db = this.permRepo
      .createQueryBuilder('perm')
      .where('LOWER( perm.permission_code) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .orWhere('LOWER(perm.permission_name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });

    const total = await db.getCount();

    const items = await db
      .orderBy('perm.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { items, total, page, limit };
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

    await this.permRepo.remove(perm);
    return { message: 'Xoá permission thành công' };
  }

  async deleteMultiple(ids: number[]): Promise<{ message: string }> {
    try {
      // xóa permission khỏi tất cả role trước khi xóa permission
      await this.rolePermRepo.delete({ permission_id: In(ids) });

      await this.permRepo.delete({ id: In(ids) });
      return { message: 'Xoá permissions thành công' };
    } catch (error) {
      throw new NotFoundException('Lỗi :' + error);
    }
  }
}
