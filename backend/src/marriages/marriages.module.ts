import { Module } from '@nestjs/common';
import { MarriagesService } from './marriages.service';
import { MarriagesController } from './marriages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marriages } from './entities/marriages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marriages])],
  controllers: [MarriagesController],
  providers: [MarriagesService],
  exports: [MarriagesService],
})
export class MarriagesModule {}
