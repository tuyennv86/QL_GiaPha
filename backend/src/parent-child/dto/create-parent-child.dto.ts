import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class CreateParentChildDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  father_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  mother_id?: number;

  @Type(() => Number)
  @IsInt()
  child_id: number;

  @Type(() => Number)
  @IsInt()
  relationship_type: number;
}
