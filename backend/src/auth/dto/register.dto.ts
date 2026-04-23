import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username tối thiểu 3 ký tự' })
  @MaxLength(100, { message: 'Username tối đa 100 ký tự' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username chỉ được chứa chữ, số và dấu gạch dưới',
  })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
  @MaxLength(100, { message: 'Password tối đa 100 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Password phải chứa ít nhất 1 chữ cái và 1 chữ số',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Họ tên tối đã 200 ký tự' })
  full_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(200, { message: 'Email tối đa 200 ký tự' })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Số điện thoại tối đa 50 ký tự' })
  @Matches(/^[0-9+\-\s()]+$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;
}
