import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PredictionsState, TopTeams } from '@f1-predictions/models';
import { PredictionApiService } from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';

const initialState: PredictionsState = {
  top_teams: undefined,
  status: 'pending',
  error: null,
};
export const PredictionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, predictionApi = inject(PredictionApiService)) => ({
    loadTopTeams: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(() =>
          predictionApi.loadTopTeams().pipe(
            tapResponse({
              next: (top_teams: TopTeams) => {
                patchState(store, { top_teams, status: 'success' });
              },
              error: () => {
                console.error, patchState(store, { status: 'failed' });
              },
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit({ loadTopTeams }) {
      loadTopTeams();
    },
  })
);
