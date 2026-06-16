import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';
import { RolePermission } from 'src/roles/entities/role-permission.entity';
import { MenuPermission } from 'src/menu/entities/menu-permission.entity';

@Global() // dùng cho toàn bộ app, không cần import lại trong module khác chỉ cần import PermissionsModule một lần ở AppModule
@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, RolePermission, MenuPermission]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsGuard],
  exports: [PermissionsGuard, PermissionsService],
})
export class PermissionsModule {}
