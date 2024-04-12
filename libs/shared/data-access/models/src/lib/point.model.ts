export interface Point {
  total_points: number;
  last_race_points: number;
  player_id?: number;
}

export type PointsState = {
  points: Point;
  isLoading: boolean;
  error: any;
};
