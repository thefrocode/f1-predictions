export interface AuthPayload {
  email: string;
  password: string;
}

export interface User {
  access_token: string;
  user_id: string;
}

export type AuthState = {
  user: User | null | undefined;
  status: 'pending' | 'authenticating' | 'loading' | 'success' | 'error';
  error: any;
};
