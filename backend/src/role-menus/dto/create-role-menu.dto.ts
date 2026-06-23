import { IsArray, IsInt } from 'class-validator';

export class CreateRoleMenuDto {
  @IsInt()
  role_id: number;

  @IsArray()
  @IsInt({ each: true })
  menu_ids: number[];
}
