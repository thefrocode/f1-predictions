export interface Team {
  prediction_type: string;
  prediction_type_id: number;
  driver_name: string;
  driver_id: number;
}

export type AddTeam = Omit<Team, 'id'>;

export type TeamsState = {
  teams: Team[];
  isLoading: boolean;
  error: any;
};
