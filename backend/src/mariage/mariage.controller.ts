import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MariageService } from './mariage.service';
import { CreateMariageDto } from './dto/create-mariage.dto';
import { UpdateMariageDto } from './dto/update-mariage.dto';

@Controller('mariage')
export class MariageController {
  constructor(private readonly mariageService: MariageService) {}

  @Post()
  create(@Body() createMariageDto: CreateMariageDto) {
    return this.mariageService.create(createMariageDto);
  }

  @Get()
  findAll() {
    return this.mariageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mariageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMariageDto: UpdateMariageDto) {
    return this.mariageService.update(+id, updateMariageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mariageService.remove(+id);
  }
}
