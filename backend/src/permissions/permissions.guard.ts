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
    private readonly permissionService: PermissionsService, // ✅ inject đúng
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required?.length) return true;

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;

    const roles = (user?.roles ?? []).map((r) => r.toLowerCase());
    const rawPermissions: string[] = user?.permissions ?? [];

    const isAdmin = roles.includes('admin');
    const isBranchAdmin = roles.includes('branch admin');

    // ADMIN → bypass toàn bộ
    if (isAdmin) return true;

    // BRANCH ADMIN → chặn API global
    if (isBranchAdmin) {
      const scopes = await this.permissionService.getScopesByCodes(required);

      const hasGlobal = scopes.includes(PermissionScope.GLOBAL);

      if (hasGlobal) {
        throw new ForbiddenException('Không có quyền hệ thống');
      }
    }

    // mở rộng quyền của user (ví dụ: có 'user.create' → thêm quyền 'user.view')
    const expanded = this.permissionService.expand(rawPermissions);
    const permissionSet = new Set(expanded);

    const missing = required.filter((p) => !permissionSet.has(p));

    if (missing.length) {
      throw new ForbiddenException(`Thiếu quyền: ${missing.join(', ')}`);
    }

    return true;
  }
}
