import { Module } from '@nestjs/common';
import { PersonTitlesService } from './person-titles.service';
import { PersonTitlesController } from './person-titles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonTitle } from './entities/person-title.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonTitle])],
  controllers: [PersonTitlesController],
  providers: [PersonTitlesService],
  exports: [PersonTitlesService],
})
export class PersonTitlesModule {}
