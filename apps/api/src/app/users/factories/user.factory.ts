import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user.entity';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.password = faker.internet.password({ length: 30 });

  return user;
});
