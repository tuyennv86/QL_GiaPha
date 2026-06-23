import { Controller, Get, UseGuards } from '@nestjs/common';
import { FamilyService } from './family.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('family')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  fillAll() {
    return this.familyService.findAll();
  }
}
