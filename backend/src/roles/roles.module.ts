import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleMenu } from 'src/role-menus/entities/role-menu.entity';
import { UserRole } from 'src/users/entities/user-role.entity';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { UserBranchRole } from 'src/user-branch-role/entities/user-branch-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      RolePermission,
      RoleMenu,
      UserRole,
      UserBranchRole,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
