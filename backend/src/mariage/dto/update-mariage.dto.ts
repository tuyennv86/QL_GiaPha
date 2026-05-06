import { PartialType } from '@nestjs/mapped-types';
import { CreateMariageDto } from './create-mariage.dto';

export class UpdateMariageDto extends PartialType(CreateMariageDto) {}
