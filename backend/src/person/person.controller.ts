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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExportPersonDto } from './dto/export-person.dto';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonType } from './enum/person-type.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/common/interfaces/request-with-user.interface';

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
    @CurrentUser() user: JwtPayload,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('gender') gender: string = '-1',
    @Query('generation') generation: string = '0',
    @Query('is_alive') is_alive: string = '-1',
    @Query('person_type') person_type?: PersonType,
    @Query('familyId') familyId: string = '0',
    @Query('search') search?: string,
  ) {
    const family_id = user.family_id;

    return this.personService.findSearch(
      Number(page),
      Number(limit),
      Number(gender),
      Number(generation),
      Number(is_alive),
      person_type,
      search,
      Number(familyId),
      family_id,
    );
  }

  @Get('generation')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  findGeneration(@CurrentUser() user: JwtPayload) {
    return this.personService.findGeneration(user.family_id);
  }

  @Get('gender/:gender/generation/:generation')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  findGender(
    @CurrentUser() user: JwtPayload,
    @Param('gender', ParseIntPipe) gender: number,
    @Param('generation', ParseIntPipe) generation: number,
  ) {
    return this.personService.findByGender(gender, generation, user.family_id);
  }

  @Get('marriage/:id')
  @RequirePermissions('person.view')
  @UseGuards(JwtAuthGuard)
  findMarriage(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.personService.findByMarriage(id, user.family_id);
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
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    // console.log('Creating person with data:', createPersonDto);
    // console.log('Received avatar file:', avatar);
    return this.personService.create(createPersonDto, avatar);
  }

  @Post('export-excel')
  exportExcel(@Body() dto: ExportPersonDto, @Res() res: Response) {
    return this.personService.exportExcel(dto.listId, res);
  }

  @Post('export-all-excel')
  exportExcelAll(@Res() res: Response) {
    return this.personService.exportAllExcel(res);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  @RequirePermissions('person.create')
  @UseGuards(JwtAuthGuard)
  importExcel(@UploadedFile() file: Express.Multer.File) {
    //console.log('Received file:', file.originalname);
    return this.personService.importExcelFromFile(file);
  }

  @Patch(':id')
  @RequirePermissions('person.edit')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.personService.update(id, updatePersonDto, avatar);
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

  @Delete(':id/avatar')
  @RequirePermissions('person.delete')
  @UseGuards(JwtAuthGuard)
  removeAvatar(@Param('id', ParseIntPipe) id: number) {
    return this.personService.removeAvatar(id);
  }
}
