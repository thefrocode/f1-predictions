import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Player, PlayersState } from '@f1-predictions/models';
import { PlayerApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: PlayersState = {
  players: [],
  isLoading: false,
  error: null,
};
export const PlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ players }) => ({
    active_player: computed(() =>
      players().find((player) => player.user_id === 'dcgfchvj')
    ),
  })),
  withMethods((store, playerApi = inject(PlayerApiService)) => ({
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
  })),
  withHooks({
    onInit({ loadAll }) {
      loadAll();
    },
  })
);