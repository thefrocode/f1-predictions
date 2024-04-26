import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTeamDto {
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
