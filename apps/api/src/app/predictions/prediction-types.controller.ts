import { Controller, Get } from '@nestjs/common';
import { PredictionTypesService } from './prediction-types.service';

@Controller('prediction-types')
export class PredictionTypesController {
  constructor(
    private readonly predictionTypesService: PredictionTypesService
  ) {}

  @Get()
  findAll() {
    return this.predictionTypesService.findAll();
  }
}
