import { Role } from '../entities/role.entity';
import { RoleResponse, RoleResponseList } from '../response/role.response';

export class RoleMapper {
  static toResponse(this: void, entity: Role): RoleResponse {
    return {
      id: entity.id,
      role_name: entity.role_name,
      description: entity.description,
      permissions: (entity.role_permissions || []).map((rp) => ({
        id: rp.permission?.id,
        permission_code: rp.permission?.permission_code,
        permission_name: rp.permission?.permission_name,
      })),
    };
  }

  static toResponseList(
    this: void,
    entities: Role[],
    total: number,
    page: number,
    limit: number,
  ): RoleResponseList {
    return {
      items: entities.map(RoleMapper.toResponse),
      total,
      page,
      limit,
    };
  }
}
