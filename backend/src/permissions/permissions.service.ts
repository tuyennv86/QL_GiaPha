import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permRepo.find({ order: { permission_code: 'ASC' } });
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
}
