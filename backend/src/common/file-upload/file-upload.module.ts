import { FileUploadService } from './file-upload.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
