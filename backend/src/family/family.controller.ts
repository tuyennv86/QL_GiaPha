import { Controller, Get } from '@nestjs/common';
import { FamilyService } from './family.service';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  @RequirePermissions('family.view')
  fillAll() {
    return this.familyService.findAll();
  }
}
