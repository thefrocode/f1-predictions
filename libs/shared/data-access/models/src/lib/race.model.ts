export interface Race {
  name: string;
  short_name: string;
  fp1_time: Date;
  fp2_time: Date;
  fp3_time: Date;
  qualifying_time: Date;
  race_time: Date;
  race_number: string;
  active: boolean;
}

export type RacesState = {
  races: Race[];
  isLoading: boolean;
  error: unknown;
  active_race?: Race;
};
