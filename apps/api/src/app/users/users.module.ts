import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';
import { Prediction } from '../predictions/entities/prediction.entity';
import { SelectedLeague } from '../leagues/entities/selected_league.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Player,
      LeaguePlayer,
      Prediction,
      SelectedLeague,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PlayersService],
})
export class UsersModule {}
