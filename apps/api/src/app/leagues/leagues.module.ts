import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from './entities/league.entity';
import { LeagueTeam } from './entities/league_team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from '../predictions/entities/prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, LeagueTeam, Prediction])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
