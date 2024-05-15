import { LeaguePlayer } from './league-team.model';

export interface Player {
  id: number;
  name: string;
  nick_name: number;
  user_id: string;
}

export type ActivePlayer = Player & {
  last_race_points: number;
  total_points: number;
  selected_league_id: number;
};

export type ActivePlayerState = {
  player: ActivePlayer | undefined;
  status: 'pending' | 'loading' | 'success' | 'error';
  error: any;
};

export type PlayerWithPoints = Player & {
  last_race_points: number;
  total_points: number;
  selected_league_id: number;
  position: number;
};

export type PlayersState = {
  active_player: ActivePlayer | undefined;
  players: Player[];
  leagues: LeaguePlayer[];
  isLoading: boolean;
  error: any;
};
