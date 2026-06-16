import { IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { PermissionScope } from '../require-permissions.decorator';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(100)
  permission_code: string;

  @IsString()
  @MaxLength(200)
  permission_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(PermissionScope)
  scope?: PermissionScope;
}
