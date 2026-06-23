import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  MaxLength,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @MaxLength(200)
  menu_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  route?: string;

  @IsOptional()
  @IsInt()
  parent_id?: number;

  @IsOptional()
  @IsInt()
  sort_order?: number;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  icon: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  module_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  component_path: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  menu_type: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'permission_ids phải là mảng số nguyên' })
  role_ids?: number[];
}
