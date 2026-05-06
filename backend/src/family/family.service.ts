import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/family/entities/family.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepo: Repository<Family>,
  ) {}

  async findAll(): Promise<Family[]> {
    return this.familyRepo.find({ order: { id: 'ASC' } });
  }
}
