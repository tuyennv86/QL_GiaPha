import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'Refresh token không hợp lệ' })
  refresh_token: string;
}
