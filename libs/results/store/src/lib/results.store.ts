import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  AddLeague,
  AddLeaguePlayer,
  League,
  LeaguesState,
  Meta,
  PaginatedResponse,
  Point,
  RaceSummary,
  Result,
  ResultsState,
  SelectedLeague,
} from '@f1-predictions/models';
import {
  LeagueApiService,
  ResultApiService,
} from '@f1-predictions/f1-predictions-api';
import { ToastrService } from 'ngx-toastr';
import { computed, inject } from '@angular/core';
import { pipe, tap, switchMap, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

const initialState: ResultsState = {
  results: [],
  last_race: undefined,
  options: { page: 1 },
  meta: {} as Meta,
  status: 'pending',
  error: null,
};
export const ResultsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, resultApi = inject(ResultApiService)) => ({
    updateCurrentPage: (page: number) => {
      patchState(store, {
        options: {
          ...store.options(),
          page: page,
        },
      });
    },
    loadAll: rxMethod<{ page: number }>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(({ page }) => {
          return resultApi.loadAll(page, 10).pipe(
            tapResponse({
              next: (results: PaginatedResponse<Result>) => {
                patchState(store, {
                  results: results.items,
                  meta: results.meta,
                  status: 'success',
                });
              },
              error: console.error,
            })
          );
        })
      )
    ),
    loadLastRaceSummary: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(() =>
          resultApi.loadLastRaceSummary().pipe(
            tapResponse({
              next: (last_race: RaceSummary) => {
                console.log(last_race);
                patchState(store, { last_race, status: 'success' });
              },
              error: () => {
                console.error, patchState(store, { status: 'failed' });
              },
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit({ loadAll, loadLastRaceSummary, options }) {
      loadAll(options);
      loadLastRaceSummary();
    },
  })
);
