import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ApiResponse,
  AuthPayload,
  AuthRegisterPayload,
  AuthState,
  User,
} from '@f1-predictions/models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AuthApiService } from '@f1-predictions/f1-predictions-api';
import { computed, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  withMethods(
    (
      store,
      authApi = inject(AuthApiService),
      toastr = inject(ToastrService)
    ) => ({
      login: rxMethod<AuthPayload>(
        pipe(
          tap(() => patchState(store, { status: 'authenticating' })),
          switchMap((user: AuthPayload) => {
            return authApi.login(user).pipe(
              tapResponse({
                next: (user: User) => {
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
      signup: rxMethod<AuthRegisterPayload>(
        pipe(
          tap(() => patchState(store, { status: 'registering' })),
          switchMap((user: AuthRegisterPayload) => {
            return authApi.signup(user).pipe(
              tapResponse({
                next: (user: ApiResponse) => {
                  toastr.success(user.message, 'Success');
                  setTimeout(() => {
                    patchState(store, {
                      status: 'registered',
                    });
                  }, 2000);
                },
                error: console.error,
              })
            );
          })
        )
      ),
      // loginWithGoogle: rxMethod<User>(
      //   pipe(
      //     tap((user: User) =>
      //       patchState(store, { user: user, status: 'authenticated' })
      //     )
      //   )
      // ),
    })
  )
);
