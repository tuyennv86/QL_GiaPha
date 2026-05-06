import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersionService } from './persion.service';
import { CreatePersionDto } from './dto/create-persion.dto';
import { UpdatePersionDto } from './dto/update-persion.dto';

@Controller('persion')
export class PersionController {
  constructor(private readonly persionService: PersionService) {}

  @Post()
  create(@Body() createPersionDto: CreatePersionDto) {
    return this.persionService.create(createPersionDto);
  }

  @Get()
  findAll() {
    return this.persionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.persionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersionDto: UpdatePersionDto) {
    return this.persionService.update(+id, updatePersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.persionService.remove(+id);
  }
}
