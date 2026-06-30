import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBranchRoleDto } from './create-user-branch-role.dto';

export class UpdateUserBranchRoleDto extends PartialType(CreateUserBranchRoleDto) {}
