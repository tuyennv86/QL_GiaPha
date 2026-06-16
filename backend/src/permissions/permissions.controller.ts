import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { RequirePermissions } from './require-permissions.decorator';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @RequirePermissions('permission.view')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get('search')
  @RequirePermissions('permission.view')
  findBySearch(@Query('search') search: string) {
    return this.permissionsService.findBySearch(search);
  }

  @Get(':id')
  @RequirePermissions('permission.view')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @RequirePermissions('permission.create')
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto);
  }

  @Patch(':id')
  @RequirePermissions('permission.edit')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, dto);
  }

  // delete multiple permissions by ids
  @Delete('delete-multiple')
  @RequirePermissions('permission.delete')
  deleteMultiple(@Body('ids') ids: number[]) {
    return this.permissionsService.deleteMultiple(ids);
  }

  @Delete(':id')
  @RequirePermissions('permission.delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.remove(id);
  }
}
