import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePointDto {
  @IsNotEmpty()
  @IsNumber()
  team_id: number;

  @IsNotEmpty()
  @IsNumber()
  race_id: number;

  @IsNotEmpty()
  @IsNumber()
  prediction_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  points: number;
}
