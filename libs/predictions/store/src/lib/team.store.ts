import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PlayerTeam, Team, TeamsState } from '@f1-predictions/models';
import { TeamApiService } from '@f1-predictions/f1-predictions-api';
import { tapResponse } from '@ngrx/operators';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, startWith } from 'rxjs';
import { PlayersStore } from '@f1-predictions/players-store';
import { ToastrService } from 'ngx-toastr';
const initialState: TeamsState = {
  teams: [],
  active_player_team: undefined,
  selected_player_id: null,
  selected_team: null,
  isLoading: false,
  error: null,
};
export const TeamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ selected_player_id, teams }) => ({
    selected_team: computed(() => {
      if (selected_player_id()) {
        return teams()[selected_player_id()!];
      } else return null;
    }),
  })),
  withMethods(
    (
      store,
      teamApi = inject(TeamApiService),
      players = inject(PlayersStore),
      toastr = inject(ToastrService)
    ) => ({
      removeSelectedPlayer: () => {
        patchState(store, { selected_player_id: null });
      },
      loadOne: rxMethod<number>(
        pipe(
          tap(() =>
            patchState(store, { isLoading: true, selected_player_id: null })
          ),
          switchMap((player_id: number) =>
            teamApi.loadOne(player_id).pipe(
              tapResponse({
                next: (team: Team[]) => {
                  const new_teams = [...store.teams()];
                  new_teams[player_id] = { team, player_id };
                  patchState(store, {
                    teams: new_teams,
                    selected_player_id: player_id,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      loadActivePlayerTeam: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            teamApi.loadActivePlayerTeam().pipe(
              tapResponse({
                next: (active_player_team: Team[]) => {
                  patchState(store, {
                    active_player_team,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      updateTeam: rxMethod<Team[]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((team) =>
            teamApi.updateTeam(team).pipe(
              tapResponse({
                next: (team: Team[]) => {
                  patchState(store, { active_player_team: team });
                  toastr.success('Team updated successfully');
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
    })
  )
);
