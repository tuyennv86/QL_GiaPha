import { IsArray, IsInt } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  @IsInt({ each: true, message: 'role_ids phải là mảng số nguyên' })
  role_ids: number[];
}
