import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinLeagueDto {
  @IsNumber()
  @IsNotEmpty()
  league_id: number;

  @IsNumber()
  @IsNotEmpty()
  player_id: number;
}
