import { IsString, MaxLength } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  @MaxLength(200, { message: 'Tên dòng họ tối đa 200 ký tự' })
  family_name: string;

  @IsString()
  @MaxLength(200, { message: 'Người sáng lập tối đa 200 ký tự' })
  ancestor_name: string;

  @IsString()
  @MaxLength(200, { message: 'Địa chỉ tối đa 300 ký tự' })
  origin_location: string;

  @IsString()
  description: string;
}
