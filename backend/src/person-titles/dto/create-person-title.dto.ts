import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreatePersonTitleDto {
  @IsNumber()
  person_id: number;

  @IsNumber()
  title_id: number;

  @IsNumber()
  @IsOptional()
  branch_id?: number;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsBoolean()
  is_active: boolean;
}
