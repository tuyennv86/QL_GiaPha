import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExportPersonDto } from './dto/export-person.dto';
import type { Response } from 'express';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll() {
    return this.personService.findAll();
  }
  @Get('search')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  search(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('gender') gender: string = '-1',
    @Query('generation') generation: string = '0',
    @Query('is_alive') is_alive: string = '-1',
    @Query('search') search?: string,
  ) {
    return this.personService.findSearch(
      Number(page),
      Number(limit),
      Number(gender),
      Number(generation),
      Number(is_alive),
      search,
    );
  }

  @Get('generation')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  findGeneration() {
    return this.personService.findGeneration();
  }

  @Get(':id')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personService.findOne(id);
  }

  @Post()
  @RequirePermissions('person.create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Post('export-excel')
  exportExcel(@Body() dto: ExportPersonDto, @Res() res: Response) {
    return this.personService.exportExcel(dto.listId, res);
  }

  @Post('export-all-excel')
  exportExcelAll(@Res() res: Response) {
    return this.personService.exportAllExcel(res);
  }

  @Patch(':id')
  @RequirePermissions('person.edit')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete('delete-multiple')
  @RequirePermissions('person.delete')
  @UseGuards(JwtAuthGuard)
  removeMultiple(@Body() dto: ExportPersonDto) {
    return this.personService.removeMultiple(dto.listId);
  }

  @Delete(':id')
  @RequirePermissions('person.delete')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personService.remove(id);
  }
}
