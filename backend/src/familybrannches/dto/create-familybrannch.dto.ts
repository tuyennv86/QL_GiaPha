import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateFamilybrannchDto {
  @IsInt()
  family_id: number;

  @IsString()
  @MaxLength(200, { message: 'Full name tối đa 200 ký tự' })
  branch_name: string;

  @IsInt()
  branch_order: number;

  @IsString()
  description: string;
}
