import {
  patchState,
  signalStore,
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
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: LeaguesState = {
  leagues: [],
  players: [],
  isLoading: false,
  error: null,
};
export const LeaguesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService)
    ) => ({
      loadAll() {
        patchState(store, { isLoading: true });
        leagueApi.loadAll().pipe(
          tapResponse({
            next: (leagues: League[]) => {
              patchState(store, { leagues });
            },
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      },
      loadAllPlayersPerLeague: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((league_id) =>
            leagueApi.loadAllPlayersPerLeague(league_id).pipe(
              tapResponse({
                next: (players: Player[]) => {
                  console.log(players);
                  patchState(store, { players });
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
