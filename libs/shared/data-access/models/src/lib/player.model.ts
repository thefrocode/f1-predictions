export interface Player {
  id: number;
  name: string;
  nick_name: number;
  user_id: string;
}

export type PlayersState = {
  players: Player[];
  isLoading: boolean;
  error: any;
};
