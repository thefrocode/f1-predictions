import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsNumber()
  player_id: number;
}
