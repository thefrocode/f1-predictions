import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { LeaguesModule } from './leagues/leagues.module';
import { PlayersModule } from './players/players.module';
import { DriversModule } from './drivers/drivers.module';
import { PredictionsModule } from './predictions/predictions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { SharedModule } from './shared/shared.module';
import { ResultsModule } from './results/results.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RacesModule,
    LeaguesModule,
    PlayersModule,
    DriversModule,
    PredictionsModule,
    SharedModule,
    ResultsModule,
    AuthModule,
    UsersModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
