import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  AddLeague,
  AddLeagueTeam,
  League,
  LeaguesState,
  Player,
  Point,
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: LeaguesState = {
  leagues: [],
  players: [],
  active_player_position: {} as Point,
  isLoading: false,
  error: null,
};
export const LeaguesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ players }) => ({
    active_player_position: computed(() =>
      players().find((player) => player.player_id == 1)
    ),
  })),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService)
    ) => ({
      loadAll: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            leagueApi.loadAll(1).pipe(
              tapResponse({
                next: (leagues: League[]) => {
                  console.log(leagues);
                  patchState(store, { leagues });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      loadOne: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((league_id) =>
            leagueApi.loadOne(league_id).pipe(
              tapResponse({
                next: (players: Point[]) => {
                  patchState(store, {
                    players,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      createLeague: rxMethod<AddLeague>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((league) =>
            leagueApi.createLeague(league).pipe(
              tapResponse({
                next: (league: League) => {
                  patchState(store, { leagues: [...store.leagues(), league] });
                  toastr.success('League created', 'Success!');
                },
                error: (error: any) => {
                  toastr.error(
                    'League could not be created' + error.error.error.message,
                    'Error!'
                  );
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      joinLeague: rxMethod<AddLeagueTeam>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((leagueTeam) =>
            leagueApi.joinLeague(leagueTeam).pipe(
              tapResponse({
                next: () => {
                  toastr.success('Joined league successfully', 'Success!');
                },
                error: (error: any) => {
                  toastr.error(
                    'League could not be created' + error.error.error.message,
                    'Error!'
                  );
                },
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
