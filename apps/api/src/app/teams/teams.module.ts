import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { LeagueTeam } from '../leagues/entities/league_team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, LeagueTeam])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
