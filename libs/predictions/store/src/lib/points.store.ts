import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Point, PointsState, Race, RacesState } from '@f1-predictions/models';
import {
  PointsApiService,
  RaceApiService,
} from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
const initialState: PointsState = {
  points: {} as Point,
  isLoading: false,
  error: null,
};
export const PointsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, pointsApi = inject(PointsApiService)) => ({
    loadActivePlayerPoints: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          pointsApi.findOne(1).pipe(
            tapResponse({
              next: (points: Point) => {
                console.log(points);
                patchState(store, { points });
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit({ loadActivePlayerPoints }) {
      loadActivePlayerPoints(1);
    },
  })
);
