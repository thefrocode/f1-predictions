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

export type LeaguesState = {
  leagues: League[];
  players: Point[];
  active_player_position: Point;
  selected_league: SelectedLeague;
  isLoading: boolean;
  error: any;
};
