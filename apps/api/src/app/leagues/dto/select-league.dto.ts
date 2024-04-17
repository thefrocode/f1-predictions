import { IsNotEmpty, IsNumber } from 'class-validator';

export class SelectLeagueDto {
  @IsNumber()
  @IsNotEmpty()
  league_id: number;

  @IsNumber()
  @IsNotEmpty()
  player_id: number;
}
