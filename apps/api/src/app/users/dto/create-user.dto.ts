import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nick_name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateLocalUserDto extends CreateUserDto {
  @IsNotEmpty()
  password: string;
}
export class CreateGoogleUserDto extends CreateUserDto {
  @IsNumber()
  @IsOptional()
  google_id: string;
}
