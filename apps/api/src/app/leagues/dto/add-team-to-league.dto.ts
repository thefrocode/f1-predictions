import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTeamToLeagueDto {
  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @IsNumber()
  @IsNotEmpty()
  league_id: number;
}
