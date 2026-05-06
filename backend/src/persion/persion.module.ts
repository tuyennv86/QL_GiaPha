import { Module } from '@nestjs/common';
import { PersionService } from './persion.service';
import { PersionController } from './persion.controller';

@Module({
  controllers: [PersionController],
  providers: [PersionService],
})
export class PersionModule {}
