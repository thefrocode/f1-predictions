import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  owner_id: number;
}
