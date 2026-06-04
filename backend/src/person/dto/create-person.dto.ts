import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PersonType } from '../enum/person-type.enum';
import { Type } from 'class-transformer';
import { ToBoolean } from 'src/common/decorators/to-boolean.decorator';

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

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @Type(() => Date)
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

  @ToBoolean()
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

  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Ghi chú tối đa 1000 ký tự' })
  note?: string;

  @IsEnum(PersonType)
  person_type: PersonType;
}
