import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { LeagueTeam } from '../leagues/entities/league_team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, LeagueTeam])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
