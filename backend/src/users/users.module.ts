import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Family } from 'src/family/entities/family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Family])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
