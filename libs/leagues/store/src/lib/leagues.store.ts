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
  AddLeaguePlayer,
  League,
  LeaguePlayer,
  LeaguePlayers,
  LeaguesState,
  Meta,
  PaginatedResponse,
  Player,
  Point,
  SelectedLeague,
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, filter, startWith } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PlayersStore } from '@f1-predictions/players-store';
import { AuthStore } from '@f1-predictions/auth-store';

const initialState: LeaguesState = {
  leagues: [],
  meta: {} as Meta,
  selected_league: {} as SelectedLeague,
  isLoading: false,
  error: null,
};
export const LeaguesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ leagues }) => ({
    active_player_leagues: computed(() =>
      leagues().filter((league) => league.position)
    ),
  })),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService),
      players = inject(PlayersStore)
    ) => ({
      loadAll: rxMethod<{ page: number; filter: string | null }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(({ page, filter }) => {
            return leagueApi.loadAll(page, 7, filter).pipe(
              tapResponse({
                next: (leagues: PaginatedResponse<League>) => {
                  patchState(store, {
                    leagues: leagues.items,
                    meta: leagues.meta,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),
      loadSelectedLeague: rxMethod<void>(
        pipe(
          filter(() => (players.active_player() ? true : false)),
          switchMap(() =>
            leagueApi.loadSelectedLeague().pipe(
              tapResponse({
                next: (selected_league: SelectedLeague) => {
                  patchState(store, {
                    selected_league,
                  });
                },
                error: console.error,
              })
            )
          )
        )
      ),
      selectLeague: rxMethod<{
        id: number;
        league_id: number;
      }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((league) =>
            leagueApi.selectLeagueToBeDisplayed(league).pipe(
              tapResponse({
                next: (selected_league: SelectedLeague) => {
                  patchState(store, { selected_league });
                  toastr.success(
                    'Display league changed successfully',
                    'Success!'
                  );
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
                    'League could not be created ' + error.error.error.message,
                    'Error!'
                  );
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      joinLeague: rxMethod<AddLeaguePlayer>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((leaguePlayer) =>
            leagueApi.joinLeague(leaguePlayer).pipe(
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
    onInit({ loadAll, loadSelectedLeague }) {
      //loadAll();
      loadSelectedLeague();
    },
  })
);
