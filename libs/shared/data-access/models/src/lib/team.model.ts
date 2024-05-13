export interface Team {
  prediction_type: string;
  prediction_type_id: number;
  driver_name?: string;
  driver_id?: number;
  player_id: number;
}

export type AddTeam = Omit<Team, 'id'>;

export type PlayerTeam = {
  player_id: number;
  team: Team[];
};

export type TeamsState = {
  teams: PlayerTeam[];
  active_player_team: Team[] | undefined;
  selected_team: PlayerTeam | null;
  selected_player_id: number | null;
  isLoading: boolean;
  error: any;
};
