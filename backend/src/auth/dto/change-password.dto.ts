import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Mật khẩu cũ phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu cũ tối thiểu 6 ký tự' })
  old_password: string;

  @IsString({ message: 'Mật khẩu mới phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu mới tối thiểu 6 ký tự' })
  @MaxLength(100)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Mật khẩu mới phải chứa ít nhất 1 chữ cái và 1 chữ số',
  })
  new_password: string;

  @IsString()
  @MinLength(6, { message: 'Xác nhận mật khẩu tối thiểu 6 ký tự' })
  confirm_password: string;
}
