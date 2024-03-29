import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { LeaguesModule } from './leagues/leagues.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { DriversModule } from './drivers/drivers.module';
import { PredictionsModule } from './predictions/predictions.module';
import { PointsModule } from './points/points.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RacesModule,
    LeaguesModule,
    PlayersModule,
    TeamsModule,
    DriversModule,
    PredictionsModule,
    PointsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
