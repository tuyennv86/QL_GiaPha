import { IsArray, IsInt } from 'class-validator';

export class AssignPermissionsDto {
  @IsArray()
  @IsInt({ each: true, message: 'permission_ids phải là mảng số nguyên' })
  permission_ids: number[];
}
