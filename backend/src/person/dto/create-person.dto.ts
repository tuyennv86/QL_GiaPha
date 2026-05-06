import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsInt()
  family_id: number;

  @IsInt()
  @IsOptional()
  branch_id?: number;

  @IsString()
  @MaxLength(200, { message: 'Full name tối đa 200 ký tự' })
  full_name: string;

  @IsInt()
  gender: number;

  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @IsDate()
  @IsOptional()
  death_date?: Date;

  @IsString()
  biography: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Avatar tối đa 500 ký tự' })
  avatar?: string;

  @IsInt()
  @IsOptional()
  generation?: number;

  @IsBoolean()
  @IsOptional()
  is_alive?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(256, { message: 'Job tối đa 256 ký tự' })
  job?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Place of birth tối đa 500 ký tự' })
  place_of_birth?: string;
}
