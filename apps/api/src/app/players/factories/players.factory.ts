import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Player } from '../entities/player.entity';

export const PlayersFactory = setSeederFactory(Player, (faker: Faker) => {
  const player = new Player();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  player.name = `${firstName} ${lastName}`;
  player.user_id = faker.string.uuid();
  player.nick_name = faker.internet.userName({ firstName, lastName });
  return player;
});
