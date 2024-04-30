import { PartialType } from '@nestjs/mapped-types';
import { CreateSeederDto } from './create-seeder.dto';

export class UpdateSeederDto extends PartialType(CreateSeederDto) {}
