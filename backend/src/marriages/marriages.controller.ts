import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MarriagesService } from './marriages.service';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { PersonType } from 'src/person/enum/person-type.enum';

@Controller('marriages')
export class MarriagesController {
  constructor(private readonly marriagesService: MarriagesService) {}

  @Post()
  create(@Body() createMarriageDto: CreateMarriageDto) {
    return this.marriagesService.create(createMarriageDto);
  }

  @Get()
  findAll() {
    return this.marriagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marriagesService.findOne(+id);
  }

  @Get('person/:personId')
  findByPerson1Id(
    @Param('personId') personId: string,
    @Query('personType') personType: PersonType,
  ) {
    return this.marriagesService.findByPersonId(+personId, personType);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarriageDto: UpdateMarriageDto,
  ) {
    return this.marriagesService.update(+id, updateMarriageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marriagesService.remove(+id);
  }
}
