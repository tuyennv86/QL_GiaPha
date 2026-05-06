import { Module } from '@nestjs/common';
import { MariageService } from './mariage.service';
import { MariageController } from './mariage.controller';

@Module({
  controllers: [MariageController],
  providers: [MariageService],
})
export class MariageModule {}
