import { LeaguePlayer } from './league-team.model';

export interface Player {
  id: number;
  name: string;
  nick_name: number;
  user_id: string;
}

export type PlayersState = {
  active_player: Player | undefined;
  players: Player[];
  leagues: LeaguePlayer[];
  isLoading: boolean;
  error: any;
};
