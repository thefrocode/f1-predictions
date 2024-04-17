import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from './entities/league.entity';
import { LeagueTeam } from './entities/league_team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from '../predictions/entities/prediction.entity';
import { SelectedLeague } from './entities/selected_league.entity';
import { SelectedLeagueService } from './selected-league.service';
import { SelectedLeagueController } from './selected-league.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([League, LeagueTeam, Prediction, SelectedLeague]),
  ],
  controllers: [LeaguesController, SelectedLeagueController],
  providers: [LeaguesService, SelectedLeagueService],
})
export class LeaguesModule {}
