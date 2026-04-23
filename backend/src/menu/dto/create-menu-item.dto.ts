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

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'permission_ids phải là mảng số nguyên' })
  permission_ids?: number[];
}
