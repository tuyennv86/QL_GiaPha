import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FamilybrannchesService } from './familybrannches.service';
import { CreateFamilybrannchDto } from './dto/create-familybrannch.dto';
import { UpdateFamilybrannchDto } from './dto/update-familybrannch.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('familybrannches')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FamilybrannchesController {
  constructor(
    private readonly familybrannchesService: FamilybrannchesService,
  ) {}

  @Get()
  findAll() {
    return this.familybrannchesService.findAll();
  }

  @Get('family/:familyId')
  findAllByFamilyId(@Param('familyId') familyId: string) {
    return this.familybrannchesService.findAllByFamilyId(+familyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familybrannchesService.findOne(+id);
  }

  @Post()
  create(@Body() createFamilybrannchDto: CreateFamilybrannchDto) {
    return this.familybrannchesService.create(createFamilybrannchDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFamilybrannchDto: UpdateFamilybrannchDto,
  ) {
    return this.familybrannchesService.update(+id, updateFamilybrannchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familybrannchesService.remove(+id);
  }
}
