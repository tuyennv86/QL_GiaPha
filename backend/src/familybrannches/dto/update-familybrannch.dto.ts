import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilybrannchDto } from './create-familybrannch.dto';

export class UpdateFamilybrannchDto extends PartialType(
  CreateFamilybrannchDto,
) {}
