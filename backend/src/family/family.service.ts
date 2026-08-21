import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/family/entities/family.entity';
import { Repository } from 'typeorm';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepo: Repository<Family>,
  ) {}

  async findAll(family_id?: number | null): Promise<Family[]> {
    return this.familyRepo.find({
      where: family_id != null ? { id: family_id } : {},
      order: { id: 'ASC' },
    });
  }

  async searchFamilies(searchTerm?: string | null, family_id?: number | null) {
    const query = this.familyRepo
      .createQueryBuilder('family')
      .leftJoinAndSelect('family.branches', 'branch')
      .orderBy('family.id', 'ASC');

    if (family_id) {
      query.andWhere('family.id = :family_id', { family_id });
    }

    if (searchTerm) {
      query.andWhere(
        'unaccent(LOWER(family.family_name)) LIKE unaccent(LOWER(:searchTerm))',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    return query.getMany();
  }

  async findOneFamily(family_id: number): Promise<Family | null> {
    return this.familyRepo.findOne({ where: { id: family_id } });
  }

  async deleteFamily(family_id: number): Promise<{ message: string }> {
    const family = await this.familyRepo.findOne({ where: { id: family_id } });
    if (!family) {
      return { message: 'Không tìm thấy dòng họ này' };
    }
    await this.familyRepo.remove(family);
    return { message: 'Xóa dòng họ ' + family.family_name + ' thành công' };
  }

  async createFamily(createFamily: CreateFamilyDto): Promise<Family> {
    const newFamily = this.familyRepo.create(createFamily);
    return this.familyRepo.save(newFamily);
  }

  async updateFamily(
    id: number,
    updateFamily: CreateFamilyDto,
  ): Promise<Family | null> {
    const family = await this.familyRepo.findOne({ where: { id } });
    if (!family) {
      return null;
    }
    Object.assign(family, updateFamily);
    return this.familyRepo.save(family);
  }
}
