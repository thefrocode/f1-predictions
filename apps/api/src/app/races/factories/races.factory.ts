import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Race } from '../entities/race.entity';

export const RacesFactory = setSeederFactory(Race, (faker: Faker) => {
  const race = new Race();
  const location = faker.location;
  const name = `${location.city()} Grand Prix`;
  race.name = race.short_name = name;
  race.country = location.country();
  race.fp1_time;
  return race;
});
