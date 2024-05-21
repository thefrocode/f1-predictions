import { TopBottomDriverPoints } from './driver.model';
import { TopTeams } from './prediction.model';
import { Meta } from './response.model';

export interface Result {
  race_id: number;
  name: string;
  [key: string]: string | number;
}

export type RaceSummary = {
  top_teams: TopTeams | undefined;
  driver_points: TopBottomDriverPoints | undefined;
};

export type ResultsState = {
  results: Result[];
  last_race: RaceSummary | undefined;
  options: { page: number };
  meta: Meta;
  status: 'pending' | 'loading' | 'success' | 'failed';
  error: any;
};
