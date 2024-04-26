import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePredictionDto {
  @IsNotEmpty()
  @IsNumber()
  race_id: number;

  @IsNotEmpty()
  @IsNumber()
  team_id: number;

  @IsNotEmpty()
  @IsNumber()
  prediction_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  driver_id: number;

  @IsNotEmpty()
  @IsNumber()
  player_id: number;
}
