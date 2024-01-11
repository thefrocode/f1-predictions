import { LeagueTeam } from './league-team.model';

export interface Player {
  id: number;
  name: string;
  nick_name: number;
  user_id: string;
}

export type PlayersState = {
  players: Player[];
  leagues: LeagueTeam[];
  isLoading: boolean;
  error: any;
};
