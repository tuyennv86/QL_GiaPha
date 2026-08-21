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

  findAll() {
    return this.familybrannchesRepo.find();
  }

  findAllByFamilyId(familyId: number) {
    return this.familybrannchesRepo.find({ where: { family_id: familyId } });
  }

  findOne(id: number) {
    return this.familybrannchesRepo.findOne({ where: { id } });
  }

  async create(
    createFamilybrannchDto: CreateFamilybrannchDto,
  ): Promise<FamilyBranch> {
    const branch = this.familybrannchesRepo.create(createFamilybrannchDto);
    return await this.familybrannchesRepo.save(branch);
  }

  async update(
    id: number,
    updateFamilybrannchDto: UpdateFamilybrannchDto,
  ): Promise<FamilyBranch | null> {
    const branch = await this.familybrannchesRepo.findOne({ where: { id } });
    if (!branch) {
      return null;
    }
    Object.assign(branch, updateFamilybrannchDto);
    return await this.familybrannchesRepo.save(branch);
  }

  async remove(id: number): Promise<{ message: string }> {
    const familybrannch = await this.familybrannchesRepo.findOne({
      where: { id },
    });
    if (!familybrannch) {
      return { message: 'Không tìm thấy nhánh này' };
    }
    return this.familybrannchesRepo.remove(familybrannch).then(() => {
      return {
        message:
          'Xóa chi / nhánh :' + familybrannch.branch_name + ' thành công',
      };
    });
  }
}
