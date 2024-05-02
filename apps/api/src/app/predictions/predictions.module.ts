import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { PredictionType } from './entities/prediction-type.entity';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { Player } from '../players/entities/player.entity';
import { Team } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { PredictionTypesController } from './prediction-types.controller';
import { PredictionTypesService } from './prediction-types.service';
import { Result } from '../results/entities/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prediction,
      PredictionType,
      Player,
      Result,
      Team,
    ]),
  ],
  controllers: [
    PredictionsController,
    PointsController,
    TeamsController,
    PredictionTypesController,
  ],
  providers: [
    PredictionsService,
    PointsService,
    TeamsService,
    PredictionTypesService,
  ],
})
export class PredictionsModule {}
