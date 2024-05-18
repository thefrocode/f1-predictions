export interface AuthPayload {
  email: string;
  password: string;
}

export interface User {
  name: string;
}

export type AuthRegisterPayload = AuthPayload & { name: string };
export type AuthStatus =
  | 'pending'
  | 'authenticating'
  | 'authenticated'
  | 'registering'
  | 'registered'
  | 'success'
  | 'error';

export type AuthState = {
  user: User | undefined;
  isAuthenticated: boolean;
  status: AuthStatus;
  error: any;
};
