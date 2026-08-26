import { Injectable } from '@nestjs/common';
import { CreatePersonTitleDto } from './dto/create-person-title.dto';
import { UpdatePersonTitleDto } from './dto/update-person-title.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonTitle } from './entities/person-title.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonTitlesService {
  constructor(
    @InjectRepository(PersonTitle)
    private readonly personTitleRepo: Repository<PersonTitle>,
  ) {}

  async create(createPersonTitleDto: CreatePersonTitleDto) {
    const data = await this.personTitleRepo.save(createPersonTitleDto);
    return await this.findOne(data.id);
  }

  findAll() {
    return this.personTitleRepo.find({});
  }

  async findOne(id: number) {
    const query = this.personTitleRepo
      .createQueryBuilder('person_title')
      .leftJoinAndSelect('person_title.title', 'title')
      .where('person_title.id = :id', { id });
    const result = await query
      .select([
        'person_title.id',
        'person_title.title_id',
        'title.title_name',
        'person_title.branch_id',
        'person_title.start_date',
        'person_title.end_date',
        'person_title.is_active',
      ])
      .getOne();
    return result;
  }

  async update(id: number, updatePersonTitleDto: UpdatePersonTitleDto) {
    await this.personTitleRepo.update(id, updatePersonTitleDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.personTitleRepo.delete(id);
  }
}
