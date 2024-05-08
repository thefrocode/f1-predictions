import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LeaguePlayer, Player, PlayersState } from '@f1-predictions/models';
import { PlayerApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: PlayersState = {
  active_player: undefined,
  players: [],
  leagues: [],
  isLoading: false,
  error: null,
};
export const PlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any, playerApi = inject(PlayerApiService)) => ({
    loadOne: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((user_id: string) =>
          playerApi.loadOne(user_id).pipe(
            tapResponse({
              next: (active_player: Player) => {
                console.log(active_player);
                patchState(store, { active_player });
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
    loadAll: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          playerApi.loadAll().pipe(
            tapResponse({
              next: (players: Player[]) => {
                patchState(store, { players });
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
    loadAllLeaguesPerPlayer: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((player_id) =>
          playerApi.loadAllLeaguesPerPlayer(player_id).pipe(
            tapResponse({
              next: (leagues: LeaguePlayer[]) => {
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
  })),
  withHooks({
    onInit({ loadAll }) {
      loadAll('');
    },
  })
);
