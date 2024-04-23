import { inject } from '@angular/core';
import { PredictionTypeApiService } from '@f1-predictions/f1-predictions-api';
import { PredictionTypesState, PredictionType } from '@f1-predictions/models';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';

const initialState: PredictionTypesState = {
  prediction_types: [],
  isLoading: false,
  error: null,
};
export const PredictionTypesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, predictionTypesApi = inject(PredictionTypeApiService)) => ({
      loadAll: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            predictionTypesApi.findAll().pipe(
              tapResponse({
                next: (prediction_types: PredictionType[]) => {
                  patchState(store, { prediction_types });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit({ loadAll }) {
      loadAll();
    },
  })
);
