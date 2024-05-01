import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { League } from '../entities/league.entity';

export const LeaguesFactory = setSeederFactory(League, (faker: Faker) => {
  const league = new League();
  league.name = faker.internet.domainWord();
  return league;
});
