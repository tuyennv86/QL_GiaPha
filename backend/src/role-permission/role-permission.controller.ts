import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('role-permission')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    const { role_id, permission_ids } = createRolePermissionDto;
    return this.rolePermissionService.updateRolePermissions(
      role_id,
      permission_ids,
    );
  }

  @Get('role/:roleId')
  findByRole(@Param('roleId') roleId: string) {
    return this.rolePermissionService.findByRole(+roleId);
  }
}
