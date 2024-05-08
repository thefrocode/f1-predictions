import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nick_name?: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
