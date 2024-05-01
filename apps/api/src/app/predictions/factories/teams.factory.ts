import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Team } from '../entities/team.entity';

export const TeamsFactory = setSeederFactory(Team, (faker: Faker) => {
  const team = new Team();
  return team;
});
