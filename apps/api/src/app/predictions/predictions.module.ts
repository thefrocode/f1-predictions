import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { PredictionType } from './entities/prediction-type.entity';
import { Player } from '../players/entities/player.entity';
import { Team } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { PredictionTypesController } from './prediction-types.controller';
import { PredictionTypesService } from './prediction-types.service';
import { Result } from '../results/entities/result.entity';
import { PlayersService } from '../players/players.service';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';
import { SelectedLeague } from '../leagues/entities/selected_league.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prediction,
      PredictionType,
      Player,
      Result,
      Team,
      LeaguePlayer,
      SelectedLeague,
    ]),
  ],
  controllers: [
    PredictionsController,
    TeamsController,
    PredictionTypesController,
  ],
  providers: [
    PredictionsService,
    TeamsService,
    PredictionTypesService,
    PlayersService,
  ],
})
export class PredictionsModule {}
