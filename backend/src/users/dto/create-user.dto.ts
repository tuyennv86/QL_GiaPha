import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Username tối thiểu 3 ký tự' })
  @MaxLength(100, { message: 'Username tối đa 100 ký tự' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username chỉ được chứa chữ, số và dấu gạch dưới',
  })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
  @MaxLength(100)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Password phải chứa ít nhất 1 chữ cái và 1 chữ số',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  full_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(200)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[0-9+\-\s()]+$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;

  @IsOptional()
  @IsInt()
  family_id?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  role_ids?: number[];
}
