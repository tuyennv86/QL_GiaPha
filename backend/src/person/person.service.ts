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

  async findAll() {
    return await this.personRepo.find();
  }

  async findGeneration() {
    const generations = await this.personRepo
      .createQueryBuilder('persons')
      .select('DISTINCT persons.generation', 'generation')
      .orderBy('persons.generation', 'ASC')
      .getRawMany();

    return generations.map((g: { generation: string }) => g.generation);
  }

  async findSearch(
    page: number,
    limit: number,
    gender: number,
    generation: number,
    is_alive: number,
    search?: string,
  ): Promise<PersonResponseList> {
    const query = this.personRepo.createQueryBuilder('persons');

    if (search) {
      query.andWhere(
        'unaccent(LOWER(persons.full_name)) LIKE unaccent(LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    if (gender >= 0) {
      query.andWhere('persons.gender = :gender', { gender });
    }

    if (generation > 0) {
      query.andWhere('persons.generation = :generation', { generation });
    }

    if (is_alive !== -1) {
      const isAliveBool = is_alive === 1 ? true : false;
      query.andWhere('persons.is_alive = :is_alive', { is_alive: isAliveBool });
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

  async remove(id: number): Promise<{ message: string }> {
    const person = await this.findOne(id);
    if (!person) {
      return { message: 'Không tìm thấy người này' };
    }
    await this.personRepo.remove(person);
    return { message: 'Xoá người thành công' };
  }
}
