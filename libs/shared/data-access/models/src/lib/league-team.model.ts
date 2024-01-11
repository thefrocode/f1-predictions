import { League } from './league.model';

export interface LeagueTeam {
  id: number;
  league_id: number;
  team_id: number;
  player_id: number;
  league: League;
}

export type AddLeagueTeam = Omit<LeagueTeam, 'id'>;
