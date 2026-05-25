import { Injectable } from '@nestjs/common';
import { CreateParentChildDto } from './dto/create-parent-child.dto';
import { UpdateParentChildDto } from './dto/update-parent-child.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentChild } from './entities/parent-child.entity';
import { Repository } from 'typeorm';
import { ParentChildResponse } from './response/parent-child.response';

@Injectable()
export class ParentChildService {
  constructor(
    @InjectRepository(ParentChild)
    private parentChildRepository: Repository<ParentChild>,
  ) {}
  create(createParentChildDto: CreateParentChildDto) {
    return this.parentChildRepository.save(createParentChildDto);
  }

  async findAll(): Promise<ParentChildResponse[]> {
    const pc = await this.parentChildRepository
      .createQueryBuilder('parent_child')
      .leftJoinAndSelect('parent_child.father', 'father')
      .leftJoinAndSelect('parent_child.mother', 'mother')
      .leftJoinAndSelect('parent_child.child', 'child')
      .select([
        'parent_child.id',
        'parent_child.father_id',
        'parent_child.mother_id',
        'parent_child.child_id',
        'parent_child.relationship_type',
        'father.id',
        'father.full_name',
        'mother.id',
        'mother.full_name',
        'child.id',
        'child.full_name',
      ])
      .getMany();
    if (!pc) {
      return [];
    }
    return pc.map((pc) => ({
      id: pc.id,
      father_id: pc.father_id,
      mother_id: pc.mother_id,
      child_id: pc.child_id,
      relationship_type: pc.relationship_type,
      father_name: pc.father?.full_name,
      mother_name: pc.mother?.full_name,
      child_name: pc.child?.full_name ?? '',
    }));
  }

  async findByChildId(childId: number): Promise<ParentChildResponse | null> {
    const pc = await this.parentChildRepository
      .createQueryBuilder('parent_child')
      .leftJoinAndSelect('parent_child.father', 'father')
      .leftJoinAndSelect('parent_child.mother', 'mother')
      .leftJoinAndSelect('parent_child.child', 'child')
      .select([
        'parent_child.id',
        'parent_child.father_id',
        'parent_child.mother_id',
        'parent_child.child_id',
        'parent_child.relationship_type',
        'father.id',
        'father.full_name',
        'mother.id',
        'mother.full_name',
        'child.id',
        'child.full_name',
      ])
      .where('parent_child.child_id = :childId', { childId })
      .getOne();
    if (!pc) {
      return null;
    }
    return {
      id: pc.id,
      father_id: pc.father_id,
      mother_id: pc.mother_id,
      child_id: pc.child_id,
      relationship_type: pc.relationship_type,
      father_name: pc.father?.full_name,
      mother_name: pc.mother?.full_name,
      child_name: pc.child?.full_name ?? '',
    };
  }

  async findOne(id: number): Promise<ParentChildResponse | null> {
    const pc = await this.parentChildRepository
      .createQueryBuilder('parent_child')
      .leftJoinAndSelect('parent_child.father', 'father')
      .leftJoinAndSelect('parent_child.mother', 'mother')
      .leftJoinAndSelect('parent_child.child', 'child')
      .select([
        'parent_child.id',
        'parent_child.father_id',
        'parent_child.mother_id',
        'parent_child.child_id',
        'parent_child.relationship_type',
        'father.id',
        'father.full_name',

        'mother.id',
        'mother.full_name',

        'child.id',
        'child.full_name',
      ])
      .where('parent_child.id = :id', { id })
      .getOne();

    if (!pc) {
      return null;
    }

    return {
      id: pc.id,
      father_id: pc.father_id,
      mother_id: pc.mother_id,
      child_id: pc.child_id,
      relationship_type: pc.relationship_type,
      father_name: pc.father?.full_name,
      mother_name: pc.mother?.full_name,
      child_name: pc.child?.full_name ?? '',
    };
  }

  update(id: number, updateParentChildDto: UpdateParentChildDto) {
    return this.parentChildRepository.update(id, updateParentChildDto);
  }

  remove(id: number) {
    return this.parentChildRepository.delete(id);
  }
}
