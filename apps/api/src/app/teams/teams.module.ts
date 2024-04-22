import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, LeaguePlayer])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
