import { Injectable } from '@nestjs/common';
import { CreateMariageDto } from './dto/create-mariage.dto';
import { UpdateMariageDto } from './dto/update-mariage.dto';

@Injectable()
export class MariageService {
  create(createMariageDto: CreateMariageDto) {
    return 'This action adds a new mariage';
  }

  findAll() {
    return `This action returns all mariage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mariage`;
  }

  update(id: number, updateMariageDto: UpdateMariageDto) {
    return `This action updates a #${id} mariage`;
  }

  remove(id: number) {
    return `This action removes a #${id} mariage`;
  }
}
