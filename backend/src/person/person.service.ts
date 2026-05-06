import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PersonResponseList } from './response/person.response';
import { PersonMapper } from './mapper/person.mapper';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
  ) {}

  findAll() {
    return this.personRepo.find();
  }

  async findSearch(
    page: number,
    limit: number,
    gender: number,
    generation: number,
    search?: string,
    is_alive?: boolean,
  ): Promise<PersonResponseList> {
    const query = this.personRepo.createQueryBuilder('persons');

    if (search) {
      query.andWhere('LOWER(persons.full_name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (gender >= 0) {
      query.andWhere('persons.gender = :gender', { gender });
    }

    if (generation >= 0) {
      query.andWhere('persons.generation = :generation', { generation });
    }

    if (is_alive !== undefined) {
      query.andWhere('persons.is_alive = :is_alive', { is_alive });
    }

    const [entities, total] = await query
      .orderBy('persons.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = entities.map((p) => PersonMapper.toResponse(p));

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return await this.personRepo.findOne({ where: { id } });
  }
  async create(createPersonDto: CreatePersonDto) {
    return await this.personRepo.save(createPersonDto);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.personRepo.update(id, updatePersonDto);
  }

  async remove(id: number) {
    return await this.personRepo.delete(id);
  }
}
