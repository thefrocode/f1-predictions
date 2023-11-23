import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateRaceDto } from './create-race.dto';

export class UpdateRaceDto extends PartialType(CreateRaceDto) {
  @IsBoolean()
  active: boolean;
}
