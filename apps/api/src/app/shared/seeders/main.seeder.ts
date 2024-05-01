import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Player } from '../../players/entities/player.entity';
import { Driver } from '../../drivers/entities/driver.entity';
import { League } from '../../leagues/entities/league.entity';
import { faker } from '@faker-js/faker';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const playerFactory = factoryManager.get(Player);
    const driverFactory = factoryManager.get(Driver);
    const leagueFactory = factoryManager.get(League);
    const leaguesRepository = dataSource.getRepository(League);
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
  }
}
