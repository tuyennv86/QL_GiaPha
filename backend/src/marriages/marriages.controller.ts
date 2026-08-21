import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MarriagesService } from './marriages.service';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { PersonType } from 'src/person/enum/person-type.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/common/interfaces/request-with-user.interface';

@Controller('marriages')
@UseGuards(JwtAuthGuard, PermissionsGuard)
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
    @CurrentUser() user: JwtPayload,
    @Param('personId') personId: string,
    @Query('personType') personType: PersonType,
  ) {
    return this.marriagesService.findByPersonId(
      +personId,
      personType,
      user.family_id,
    );
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
