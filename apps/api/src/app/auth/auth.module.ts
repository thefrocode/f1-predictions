import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { GoogleStrategy } from './strategies/google.strategy';
import { Prediction } from '../predictions/entities/prediction.entity';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, LeaguePlayer, Prediction]),
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    UsersService,
    JwtService,
    PlayersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
