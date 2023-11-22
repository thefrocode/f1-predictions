import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nick_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
