import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { LeaguePlayer } from '../entities/league_player.entity';

export const LeaguePlayersFactory = setSeederFactory(
  LeaguePlayer,
  (faker: Faker) => {
    const leaguePlayer = new LeaguePlayer();
    return leaguePlayer;
  }
);
