import { Module } from '@nestjs/common';
import { ParentChildService } from './parent-child.service';
import { ParentChildController } from './parent-child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentChild } from './entities/parent-child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentChild])],
  controllers: [ParentChildController],
  providers: [ParentChildService],
  exports: [ParentChildService],
})
export class ParentChildModule {}
