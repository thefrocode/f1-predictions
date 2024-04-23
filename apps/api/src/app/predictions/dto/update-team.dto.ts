import { PartialType } from '@nestjs/mapped-types';
import { CreatePredictionDto } from './create-prediction.dto';

export class UpdateTeamDto extends PartialType(CreatePredictionDto) {}
