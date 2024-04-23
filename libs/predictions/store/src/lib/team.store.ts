import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Team, TeamsState } from '@f1-predictions/models';
import { TeamApiService } from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  error: null,
};
export const TeamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, teamApi = inject(TeamApiService)) => ({
    loadTeam: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          teamApi.loadTeam(1).pipe(
            tapResponse({
              next: (teams: Team[]) => {
                console.log(teams);
                patchState(store, { teams });
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
    onInit({ loadTeam }) {
      loadTeam(1);
    },
  })
);
