import 'reflect-metadata';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Driver } from './app/drivers/entities/driver.entity';
import { League } from './app/leagues/entities/league.entity';
import { LeaguePlayer } from './app/leagues/entities/league_player.entity';
import { Player } from './app/players/entities/player.entity';
import { PlayersFactory } from './app/players/factories/players.factory';
import { PredictionType } from './app/predictions/entities/prediction-type.entity';
import { Prediction } from './app/predictions/entities/prediction.entity';
import { Result } from './app/predictions/entities/result.entity';
import { Team } from './app/predictions/entities/team.entity';
import { Race } from './app/races/entities/race.entity';
import MainSeeder from './app/shared/seeders/main.seeder';
import { configService } from './config/config.service';

const {
  F1_MYSQL_HOST,
  F1_MYSQL_PORT,
  F1_MYSQL_USER,
  F1_MYSQL_PASSWORD,
  F1_MYSQL_DATABASE,
  MODE,
} = process.env;

function getValue(value: string | undefined, throwOnMissing = true): string {
  if (value == undefined && throwOnMissing) {
    throw new Error(`config error - missing env.${value}`);
  }
  return value as string;
}

const options =
  MODE === 'PROD'
    ? ({
        type: 'mysql',
        host: F1_MYSQL_HOST,
        port: parseInt(getValue(F1_MYSQL_PORT)),
        username: F1_MYSQL_USER,
        password: F1_MYSQL_PASSWORD,
        database: F1_MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        ssl: false,
        extra: {
          ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('/etc/secrets/ca_cert').toString(),
          },
        },
        entities: [
          Player,
          League,
          LeaguePlayer,
          Team,
          Prediction,
          Driver,
          PredictionType,
          Race,
          Result,
        ],
        factories: [PlayersFactory],
        seeds: [MainSeeder],
      } as DataSourceOptions & SeederOptions)
    : ({
        type: 'mysql',
        host: F1_MYSQL_HOST,
        port: parseInt(getValue(F1_MYSQL_PORT)),
        username: F1_MYSQL_USER,
        password: F1_MYSQL_PASSWORD,
        database: F1_MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        ssl: false,
        entities: [
          Player,
          League,
          LeaguePlayer,
          Team,
          Prediction,
          Driver,
          PredictionType,
          Race,
          Result,
        ],
        factories: [PlayersFactory],
        seeds: [MainSeeder],
      } as DataSourceOptions & SeederOptions);
console.log(options);
const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
