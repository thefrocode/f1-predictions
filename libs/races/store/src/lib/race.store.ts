import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Race, RacesState } from '@f1-predictions/models';
import { RaceApiService } from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
const initialState: RacesState = {
  races: [],
  isLoading: false,
  error: null,
};
export const RacesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ races }) => ({
    active_race: computed(() =>
      races().find((race) => race.race_status === 'Active')
    ),
  })),
  withMethods((store, raceApi = inject(RaceApiService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          raceApi.loadAll().pipe(
            tapResponse({
              next: (races: Race[]) => {
                patchState(store, { races });
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
