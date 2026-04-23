import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  // không lấy trường username và password khi update user
  OmitType(CreateUserDto, ['username', 'password'] as const),
) {}
