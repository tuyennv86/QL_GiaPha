import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RoleMenusService } from './role-menus.service';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('role-menus')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoleMenusController {
  constructor(private readonly roleMenusService: RoleMenusService) {}

  @Post()
  create(@Body() createRoleMenuDto: CreateRoleMenuDto) {
    const { role_id, menu_ids } = createRoleMenuDto;
    return this.roleMenusService.updateRoleMenus(role_id, menu_ids);
  }

  @Get('role/:roleId')
  findByRole(@Param('roleId') roleId: string) {
    return this.roleMenusService.findByRole(+roleId);
  }
}
