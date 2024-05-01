import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Player } from '../../players/entities/player.entity';
import { Driver } from '../../drivers/entities/driver.entity';
import { League } from '../../leagues/entities/league.entity';
import { faker, pl, th } from '@faker-js/faker';
import { LeaguePlayer } from '../../leagues/entities/league_player.entity';
import { PredictionType } from '../../predictions/entities/prediction-type.entity';
import { Race } from '../../races/entities/race.entity';
import { Team } from '../../predictions/entities/team.entity';
import { Res } from '@nestjs/common';
import { Result } from '../../predictions/entities/result.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const playerFactory = factoryManager.get(Player);

    const driverFactory = factoryManager.get(Driver);

    const leagueFactory = factoryManager.get(League);
    const leaguesRepository = dataSource.getRepository(League);

    const leaguePlayersFactory = factoryManager.get(LeaguePlayer);
    const leaguePlayersRepository = dataSource.getRepository(LeaguePlayer);

    const predictionTypesRepository = dataSource.getRepository(PredictionType);

    const racesFactory = factoryManager.get(Race);
    const racesRepository = dataSource.getRepository(Race);

    const teamsFactory = factoryManager.get(Team);
    const teamsRepository = dataSource.getRepository(Team);

    const resultsFactory = factoryManager.get(Result);
    const resultsRepository = dataSource.getRepository(Result);

    const predictionsFactory = factoryManager.get(Prediction);
    const predictionsRepository = dataSource.getRepository(Prediction);

    console.log('Seeding players..');
    const players = await playerFactory.saveMany(100);
    console.log('Seeding drivers..');
    const drivers = await driverFactory.saveMany(20);

    const leagues = await Promise.all(
      Array(23)
        .fill('')
        .map(async () => {
          const made = await leagueFactory.make({
            owner: faker.helpers.arrayElement(players),
          });
          return made;
        })
    );
    await leaguesRepository.save(leagues);

    const leaguePlayers = await Promise.all(
      Array(23)
        .fill('')
        .map(async () => {
          const made = await leaguePlayersFactory.make({
            league: faker.helpers.arrayElement(leagues),
            player: faker.helpers.arrayElement(players),
          });
          return made;
        })
    );
    await leaguePlayersRepository.save(leaguePlayers);

    const predictionTypes = [
      {
        name: 'P1',
        type: 'Positional',
      },
      {
        name: 'P2',
        type: 'Positional',
      },
      {
        name: 'P3',
        type: 'Positional',
      },
      {
        name: 'P4',
        type: 'Positional',
      },
      {
        name: 'P5',
        type: 'Positional',
      },
      {
        name: 'Fastest Lap',
        type: 'Random',
      },
      {
        name: 'Driver of the Day',
        type: 'Random',
      },
      {
        name: 'Most Positions Gained',
        type: 'Random',
      },
      {
        name: 'Pole Position',
        type: 'Random',
      },
      {
        name: 'Fastest Pistop',
        type: 'Random',
      },
    ];
    const prediction_types = await predictionTypesRepository.save(
      predictionTypes
    );

    let days = 3;
    let raceNumber = 1;

    const races = await Promise.all(
      Array(23)
        .fill('')
        .map(async () => {
          const currentRace = this.getRandomThursdayOrFriday((days += 7));
          const fp2_time = new Date(currentRace);
          fp2_time.setHours(fp2_time.getHours() + 3);
          const fp3_time = new Date(currentRace);
          fp3_time.setHours(fp3_time.getHours() + 24);
          const quali_time = new Date(fp2_time);
          quali_time.setHours(fp2_time.getHours() + 24);
          const race_time = new Date(quali_time);
          race_time.setHours(quali_time.getHours() + 23);
          const made = await racesFactory.make({
            fp1_time: currentRace,
            fp2_time: fp2_time,
            fp3_time: fp3_time,
            quali_time: quali_time,
            race_time: race_time,
            active: raceNumber === 1,
            race_number: `${raceNumber++}/23`,
          });

          return made;
        })
    );
    await racesRepository.save(races);
    console.log('Seeding teams..');
    const teamsPromise = await Promise.all(
      players.map(async (player) => {
        return Promise.all(
          prediction_types.map(async (prediction_type) => {
            const made = await teamsFactory.make({
              player,
              prediction_type,
              driver: faker.helpers.arrayElement(drivers),
            });
            return made;
          })
        );
      })
    );

    const teams = teamsPromise.flat();
    await teamsRepository.save(teams);

    console.log('Seeding results..');
    const resultsArray = await Promise.all(
      races.slice(0, 5).map(async (race) => {
        return Promise.all(
          prediction_types.map(async (prediction_type) => {
            const made = await resultsFactory.make({
              race,
              prediction_type,
              driver: faker.helpers.arrayElement(drivers),
            });
            return made;
          })
        );
      })
    );

    const results = resultsArray.flat();
    await resultsRepository.save(results);
    console.log('Seeding predictions..');
    const predictionsArray = await Promise.all(
      races.slice(0, 5).map(async (race) => {
        return Promise.all(
          players.map(async (player) => {
            return Promise.all(
              prediction_types.map(async (prediction_type) => {
                const made = await predictionsFactory.make({
                  race,
                  player,
                  prediction_type,
                  predicted_driver: faker.helpers.arrayElement(drivers),
                  correct_driver: faker.helpers.arrayElement(drivers),
                  points: faker.number.int({ min: 0, max: 20 }),
                });
                return made;
              })
            );
          })
        );
      })
    );

    const predictions = predictionsArray.flat().flat();
    await predictionsRepository.save(predictions);
  }
  getRandomThursdayOrFriday(days: number) {
    let date;
    do {
      date = faker.date.soon({ days });
    } while (date.getDay() !== 4 && date.getDay() !== 5); // Thursday or Friday
    return date;
  }
}