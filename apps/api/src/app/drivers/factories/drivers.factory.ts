import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Driver } from '../entities/driver.entity';

export const DriversFactory = setSeederFactory(Driver, (faker: Faker) => {
  const driver = new Driver();
  driver.name = faker.person.fullName();
  return driver;
});
