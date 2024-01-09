import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AddTeam, Team, TeamsState } from '@f1-predictions/models';
import { TeamApiService } from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  error: null,
};
export const TeamsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      teamApi = inject(TeamApiService),
      toastr = inject(ToastrService)
    ) => ({
      loadTeamsByPlayer: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((player_id) =>
            teamApi.loadTeamsByPlayer(player_id).pipe(
              tapResponse({
                next: (teams: Team[]) => {
                  patchState(store, { teams });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      createTeam: rxMethod<AddTeam>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((team) =>
            teamApi.createTeam(team).pipe(
              tapResponse({
                next: (team: Team) => {
                  patchState(store, { teams: [...store.teams(), team] });
                  toastr.success('Team created', 'Success!');
                },
                error: (error: any) => {
                  toastr.error(
                    'Team could not be created' + error.error.error.message,
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
  )
);
