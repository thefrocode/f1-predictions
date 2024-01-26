import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LeagueTeam, Player, PlayersState } from '@f1-predictions/models';
import { PlayerApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: PlayersState = {
  players: [],
  leagues: [],
  isLoading: false,
  error: null,
};
export const PlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ players, leagues }) => ({
    active_player: computed(() =>
      players().find((player) => player.user_id === 'dcgfchvj')
    ),
    active_player_leagues: computed(() =>
      leagues().reduce((acc: number[], league) => {
        acc.push(league.id);
        return acc;
      }, [])
    ),
  })),
  withMethods((store: any, playerApi = inject(PlayerApiService)) => ({
    loadAll() {
      patchState(store, { isLoading: true });
      playerApi.loadAll().pipe(
        tapResponse({
          next: (players: Player[]) => {
            patchState(store, { players });
          },
          error: console.error,
          finalize: () => patchState(store, { isLoading: false }),
        })
      );
    },
    loadAllLeaguesPerPlayer: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((player_id) =>
          playerApi.loadAllLeaguesPerPlayer(player_id).pipe(
            tapResponse({
              next: (leagues: LeagueTeam[]) => {
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
      loadAll();
    },
  })
);
