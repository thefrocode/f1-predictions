export interface Driver {
  id: number;
  name: string;
  selected: boolean;
}
export type DriverPoints = Driver & {
  points: number;
};

export type TopBottomDriverPoints = {
  top_scorer: DriverPoints;
  bottom_scorer: DriverPoints;
};

export type DriversState = {
  drivers: Driver[];
  isLoading: boolean;
  error: any;
};
