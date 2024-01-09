export interface Team {
  id: number;
  name: string;
  player_id: number;
}

export type AddTeam = Omit<Team, 'id'>;

export type TeamsState = {
  teams: Team[];
  isLoading: boolean;
  error: any;
};
