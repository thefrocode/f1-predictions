import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthPayload, AuthState, Result, User } from '@f1-predictions/models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AuthApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
const initialState: AuthState = {
  user: undefined,
  status: 'pending',
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
  })),
  withMethods((store, authApi = inject(AuthApiService)) => ({
    login: rxMethod<AuthPayload>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap((user: AuthPayload) => {
          return authApi.login(user).pipe(
            tapResponse({
              next: (user: User) => {
                console.log('Results', user);
                patchState(store, {
                  user,
                  status: 'success',
                });
              },
              error: console.error,
            })
          );
        })
      )
    ),
  }))
);
