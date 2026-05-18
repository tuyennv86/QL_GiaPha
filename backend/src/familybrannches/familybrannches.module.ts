import { Module } from '@nestjs/common';
import { FamilybrannchesService } from './familybrannches.service';
import { FamilybrannchesController } from './familybrannches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyBranch } from './entities/family-branch.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FamilyBranch])],
  controllers: [FamilybrannchesController],
  providers: [FamilybrannchesService],
  exports: [FamilybrannchesService],
})
export class FamilybrannchesModule {}
