import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ActivePlayer,
  LeaguePlayers,
  LeaguePlayersState,
  Meta,
  PaginatedResponse,
  PlayerWithPoints,
  Point,
  SelectedLeague,
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import {
  pipe,
  tap,
  switchMap,
  filter,
  startWith,
  debounceTime,
  of,
} from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PlayersStore } from '@f1-predictions/players-store';
import { AuthStore } from '@f1-predictions/auth-store';

const initialState: LeaguePlayersState = {
  players: [],
  meta: {} as Meta,
  options: { page: 1, filter: null },
  selected_league_id: 0,
  status: 'pending',
  error: null,
};
export const LeaguePlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ selected_league_id, options }) => ({
    extended_options: computed(() => ({
      ...options(),
      league_id: selected_league_id(),
    })),
  })),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService),
      players = inject(PlayersStore)
    ) => ({
      updateCurrentPage: (page: number) => {
        patchState(store, {
          options: {
            ...store.options(),
            page: page,
          },
        });
      },
      updateFilter: rxMethod<Event>((filter$) =>
        filter$.pipe(
          debounceTime(300),
          tap((filter) =>
            patchState(store, {
              options: {
                ...store.options(),
                filter: (filter.target as HTMLInputElement).value,
                page: 1,
              },
            })
          )
        )
      ),
      selectLeague: (selected_league_id: number) => {
        patchState(store, {
          selected_league_id,
          options: {
            ...store.options(),
            page: 1,
          },
        });
      },
      loadActivePlayerLeague: rxMethod<ActivePlayer | undefined>(
        pipe(
          switchMap((player) => {
            console.log('player', player);
            let selected_league_id;
            if (!player) {
              selected_league_id = 1;
            } else {
              selected_league_id = player.selected_league_id;
            }

            patchState(store, {
              selected_league_id,
              options: {
                page: 1,
                filter: '',
              },
            });

            return of(null);
          })
        )
      ),

      loadLeaguePlayers: rxMethod<{
        league_id: number;
        page: number;
        filter: string | null;
      }>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap(({ league_id, page, filter }) =>
            leagueApi.loadOne(league_id, page, 6, filter).pipe(
              tapResponse({
                next: (league_players: PaginatedResponse<PlayerWithPoints>) => {
                  patchState(store, {
                    players: league_players.items,
                    meta: league_players.meta,
                    status: 'success',
                  });
                },
                error: console.error,
              })
            )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit({ extended_options, loadLeaguePlayers }) {
      loadLeaguePlayers(extended_options);
    },
  })
);
