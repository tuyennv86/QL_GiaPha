import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonTitleDto } from './create-person-title.dto';

export class UpdatePersonTitleDto extends PartialType(CreatePersonTitleDto) {}
