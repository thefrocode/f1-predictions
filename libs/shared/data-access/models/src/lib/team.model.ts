export interface Team {
  prediction_type: string;
  prediction_type_id: number;
  driver_name?: string;
  driver_id?: number;
  player_id: number;
}

export type AddTeam = Omit<Team, 'id'>;

export type TeamsState = {
  team: Team[];
  isLoading: boolean;
  error: any;
};
