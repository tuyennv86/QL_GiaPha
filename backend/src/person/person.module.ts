import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Family } from 'src/family/entities/family.entity';
import { FamilyBranch } from 'src/familybrannches/entities/family-branch.entity';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Family, FamilyBranch]),
    FileUploadModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
