import { IsInt, IsOptional } from 'class-validator';

export class CreateParentChildDto {
  @IsInt()
  @IsOptional()
  father_id?: number;

  @IsInt()
  @IsOptional()
  mother_id?: number;

  @IsInt()
  child_id: number;

  @IsInt()
  relationship_type: number;
}
