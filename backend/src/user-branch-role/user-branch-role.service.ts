import { Injectable } from '@nestjs/common';
import { CreateUserBranchRoleDto } from './dto/create-user-branch-role.dto';
import { UpdateUserBranchRoleDto } from './dto/update-user-branch-role.dto';

@Injectable()
export class UserBranchRoleService {
  create(createUserBranchRoleDto: CreateUserBranchRoleDto) {
    return 'This action adds a new userBranchRole';
  }

  findAll() {
    return `This action returns all userBranchRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBranchRole`;
  }

  update(id: number, updateUserBranchRoleDto: UpdateUserBranchRoleDto) {
    return `This action updates a #${id} userBranchRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBranchRole`;
  }
}
