export interface PredictionType {
  id: number;
  name: string;
  type: string;
}

export type PredictionTypesState = {
  prediction_types: PredictionType[];
  isLoading: boolean;
  error: any;
};
