import { PartialType } from '@nestjs/mapped-types';
import { CreatePersionDto } from './create-persion.dto';

export class UpdatePersionDto extends PartialType(CreatePersionDto) {}
