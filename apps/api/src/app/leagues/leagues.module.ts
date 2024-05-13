import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from './entities/league.entity';
import { LeaguePlayer } from './entities/league_player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from '../predictions/entities/prediction.entity';
import { SelectedLeague } from './entities/selected_league.entity';
import { SelectedLeagueService } from './selected-league.service';
import { SelectedLeagueController } from './selected-league.controller';
import { LeaguePlayersController } from './league-teams.controller';
import { LeaguePlayersService } from './league-teams.service';
import { Player } from '../players/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      League,
      LeaguePlayer,
      Prediction,
      SelectedLeague,
      Player,
    ]),
  ],
  controllers: [
    LeaguesController,
    SelectedLeagueController,
    LeaguePlayersController,
  ],
  providers: [LeaguesService, SelectedLeagueService, LeaguePlayersService],
})
export class LeaguesModule {}
