import { Injectable } from '@nestjs/common';
import { CreateFamilybrannchDto } from './dto/create-familybrannch.dto';
import { UpdateFamilybrannchDto } from './dto/update-familybrannch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyBranch } from './entities/family-branch.entity';

@Injectable()
export class FamilybrannchesService {
  constructor(
    @InjectRepository(FamilyBranch)
    private readonly familybrannchesRepo: Repository<FamilyBranch>,
  ) {}
  create(createFamilybrannchDto: CreateFamilybrannchDto) {
    return this.familybrannchesRepo.save(createFamilybrannchDto);
  }

  findAll() {
    return this.familybrannchesRepo.find();
  }

  findAllByFamilyId(familyId: number) {
    return this.familybrannchesRepo.find({ where: { family_id: familyId } });
  }

  findOne(id: number) {
    return this.familybrannchesRepo.findOne({ where: { id } });
  }

  update(id: number, updateFamilybrannchDto: UpdateFamilybrannchDto) {
    return this.familybrannchesRepo.update(id, updateFamilybrannchDto);
  }

  remove(id: number) {
    return this.familybrannchesRepo.delete(id);
  }
}
