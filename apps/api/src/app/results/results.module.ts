import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { PredictionType } from '../predictions/entities/prediction-type.entity';
import { PredictionsService } from '../predictions/predictions.service';
import { Prediction } from '../predictions/entities/prediction.entity';
import { Team } from '../predictions/entities/team.entity';
import { Race } from '../races/entities/race.entity';
import { RacesService } from '../races/races.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, PredictionType, Prediction, Team, Race]),
  ],
  controllers: [ResultsController],
  providers: [ResultsService, PredictionsService, RacesService],
})
export class ResultsModule {}
