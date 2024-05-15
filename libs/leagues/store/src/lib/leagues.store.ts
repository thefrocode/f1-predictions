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
  AddLeague,
  AddLeaguePlayer,
  League,
  LeaguePlayer,
  LeaguePlayers,
  LeaguesState,
  Meta,
  PaginatedResponse,
  Player,
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
import { ActivePlayerStore, PlayersStore } from '@f1-predictions/players-store';
import { AuthStore } from '@f1-predictions/auth-store';

const initialState: LeaguesState = {
  leagues: [],
  options: { page: 1, filter: null },
  meta: {} as Meta,
  isLoading: false,
  error: null,
};
export const LeaguesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ leagues }) => ({
    active_player_leagues: computed(() =>
      leagues().filter((league) => league.position)
    ),
  })),
  withMethods(
    (
      store,
      leagueApi = inject(LeagueApiService),
      toastr = inject(ToastrService),
      active_player = inject(ActivePlayerStore)
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
      resetOptions: () => {
        patchState(store, {
          options: {
            ...store.options(),
            page: 1,
            filter: '',
          },
        });
      },
      loadAll: rxMethod<{ page: number; filter: string | null }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(({ page, filter }) => {
            return leagueApi.loadAll(page, 7, filter).pipe(
              tapResponse({
                next: (leagues: PaginatedResponse<League>) => {
                  patchState(store, {
                    leagues: leagues.items,
                    meta: leagues.meta,
                  });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),

      selectLeague: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((league) =>
            leagueApi.selectLeagueToBeDisplayed(league).pipe(
              tapResponse({
                next: (selected_league: SelectedLeague) => {
                  active_player.updateSelectedLeague(selected_league.league_id);
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
    onInit({ loadAll, options }) {
      loadAll(options);
    },
  })
);
