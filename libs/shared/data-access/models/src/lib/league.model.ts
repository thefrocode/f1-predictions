export interface League {
  id: number;
  name: string;
  owner_id: number;
}
export type AddLeague = Omit<League, 'id'>;

export type LeaguesState = {
  leagues: League[];
  isLoading: boolean;
  error: any;
};
