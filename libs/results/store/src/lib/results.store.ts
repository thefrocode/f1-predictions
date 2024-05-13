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
  Point,
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
  status: 'pending',
  error: null,
};
export const ResultsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, resultApi = inject(ResultApiService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(() => {
          console.log('Loading Results');
          return resultApi.loadAll().pipe(
            tapResponse({
              next: (results: Result[]) => {
                console.log('Results', results);
                patchState(store, { results, status: 'success' });
              },
              error: console.error,
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit({ loadAll }) {},
  })
);
