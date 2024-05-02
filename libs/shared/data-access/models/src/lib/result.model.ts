export interface Result {
  race_id: number;
  name: string;
  [key: string]: string | number;
}

export type ResultsState = {
  results: Result[];
  status: 'pending' | 'loading' | 'success' | 'error';
  error: any;
};
