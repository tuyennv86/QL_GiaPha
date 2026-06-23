import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { RoleMenu } from 'src/role-menus/entities/role-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, RoleMenu])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
