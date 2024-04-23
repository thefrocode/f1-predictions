export interface Driver {
  id: number;
  name: string;
  selected: boolean;
}

export type DriversState = {
  drivers: Driver[];
  isLoading: boolean;
  error: any;
};
