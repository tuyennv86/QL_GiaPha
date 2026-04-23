// login.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Username phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Username tối thiểu 3 ký tự' })
  @MaxLength(100, { message: 'Username tối đa 100 ký tự' })
  username: string;

  @IsString({ message: 'Password phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
  @MaxLength(100, { message: 'Password tối đa 100 ký tự' })
  password: string;
}
