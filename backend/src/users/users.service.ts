/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserResponse,
  UserResponseList,
} from 'src/response/users/user.respones';
import { UserViewResponse } from 'src/response/users/user.view.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<UserResponseList> {
    const db = this.userRepo
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.user_roles', 'ur')
      .leftJoinAndSelect('ur.role', 'roles')
      .leftJoinAndSelect('users.family', 'family');

    if (search?.trim()) {
      const keyword = `%${search.trim()}%`;

      db.andWhere(
        new Brackets((qb) => {
          qb.where('users.username ILIKE :keyword', { keyword })
            .orWhere('users.full_name ILIKE :keyword', { keyword })
            .orWhere('users.email ILIKE :keyword', { keyword })
            .orWhere('users.phone ILIKE :keyword', { keyword });
        }),
      );
    }

    const total = await db.getCount();

    const users = await db
      .select([
        'users.id',
        'users.username',
        'users.full_name',
        'users.email',
        'users.phone',
        'users.family_id',
        'users.is_active',
        'users.created_at',
        'users.last_login',
        'ur.id',
        'roles.id',
        'roles.role_name',
        'family.id',
        'family.family_name',
      ])
      .orderBy('users.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const items: UserResponse[] = users.map((u) => ({
      id: u.id,
      username: u.username,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone,
      is_active: u.is_active,
      created_at: u.created_at,
      last_login: u.last_login,
      family: u.family
        ? {
            id: u.family.id,
            family_name: u.family.family_name,
          }
        : null,
      roles: u.user_roles.map((ur) => ur.role),
    }));

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.user_roles', 'ur')
      .where('users.id = :id', { id: id })
      .getOne();
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return user;
  }

  async findOneView(id: number): Promise<UserViewResponse> {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.user_roles', 'ur')
      .leftJoinAndSelect('ur.role', 'roles')
      .leftJoinAndSelect('users.family', 'family')
      .where('users.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    return {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      is_active: user.is_active,
      created_at: user.created_at,
      last_login: user.last_login,
      family: user.family
        ? { id: user.family.id, family_name: user.family.family_name }
        : null,
      roles: user.user_roles.map((ur) => ur.role),
    };
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'full_name',
        'email',
        'is_active',
        'family_id',
      ],
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async create(
    dto: CreateUserDto,
  ): Promise<Omit<UserViewResponse, 'password_hash'>> {
    const existing = await this.userRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) throw new ConflictException('Username đã tồn tại');

    if (dto.email) {
      const emailExists = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (emailExists) throw new ConflictException('Email đã được sử dụng');
    }
    if (dto.phone) {
      const phoneExists = await this.userRepo.findOne({
        where: { phone: dto.phone },
      });
      if (phoneExists)
        throw new ConflictException('Số điện thoại đã được sử dụng');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password_hash });
    const saved = await this.userRepo.save(user);

    if (dto.role_ids?.length) {
      const roles = dto.role_ids.map((role_id) =>
        this.userRoleRepo.create({ user_id: saved.id, role_id }),
      );
      await this.userRoleRepo.save(roles);
    }

    const { password_hash: _ph, ...result } = saved;
    // trả về thông tin user sau khi đã tạo, bao gồm cả family và roles
    return this.findOneView(result.id);
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    // check email
    if (dto.email) {
      const emailExists = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Email đã được sử dụng');
      }
    }

    // check phone
    if (dto.phone) {
      const phoneExists = await this.userRepo.findOne({
        where: { phone: dto.phone },
      });
      if (phoneExists && phoneExists.id !== id) {
        throw new ConflictException('Số điện thoại đã được sử dụng');
      }
    }
    // tách role_ids ra khỏi userData để xử lý riêng, tránh lỗi khi update user
    const { role_ids, ...userData } = dto;

    // update user info
    await this.userRepo.update(id, userData);

    // xử lý roles qua bảng trung gian
    if (role_ids) {
      await this.userRoleRepo.delete({ user_id: id });

      if (role_ids.length > 0) {
        const userRoles = role_ids.map((roleId) =>
          this.userRoleRepo.create({
            user_id: id,
            role_id: roleId,
          }),
        );

        await this.userRoleRepo.save(userRoles);
      }
    }

    return this.findOneView(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { message: 'Xoá người dùng thành công' };
  }

  async assignRoles(
    userId: number,
    roleIds: number[],
  ): Promise<{ message: string }> {
    await this.findOne(userId);
    await this.userRoleRepo.delete({ user_id: userId });

    if (roleIds.length) {
      const roles = roleIds.map((role_id) =>
        this.userRoleRepo.create({ user_id: userId, role_id }),
      );
      await this.userRoleRepo.save(roles);
    }

    return { message: 'Cập nhật roles thành công' };
  }

  async getUserRoles(userId: number) {
    await this.findOne(userId);
    return this.userRoleRepo.find({
      where: { user_id: userId },
      relations: ['role'],
    });
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userRepo.update(id, { last_login: new Date() });
  }
  async updateActive(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('Không tìm thấy user với id =' + id);
    }
    await this.userRepo.update(id, { is_active: !user.is_active });
  }
}
