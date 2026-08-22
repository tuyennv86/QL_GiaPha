import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTitleDto {
  @IsString()
  @MaxLength(200, { message: 'Tên chức vụ tối đa 200 ký tự' })
  title_name: string;

  @IsNumber()
  scope_level: number;

  @IsString()
  @MaxLength(500, { message: 'Mô tả tối đa 500 ký tự' })
  description: string;
}
