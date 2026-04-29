import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';

@Global() // dùng cho toàn bộ app, không cần import lại trong module khác chỉ cần import PermissionsModule một lần ở AppModule
@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsGuard],
  exports: [PermissionsGuard, PermissionsService],
})
export class PermissionsModule {}
