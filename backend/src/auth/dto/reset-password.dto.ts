import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'Token không hợp lệ' })
  token: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu mới tối thiểu 6 ký tự' })
  @MaxLength(100, { message: 'Mật khẩu mới tối đa 100 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Mật khẩu mới phải chứa ít nhất 1 chữ cái và 1 chữ số',
  })
  new_password: string;

  @IsString()
  @MinLength(6, { message: 'Xác nhận mật khẩu tối thiểu 6 ký tự' })
  confirm_password: string;
}
