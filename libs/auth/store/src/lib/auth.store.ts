import { signalStore, withMethods, withState } from '@ngrx/signals';

const initialState = {
  results: [],
  status: 'pending',
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    signin: (username: string, password: string) => {
        console.log('Logging in with',
        username,
        password);
    },

  })
);
