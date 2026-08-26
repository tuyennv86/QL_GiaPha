import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonTitlesService } from './person-titles.service';
import { CreatePersonTitleDto } from './dto/create-person-title.dto';
import { UpdatePersonTitleDto } from './dto/update-person-title.dto';

@Controller('person-titles')
export class PersonTitlesController {
  constructor(private readonly personTitlesService: PersonTitlesService) {}

  @Post()
  create(@Body() createPersonTitleDto: CreatePersonTitleDto) {
    return this.personTitlesService.create(createPersonTitleDto);
  }

  @Get()
  findAll() {
    return this.personTitlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personTitlesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonTitleDto: UpdatePersonTitleDto,
  ) {
    return this.personTitlesService.update(+id, updatePersonTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personTitlesService.remove(+id);
  }
}
