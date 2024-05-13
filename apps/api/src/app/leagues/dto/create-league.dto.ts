import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  owner_id: number;
}
