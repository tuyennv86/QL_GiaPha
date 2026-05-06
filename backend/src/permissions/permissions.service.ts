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

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permRepo.find({ order: { id: 'ASC' } });
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
    return this.permRepo.save(this.permRepo.create(dto));
  }

  async update(id: number, dto: UpdatePermissionDto): Promise<Permission> {
    await this.findOne(id);
    await this.permRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const perm = await this.findOne(id);
    await this.permRepo.remove(perm);
    return { message: 'Xoá permission thành công' };
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
