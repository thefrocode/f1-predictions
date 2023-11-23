import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { League } from './entities/league.entity';
import { LeagueTeam } from './entities/league_team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([League, LeagueTeam])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
