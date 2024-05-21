import { Player, PlayerWithPoints } from './player.model';
import { Point } from './point.model';
import { Meta } from './response.model';

export interface League {
  id: number;
  name: string;
  owner_id: number;
  position?: number;
}
export type AddLeague = Omit<League, 'id'>;

export interface DisplayLeague {
  id: number;
  name: string;
}

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
  options: { page: number; filter: string | null };
  meta: Meta;
  isLoading: boolean;
  error: any;
};
export type LeaguePlayersState = {
  players: PlayerWithPoints[];
  options: { page: number; filter: string | null };
  meta: Meta;
  selected_league_id: number;
  status: 'pending' | 'loading' | 'success' | 'error';
  error: any;
};
