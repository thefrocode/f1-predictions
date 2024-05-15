import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  LeaguePlayers,
  LeaguePlayersState,
  Meta,
  PaginatedResponse,
  PlayerWithPoints,
  Point,
} from '@f1-predictions/models';
import { LeagueApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, filter, startWith } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PlayersStore } from '@f1-predictions/players-store';
import { AuthStore } from '@f1-predictions/auth-store';

const initialState: LeaguePlayersState = {
  players: [],
  meta: {} as Meta,
  selected_league: {
    id: 1,
    name: '',
  },
  status: 'pending',
  error: null,
};
export const LeaguePlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService),
      players = inject(PlayersStore)
    ) => ({
      selectLeague: (league_id: number, name: string) => {
        patchState(store, {
          selected_league: {
            id: league_id,
            name: name,
          },
        });
      },
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
    onInit({}) {},
  })
);