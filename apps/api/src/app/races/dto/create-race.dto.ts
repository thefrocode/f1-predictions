import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  short_name: string;

  @IsNotEmpty()
  @IsDateString()
  fp1_time: Date;

  @IsNotEmpty()
  @IsDateString()
  fp2_time: Date;

  @IsNotEmpty()
  @IsDateString()
  fp3_time: Date;

  @IsNotEmpty()
  @IsDateString()
  qualifying_time: Date;

  @IsNotEmpty()
  @IsDateString()
  race_time: Date;

  @IsNotEmpty()
  @IsString()
  race_number: string;
}
