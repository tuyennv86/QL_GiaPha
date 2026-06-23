import { IsArray, IsInt } from 'class-validator';

export class CreateRolePermissionDto {
  @IsInt()
  role_id: number;

  @IsArray()
  @IsInt({ each: true })
  permission_ids: number[];
}
