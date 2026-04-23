import {
  IsString,
  IsOptional,
  MaxLength,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(100, { message: 'Tên role tối đa 100 ký tự' })
  role_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'permission_ids phải là mảng số nguyên' })
  permission_ids?: number[];
}
