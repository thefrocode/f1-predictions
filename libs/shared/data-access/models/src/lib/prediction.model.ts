export interface TopTeams {
  [key: string]: {
    player_id: number;
    points: number;
    name: string;
  };
}
export type PredictionsState = {
  top_teams: TopTeams | undefined;
  status: 'pending' | 'loading' | 'success' | 'failed';
  error: any;
};
