import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserBranchRoleService } from './user-branch-role.service';
import { CreateUserBranchRoleDto } from './dto/create-user-branch-role.dto';
import { UpdateUserBranchRoleDto } from './dto/update-user-branch-role.dto';

@Controller('user-branch-role')
export class UserBranchRoleController {
  constructor(private readonly userBranchRoleService: UserBranchRoleService) {}

  @Post()
  create(@Body() createUserBranchRoleDto: CreateUserBranchRoleDto) {
    return this.userBranchRoleService.create(createUserBranchRoleDto);
  }

  @Get()
  findAll() {
    return this.userBranchRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBranchRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserBranchRoleDto: UpdateUserBranchRoleDto,
  ) {
    return this.userBranchRoleService.update(+id, updateUserBranchRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBranchRoleService.remove(+id);
  }
}
