import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Player } from '../../players/entities/player.entity';
import { Driver } from '../../drivers/entities/driver.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(Player);
    const driverFactory = factoryManager.get(Driver);
    console.log('Seeding players..');
    const users = await userFactory.saveMany(7);
    console.log('Seeding drivers..');
    const drivers = await driverFactory.saveMany(20);
  }
}
