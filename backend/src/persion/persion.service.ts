import { Injectable } from '@nestjs/common';
import { CreatePersionDto } from './dto/create-persion.dto';
import { UpdatePersionDto } from './dto/update-persion.dto';

@Injectable()
export class PersionService {
  create(createPersionDto: CreatePersionDto) {
    return 'This action adds a new persion';
  }

  findAll() {
    return `This action returns all persion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persion`;
  }

  update(id: number, updatePersionDto: UpdatePersionDto) {
    return `This action updates a #${id} persion`;
  }

  remove(id: number) {
    return `This action removes a #${id} persion`;
  }
}
