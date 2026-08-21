import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/common/interfaces/request-with-user.interface';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
import { CreateFamilyDto } from './dto/create-family.dto';

@Controller('family')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  fillAll(@CurrentUser() user: JwtPayload) {
    const family_id = user.family_id;
    return this.familyService.findAll(family_id);
  }

  @Get('search')
  @RequirePermissions('family.view')
  fillSearch(
    @CurrentUser() user: JwtPayload,
    @Query('search') search?: string,
  ) {
    const family_id = user.family_id;
    return this.familyService.searchFamilies(search, family_id);
  }

  @Get(':id')
  @RequirePermissions('family.view')
  fillOneFamily(@Param('id') id: number) {
    return this.familyService.findOneFamily(id);
  }

  @Delete(':id')
  @RequirePermissions('family.delete')
  deleteFamily(@Param('id') id: number) {
    return this.familyService.deleteFamily(id);
  }

  @Post()
  @RequirePermissions('family.create')
  createFamily(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.createFamily(createFamilyDto);
  }

  @Patch(':id')
  @RequirePermissions('family.edit')
  updateFamily(
    @Param('id') id: number,
    @Body() updateFamilyDto: CreateFamilyDto,
  ) {
    return this.familyService.updateFamily(id, updateFamilyDto);
  }
}
