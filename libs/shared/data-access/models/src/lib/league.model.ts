import { Player } from './player.model';
import { Point } from './point.model';

export interface League {
  id: number;
  name: string;
  owner_id: number;
  position?: number;
}
export type AddLeague = Omit<League, 'id'>;

export type LeaguesState = {
  leagues: League[];
  players: Point[];
  isLoading: boolean;
  error: any;
};
