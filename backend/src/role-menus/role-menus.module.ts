import { Module } from '@nestjs/common';
import { RoleMenusService } from './role-menus.service';
import { RoleMenusController } from './role-menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleMenu])],
  controllers: [RoleMenusController],
  providers: [RoleMenusService],
  exports: [RoleMenusService],
})
export class RoleMenusModule {}
