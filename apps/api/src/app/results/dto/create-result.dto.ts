import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  race_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PredictionResultDto)
  results: PredictionResultDto[];
}

class PredictionResultDto {
  @IsNotEmpty()
  @IsNumber()
  prediction_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  driver_id: number;
}
