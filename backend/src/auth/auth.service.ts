import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { StringValue } from 'ms';

import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { UserBranchPermission } from '../entities/user-branch-permission.entity';
import { RefreshToken } from '../entities/refresh-token.entity';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,

    @InjectRepository(RolePermission)
    private readonly rolePermRepo: Repository<RolePermission>,

    @InjectRepository(UserBranchPermission)
    private readonly branchPermRepo: Repository<UserBranchPermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  // ─── Register ─────────────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
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

    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      username: dto.username,
      password_hash,
      full_name: dto.full_name,
      email: dto.email,
      phone: dto.phone,
      is_active: true,
    });

    const saved = await this.userRepo.save(user);

    return {
      id: saved.id,
      username: saved.username,
      full_name: saved.full_name,
      email: saved.email,
      created_at: saved.created_at,
    };
  }

  // ─── Login ────────────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: dto.username },
      select: [
        'id',
        'username',
        'password_hash',
        'full_name',
        'email',
        'family_id',
        'is_active',
      ],
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    await this.userRepo.update(user.id, { last_login: new Date() });

    const { roleNames, permissionCodes } = await this.getRolesAndPermissions(
      user.id,
    );
    const branchPermissions = await this.getBranchPermissions(user.id);
    const tokens = await this.generateTokens(
      user.id,
      user.username,
      roleNames,
      permissionCodes,
    );

    return {
      ...tokens,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        family_id: user.family_id,
        roles: roleNames,
        permissions: permissionCodes,
        branch_permissions: branchPermissions,
      },
    };
  }

  // ─── Logout (Stateless + revoke refresh tokens) ───────────────────────────
  async logout(userId: number) {
    await this.refreshTokenRepo.update(
      { user_id: userId, is_revoked: false },
      { is_revoked: true },
    );
    return { message: 'Đăng xuất thành công' };
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────
  async refreshToken(userId: number, rawRefreshToken: string) {
    const tokenHash = this.hashToken(rawRefreshToken);

    const stored = await this.refreshTokenRepo.findOne({
      where: { user_id: userId, token_hash: tokenHash, is_revoked: false },
    });

    if (!stored || stored.expires_at < new Date()) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    // Rotate: thu hồi token cũ
    await this.refreshTokenRepo.update(stored.id, { is_revoked: true });

    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'username', 'is_active'],
    });
    if (!user?.is_active)
      throw new UnauthorizedException('Tài khoản đã bị vô hiệu hóa');

    const { roleNames, permissionCodes } =
      await this.getRolesAndPermissions(userId);
    return this.generateTokens(
      userId,
      user.username,
      roleNames,
      permissionCodes,
    );
  }

  // ─── Get Profile ──────────────────────────────────────────────────────────
  async getProfile(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: [
        'id',
        'username',
        'full_name',
        'email',
        'phone',
        'is_active',
        'family_id',
        'created_at',
        'last_login',
      ],
    });
    if (!user) throw new UnauthorizedException();

    const { roleNames, permissionCodes } =
      await this.getRolesAndPermissions(userId);
    const branchPermissions = await this.getBranchPermissions(userId);

    return {
      ...user,
      roles: roleNames,
      permissions: permissionCodes,
      branch_permissions: branchPermissions,
    };
  }

  // ─── Change Password ──────────────────────────────────────────────────────
  async changePassword(userId: number, dto: ChangePasswordDto) {
    if (dto.new_password !== dto.confirm_password) {
      throw new BadRequestException('Xác nhận mật khẩu mới không khớp');
    }

    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'password_hash'],
    });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const isMatch = await bcrypt.compare(dto.old_password, user.password_hash);
    if (!isMatch) throw new BadRequestException('Mật khẩu cũ không đúng');

    const password_hash = await bcrypt.hash(dto.new_password, 10);
    await this.userRepo.update(userId, { password_hash });

    // Thu hồi tất cả refresh token sau khi đổi mật khẩu
    await this.refreshTokenRepo.update(
      { user_id: userId, is_revoked: false },
      { is_revoked: true },
    );

    return { message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' };
  }

  // ─── Forgot Password ──────────────────────────────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const genericMessage =
      'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi';

    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) return { message: genericMessage };

    // Xoá token reset cũ chưa dùng
    await this.refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .where(
        'user_id = :userId AND token_hash LIKE :prefix AND is_revoked = false',
        {
          userId: user.id,
          prefix: 'reset:%',
        },
      )
      .execute();

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = `reset:${this.hashToken(resetToken)}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        is_revoked: false,
      }),
    );

    // TODO: Gửi email chứa resetToken
    // await this.mailService.sendResetPasswordEmail(user.email, resetToken);
    if (this.configService.get('app.nodeEnv') === 'development') {
      console.log(`[DEV] Reset token cho ${user.email}: ${resetToken}`);
    }

    return { message: genericMessage };
  }

  // ─── Reset Password ───────────────────────────────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    if (dto.new_password !== dto.confirm_password) {
      throw new BadRequestException('Xác nhận mật khẩu không khớp');
    }

    const tokenHash = `reset:${this.hashToken(dto.token)}`;

    const stored = await this.refreshTokenRepo.findOne({
      where: { token_hash: tokenHash, is_revoked: false },
    });

    if (!stored || stored.expires_at < new Date()) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');
    }

    const password_hash = await bcrypt.hash(dto.new_password, 10);
    await this.userRepo.update(stored.user_id, { password_hash });
    await this.refreshTokenRepo.update(stored.id, { is_revoked: true });

    return { message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.' };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  async getRolesAndPermissions(userId: number) {
    const userRoles = await this.userRoleRepo.find({
      where: { user_id: userId },
      relations: ['role'],
    });

    const roleIds = userRoles.map((ur) => ur.role_id);
    const roleNames = userRoles.map((ur) => ur.role.role_name);

    if (!roleIds.length) return { roleNames: [], permissionCodes: [] };

    const rolePerms = await this.rolePermRepo.find({
      where: roleIds.map((id) => ({ role_id: id })),
      relations: ['permission'],
    });

    const permissionCodes = [
      ...new Set(rolePerms.map((rp) => rp.permission.permission_code)),
    ];

    return { roleNames, permissionCodes };
  }

  async getBranchPermissions(userId: number) {
    const records = await this.branchPermRepo.find({
      where: { user_id: userId },
      relations: ['role'],
    });
    return records.map((r) => ({
      branch_id: r.branch_id,
      role_name: r.role.role_name,
    }));
  }

  private async generateTokens(
    userId: number,
    username: string,
    roles: string[],
    permissions: string[],
  ) {
    const payload = { sub: userId, username, roles, permissions };

    const secret = this.configService.getOrThrow<string>('jwt.secret');
    const expiresIn = this.configService.getOrThrow<string>(
      'jwt.expiresIn',
    ) as StringValue;

    const access_token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    // ===== Refresh token =====
    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(rawRefreshToken);

    const refreshExpiresIn =
      this.configService.get<string>('jwt.refreshExpiresIn') ?? '7d';

    const days = parseInt(refreshExpiresIn.replace('d', ''), 10) || 7;

    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        user_id: userId,
        token_hash: tokenHash,
        expires_at: expiresAt,
        is_revoked: false,
      }),
    );

    return {
      access_token,
      refresh_token: rawRefreshToken,
    };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
