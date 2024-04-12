import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { PredictionType } from './entities/prediction-type.entity';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { Player } from '../players/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction, PredictionType, Player])],
  controllers: [PredictionsController, PointsController],
  providers: [PredictionsService, PointsService],
})
export class PredictionsModule {}
