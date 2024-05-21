import { DriverPoints, TopBottomDriverPoints } from './driver.model';

export interface TopTeams {
  [key: string]: {
    player_id: number;
    points: number;
    name: string;
    nick_name: string;
  };
}

export type PredictionsState = {
  top_teams: TopTeams | undefined;
  driver_points: TopBottomDriverPoints | undefined;
  status: 'pending' | 'loading' | 'success' | 'failed';
  error: any;
};
