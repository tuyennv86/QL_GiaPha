import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMarriageDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'person1_id không được để trống' })
  @IsInt({ message: 'person1_id phải là số nguyên' })
  person1_id: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'person2_id không được để trống' })
  @IsInt({ message: 'person2_id phải là số nguyên' })
  person2_id: number;

  @Type(() => Date)
  @IsNotEmpty({ message: 'marriage_date không được để trống' })
  @IsDate()
  marriage_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  divorce_date?: Date;

  @Type(() => Number)
  @IsInt()
  marriage_status?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  marriage_order?: number;

  @IsString()
  @MaxLength(500, { message: 'Ghi chú tối đa 500 ký tự' })
  @IsOptional()
  note?: string;
}
