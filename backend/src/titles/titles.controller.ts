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
import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('titles.create')
  @Post()
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.create(createTitleDto);
  }

  @Get()
  findAll() {
    return this.titlesService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('titles.view')
  @Get('search')
  searchTitles(@Query('search') search?: string) {
    return this.titlesService.searchTitles(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titlesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('titles.edit')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titlesService.update(+id, updateTitleDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('titles.delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titlesService.remove(+id);
  }
}
