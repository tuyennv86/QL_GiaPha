import { Permission } from '../entities/permission.entity';

export class PermissionListResponse {
  items: Permission[];
  total: number;
  page: number;
  limit: number;
}
