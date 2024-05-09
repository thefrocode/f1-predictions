import 'reflect-metadata';
import * as fs from 'fs';
import http from 'http';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Driver } from './app/drivers/entities/driver.entity';
import { League } from './app/leagues/entities/league.entity';
import { LeaguePlayer } from './app/leagues/entities/league_player.entity';
import { Player } from './app/players/entities/player.entity';
import { PlayersFactory } from './app/players/factories/players.factory';
import { PredictionType } from './app/predictions/entities/prediction-type.entity';
import { Prediction } from './app/predictions/entities/prediction.entity';
import { Team } from './app/predictions/entities/team.entity';
import { Race } from './app/races/entities/race.entity';
import MainSeeder from './app/shared/seeders/main.seeder';
import { DriversFactory } from './app/drivers/factories/drivers.factory';
import { LeaguesFactory } from './app/leagues/factories/leagues.factory';
import { LeaguePlayersFactory } from './app/leagues/factories/league_players.factory';
import { RacesFactory } from './app/races/factories/races.factory';
import { TeamsFactory } from './app/predictions/factories/teams.factory';
import { ResultsFactory } from './app/results/factories/result.factory';
import { PredictionsFactory } from './app/predictions/factories/predictions.factory';
import { Result } from './app/results/entities/result.entity';
import { User } from './app/users/entities/user.entity';
import { UsersFactory } from './app/users/factories/user.factory';
import { SelectedLeague } from './app/leagues/entities/selected_league.entity';

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

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Seeding script is running!\n');
});

// Bind the server to the defined port
server.listen(PORT, () => {
  console.log(`Seeding script server is running on port ${PORT}`);
});

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
          User,
          SelectedLeague,
        ],
        factories: [
          PlayersFactory,
          DriversFactory,
          LeaguesFactory,
          LeaguePlayersFactory,
          RacesFactory,
          TeamsFactory,
          ResultsFactory,
          PredictionsFactory,
          UsersFactory,
        ],
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
          User,
          SelectedLeague,
        ],
        factories: [
          PlayersFactory,
          DriversFactory,
          LeaguesFactory,
          LeaguePlayersFactory,
          RacesFactory,
          TeamsFactory,
          ResultsFactory,
          PredictionsFactory,
          UsersFactory,
        ],

        seeds: [MainSeeder],
      } as DataSourceOptions & SeederOptions);

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
