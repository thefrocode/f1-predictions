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
  selected_league: {
    id: 0,
    name: '',
  },
  status: 'pending',
  error: null,
};
export const LeaguePlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ selected_league, options }) => ({
    extended_options: computed(() => ({
      ...options(),
      league_id: selected_league().id,
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
      selectLeague: (league_id: number, name: string) => {
        patchState(store, {
          selected_league: {
            id: league_id,
            name: name,
          },
        });
      },
      loadActivePlayerLeague: rxMethod<ActivePlayer | undefined>(
        pipe(
          switchMap((player) => {
            console.log('player', player);
            let league_id;
            if (!player) {
              league_id = 1;
            } else {
              league_id = player.selected_league_id;
            }
            console.log('league_id', league_id);
            patchState(store, {
              selected_league: {
                id: league_id,
                name: '',
              },
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
            leagueApi.loadOne(league_id, page, 7, filter).pipe(
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
