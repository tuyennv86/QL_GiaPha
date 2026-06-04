import { Injectable } from '@nestjs/common';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Marriages } from './entities/marriages.entity';

@Injectable()
export class MarriagesService {
  constructor(
    @InjectRepository(Marriages)
    private marriageRepository: Repository<Marriages>,
  ) {}
  create(createMarriageDto: CreateMarriageDto) {
    return this.marriageRepository.save(createMarriageDto);
  }

  findAll() {
    return this.marriageRepository.find();
  }

  findOne(id: number) {
    return this.marriageRepository.findOneBy({ id });
  }

  findByPerson1Id(personId: number) {
    return this.marriageRepository.findBy({ person1_id: personId });
  }

  update(id: number, updateMarriageDto: UpdateMarriageDto) {
    return this.marriageRepository.update(id, updateMarriageDto);
  }

  remove(id: number) {
    return this.marriageRepository.delete(id);
  }
}
