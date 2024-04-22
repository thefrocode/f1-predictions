import { League } from './league.model';

export interface LeaguePlayer {
  id: number;
  league_id: number;
  player_id: number;
  league?: League;
}

export type AddLeaguePlayer = Omit<LeaguePlayer, 'id'>;
