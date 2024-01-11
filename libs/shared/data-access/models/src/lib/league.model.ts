import { Player } from './player.model';

export interface League {
  id: number;
  name: string;
  owner_id: number;
}
export type AddLeague = Omit<League, 'id'>;

export type LeaguesState = {
  leagues: League[];
  players: Player[];
  isLoading: boolean;
  error: any;
};
