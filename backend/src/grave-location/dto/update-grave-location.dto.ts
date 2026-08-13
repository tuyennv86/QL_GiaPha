import { PartialType } from '@nestjs/mapped-types';
import { CreateGraveLocationDto } from './create-grave-location.dto';

export class UpdateGraveLocationDto extends PartialType(CreateGraveLocationDto) {}
