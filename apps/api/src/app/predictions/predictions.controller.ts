import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionsService.create(createPredictionDto);
  }

  @Get()
  findAll() {
    return this.predictionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredictionDto: UpdatePredictionDto
  ) {
    return this.predictionsService.update(+id, updatePredictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionsService.remove(+id);
  }
}
