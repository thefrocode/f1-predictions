export interface Race {
  [key: string]: string | Date | boolean; // Add index signature
  name: string;
  short_name: string;
  fp1_time: Date;
  fp2_time: Date;
  fp3_time: Date;
  quali_time: Date;
  race_time: Date;
  race_number: string;
  race_status: string;
}

export type RacesState = {
  races: Race[];
  isLoading: boolean;
  error: unknown;
  active_race?: Race;
};
