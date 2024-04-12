import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.pointsService.create(createPredictionDto);
  }

  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @Get(':player_id')
  findOne(@Param('player_id') player_id: string) {
    return this.pointsService.findOne(+player_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredictionDto: UpdatePredictionDto
  ) {
    return this.pointsService.update(+id, updatePredictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointsService.remove(+id);
  }
}
