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
  ActivePlayerState,
  LeaguePlayer,
  Player,
  PlayersState,
  PlayerWithPoints,
  User,
} from '@f1-predictions/models';
import { PlayerApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { AuthStore } from '@f1-predictions/auth-store';

const initialState: ActivePlayerState = {
  player: undefined,
  status: 'pending',
  error: null,
};
export const ActivePlayerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any, playerApi = inject(PlayerApiService)) => ({
    updateSelectedLeague: (selected_league_id: number) => {
      patchState(store, {
        player: {
          ...store.player,
          selected_league_id,
        },
      });
    },

    loadActivePlayer: rxMethod<boolean>(
      pipe(
        filter((isAuthenticated) => isAuthenticated),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          playerApi.loadActivePlayer().pipe(
            tapResponse({
              next: (player: ActivePlayer) => {
                console.log(player);
                patchState(store, { player });
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
    onInit({ loadActivePlayer }) {},
  })
);
