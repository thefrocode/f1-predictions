import { Player } from './player.model';
import { Point } from './point.model';

export interface League {
  id: number;
  name: string;
  owner_id: number;
  position?: number;
}
export type AddLeague = Omit<League, 'id'>;

export interface SelectedLeague {
  id: number;
  league_id: number;
  player_id: number;
}
export type LeaguePlayers = League & {
  league_id: number;
  number_of_players: number;
  average_points: number;
  players: Point[];
};

export type LeaguesState = {
  leagues: League[];
  league_players: LeaguePlayers[];
  selected_league: SelectedLeague;
  isLoading: boolean;
  error: any;
};
