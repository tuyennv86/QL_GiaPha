import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../permissions/permissions.guard';
import { RequirePermissions } from '../permissions/require-permissions.decorator';
import type { RequestWithUser } from '../common/interfaces/request-with-user.interface';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Menu được lọc theo quyền của user hiện tại
  @Get('my-menu')
  getMyMenu(@Req() req: RequestWithUser) {
    // console.log('User login:', req.user);
    return this.menuService.getMenuForUser(
      req.user.permissions,
      req.user.roles,
    );
  }
  // lấy danh sách menu xây dựng dang tree
  @Get('tree')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.view')
  getTree() {
    return this.menuService.getTree();
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.view')
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.view')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.create')
  create(@Body() dto: CreateMenuItemDto) {
    return this.menuService.create(dto);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.edit')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMenuItemDto,
  ) {
    return this.menuService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequirePermissions('menu.delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
