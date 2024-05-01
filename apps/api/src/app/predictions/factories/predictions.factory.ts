import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Prediction } from '../entities/prediction.entity';

export const PredictionsFactory = setSeederFactory(
  Prediction,
  (faker: Faker) => {
    const result = new Prediction();
    return result;
  }
);
