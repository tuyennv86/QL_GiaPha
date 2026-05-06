import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './require-permissions.decorator';
import { JwtPayload } from '../common/interfaces/request-with-user.interface';
import { PermissionsService } from './permissions.service';
import { PermissionScope } from 'src/permissions/require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Không yêu cầu permission cụ thể → cho qua
    if (!required?.length) return true;

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;

    if (!user) throw new ForbiddenException('Không xác thực được người dùng');

    const roles = (user.roles ?? []).map((r) => r.toLowerCase());
    const rawPermissions: string[] = user.permissions ?? [];

    const isAdmin = roles.includes('admin');
    const isBranchAdmin = roles.includes('branch admin');

    // ── ADMIN: bypass toàn bộ ────────────────────────────────────────────────
    if (isAdmin) return true;

    // ── BRANCH ADMIN ─────────────────────────────────────────────────────────
    if (isBranchAdmin) {
      // Lấy scope của các permission được yêu cầu
      const scopes = await this.permissionService.getScopesByCodes(required);

      // Nếu bất kỳ permission nào là GLOBAL → Branch Admin không được phép
      const hasGlobal = scopes.some(
        (s) => s === (PermissionScope.GLOBAL as string),
      );
      if (hasGlobal) {
        throw new ForbiddenException(
          'Branch Admin không có quyền thực hiện thao tác hệ thống',
        );
      }

      // Với BRANCH scope → Branch Admin được phép không cần check permission cụ thể
      // (Branch Admin mặc định có toàn quyền trong branch của mình)
      return true;
    }

    // ── USER THƯỜNG: check permission cụ thể ─────────────────────────────────
    // Mở rộng quyền: có create/edit/delete → tự động có view
    const expanded = this.permissionService.expand(rawPermissions);
    const permissionSet = new Set(expanded);

    const missing = required.filter((p) => !permissionSet.has(p));

    if (missing.length) {
      throw new ForbiddenException(`Thiếu quyền: ${missing.join(', ')}`);
    }

    return true;
  }
}
