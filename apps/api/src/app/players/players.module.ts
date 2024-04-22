import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, LeaguePlayer])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
