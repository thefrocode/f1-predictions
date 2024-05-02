import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Result } from '../entities/result.entity';

export const ResultsFactory = setSeederFactory(Result, (faker: Faker) => {
  const result = new Result();
  return result;
});
