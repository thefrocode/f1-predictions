export interface LeagueTeam {
  id: number;
  league_id: number;
  team_id: number;
  player_id: number;
}

export type AddLeagueTeam = Omit<LeagueTeam, 'id'>;
