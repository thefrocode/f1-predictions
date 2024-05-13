import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SelectLeagueDto {
  @IsNumber()
  @IsNotEmpty()
  league_id: number;
}
