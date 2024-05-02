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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
