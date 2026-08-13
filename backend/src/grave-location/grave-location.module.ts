import { Module } from '@nestjs/common';
import { GraveLocationService } from './grave-location.service';
import { GraveLocationController } from './grave-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraveLocation } from './entities/grave-location.entity';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([GraveLocation]), FileUploadModule],
  controllers: [GraveLocationController],
  providers: [GraveLocationService],
  exports: [GraveLocationService],
})
export class GraveLocationModule {}
