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
import { Prediction } from '../../predictions/entities/prediction.entity';
import { Result } from '../../results/entities/result.entity';
import { cp } from 'fs';
import { User } from '../../users/entities/user.entity';
import { SelectedLeague } from '../../leagues/entities/selected_league.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(User);
    const playerFactory = factoryManager.get(Player);
    const playersRepository = dataSource.getRepository(Player);

    const driverFactory = factoryManager.get(Driver);

    const leagueFactory = factoryManager.get(League);
    const leaguesRepository = dataSource.getRepository(League);

    const leaguePlayersFactory = factoryManager.get(LeaguePlayer);
    const leaguePlayersRepository = dataSource.getRepository(LeaguePlayer);
    const selectedLeagueRepository = dataSource.getRepository(SelectedLeague);

    const predictionTypesRepository = dataSource.getRepository(PredictionType);

    const racesFactory = factoryManager.get(Race);
    const racesRepository = dataSource.getRepository(Race);

    const teamsFactory = factoryManager.get(Team);
    const teamsRepository = dataSource.getRepository(Team);

    const resultsFactory = factoryManager.get(Result);
    const resultsRepository = dataSource.getRepository(Result);

    const predictionsFactory = factoryManager.get(Prediction);
    const predictionsRepository = dataSource.getRepository(Prediction);
    console.log('Seeding users..');
    const users = await userFactory.saveMany(100);
    console.log('Seeding players..');
    const players = await Promise.all(
      Array(100)
        .fill('')
        .map(async () => {
          const selectedUser = faker.helpers.arrayElement(users);

          const index = users.indexOf(selectedUser);
          if (index !== -1) {
            users.splice(index, 1);
          }
          const made = await playerFactory.make({
            user: selectedUser,
          });
          return made;
        })
    );
    await playersRepository.save(players);

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

    console.log('Seeding drivers..');
    const drivers = await driverFactory.saveMany(20);

    const globalLeaguePlayers = await Promise.all(
      players.map(async (player) => {
        const made = await leaguePlayersFactory.make({
          league_id: 1,
          player,
        });
        return made;
      })
    );
    await leaguePlayersRepository.save(globalLeaguePlayers);
    leagues.splice(1, 1);

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
    //Ading Global League as selected League
    const selectedLeagues = await Promise.all(
      players.map(async (player) => {
        const made = {
          league_id: 1,
          player_id: player.id,
        };
        return made;
      })
    );
    await selectedLeagueRepository.save(selectedLeagues);

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
        name: 'P6',
        type: 'Not Played',
      },
      {
        name: 'P7',
        type: 'Not Played',
      },
      {
        name: 'P8',
        type: 'Not Played',
      },
      {
        name: 'P9',
        type: 'Not Played',
      },
      {
        name: 'P10',
        type: 'Not Played',
      },
      {
        name: 'P11',
        type: 'Not Played',
      },
      {
        name: 'P12',
        type: 'Not Played',
      },
      {
        name: 'P13',
        type: 'Not Played',
      },
      {
        name: 'P14',
        type: 'Not Played',
      },
      {
        name: 'P15',
        type: 'Not Played',
      },
      {
        name: 'P16',
        type: 'Not Played',
      },
      {
        name: 'P17',
        type: 'Not Played',
      },
      {
        name: 'P18',
        type: 'Not Played',
      },
      {
        name: 'P19',
        type: 'Not Played',
      },
      {
        name: 'P20',
        type: 'Not Played',
      },
      {
        name: 'Fastest_Lap',
        type: 'Random',
      },
      {
        name: 'Driver_of_the_Day',
        type: 'Random',
      },
      {
        name: 'Most_Overtakes',
        type: 'Random',
      },
      {
        name: 'Pole_Position',
        type: 'Random',
      },
      {
        name: 'Fastest_Pistop',
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
            race_status: raceNumber === 1 ? 'Active' : 'Upcoming',
            race_number: `${raceNumber++}/23`,
          });

          return made;
        })
    );
    await racesRepository.save(races);
    console.log('Seeding teams..');

    const played_prediction_types = prediction_types.filter(
      (prediction_type) => prediction_type.type !== 'Not Played'
    );
    const teamsPromise = await Promise.all(
      players.map(async (player) => {
        return Promise.all(
          played_prediction_types.map(async (prediction_type) => {
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

    const positional_prediction_types = prediction_types.filter(
      (prediction_type) => prediction_type.type !== 'Random'
    );
    const random_prediction_types = prediction_types.filter(
      (prediction_type) => prediction_type.type === 'Random'
    );

    const resultsArray = await Promise.all(
      races.slice(0, 5).map(async (race) => {
        let count = 1;
        const driversPerRace = [...drivers];
        return Promise.all(
          prediction_types.map(async (prediction_type) => {
            let made;
            console.log(
              prediction_type.id,
              prediction_type.name,
              driversPerRace.length
            );
            if (prediction_type.type === 'Random') {
              made = await resultsFactory.make({
                race,
                prediction_type,
                driver: faker.helpers.arrayElement(drivers),
              });
            } else {
              const selectedDriver = faker.helpers.arrayElement(driversPerRace);

              const index = driversPerRace.indexOf(selectedDriver);
              if (index !== -1) {
                driversPerRace.splice(index, 1);
              }

              made = await resultsFactory.make({
                race,
                prediction_type,
                driver: selectedDriver,
              });
            }
            count++;
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
              played_prediction_types.map(async (prediction_type) => {
                let points = 0;
                let predicted_driver = faker.helpers.arrayElement(drivers);
                const correct_driver_id = results.find(
                  (result) =>
                    result.prediction_type_id === prediction_type.id &&
                    result.race_id === race.id
                );
                const correct_driver = drivers.find(
                  (driver) => driver.id === correct_driver_id?.driver_id
                );

                if (prediction_type.type === 'Random') {
                  if (predicted_driver.id == correct_driver?.id) {
                    points = 5;
                  }
                } else {
                  const predicted_driver_actual_result = results.find(
                    (result) => result.driver_id === predicted_driver.id
                  );
                  points =
                    20 -
                    Math.abs(
                      correct_driver_id!.prediction_type_id -
                        predicted_driver_actual_result!.prediction_type_id
                    );
                }
                const made = await predictionsFactory.make({
                  race,
                  player,
                  prediction_type,
                  predicted_driver: predicted_driver,
                  correct_driver: correct_driver,
                  points: points,
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
