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
  LeaguesState,
  Player,
  Point,
  SelectedLeague,
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PlayersStore } from '@f1-predictions/players-store';

const initialState: LeaguesState = {
  leagues: [],
  players: [],
  active_player_position: {} as Point,
  selected_league: {} as SelectedLeague,
  isLoading: false,
  error: null,
};
export const LeaguesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ players, leagues }, playersStore = inject(PlayersStore)) => ({
    active_player_position: computed(() =>
      players().find((player) => player.player_id == 1)
    ),
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
      loadAll: rxMethod<void>(
        pipe(
          filter(() => (players.active_player() ? true : false)),
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            leagueApi.loadAll(players.active_player()!.id).pipe(
              tapResponse({
                next: (leagues: League[]) => {
                  patchState(store, { leagues });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      loadOne: rxMethod<void>(
        pipe(
          filter(() => (players.active_player() ? true : false)),
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            leagueApi.loadOne(players.active_player()!.id).pipe(
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
      loadSelectedLeague: rxMethod<void>(
        pipe(
          filter(() => (players.active_player() ? true : false)),
          switchMap(() =>
            leagueApi.loadSelectedLeague(players.active_player()!.id).pipe(
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
        player_id: number;
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
    onInit({ loadAll, loadOne, loadSelectedLeague }) {
      loadAll();
      loadOne();
      loadSelectedLeague();
    },
  })
);
