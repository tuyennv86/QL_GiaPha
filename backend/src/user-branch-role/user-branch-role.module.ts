import { Module } from '@nestjs/common';
import { UserBranchRoleService } from './user-branch-role.service';
import { UserBranchRoleController } from './user-branch-role.controller';

@Module({
  controllers: [UserBranchRoleController],
  providers: [UserBranchRoleService],
})
export class UserBranchRoleModule {}
