import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export enum PermissionScope {
  GLOBAL = 'global',
  BRANCH = 'branch',
}

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
