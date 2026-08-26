import { IsBoolean, IsNumber } from 'class-validator';

export class CreatePersonTitleDto {
  @IsNumber()
  person_id: number;

  @IsNumber()
  title_id: number;

  @IsNumber()
  branch_id: number;

  start_date: Date;

  end_date: Date;

  @IsBoolean()
  is_active: boolean;
}
