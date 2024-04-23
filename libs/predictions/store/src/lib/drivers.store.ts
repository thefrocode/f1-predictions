import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Driver, DriversState, Team, TeamsState } from '@f1-predictions/models';
import {
  DriverApiService,
  TeamApiService,
} from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
const initialState: DriversState = {
  drivers: [],
  isLoading: false,
  error: null,
};
export const DriversStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, driverApi = inject(DriverApiService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          driverApi.loadAll().pipe(
            tapResponse({
              next: (drivers: Driver[]) => {
                console.log(drivers);
                patchState(store, { drivers });
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
    onInit({ loadAll }) {
      loadAll();
    },
  })
);
