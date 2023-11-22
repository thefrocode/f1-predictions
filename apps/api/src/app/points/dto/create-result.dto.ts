import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  driver_id: number;

  @IsNotEmpty()
  @IsNumber()
  race_id: number;

  @IsNotEmpty()
  @IsNumber()
  prediction_type_id: number;
}
