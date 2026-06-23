import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './require-permissions.decorator';
import { JwtPayload } from '../common/interfaces/request-with-user.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    // Không yêu cầu permission cụ thể → cho qua
    if (!required?.length) return true;

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const userPermissions: string[] = request.user?.permissions ?? [];

    const missing = required.filter((p) => !userPermissions.includes(p));
    if (missing.length) {
      throw new ForbiddenException(`Thiếu quyền: ${missing.join(', ')}`);
    }

    return true;
  }
}
