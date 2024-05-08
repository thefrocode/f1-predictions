export interface AuthPayload {
  email: string;
  password: string;
}

export interface User {
  access_token: string;
  user_id: string;
}

export type AuthRegisterPayload = AuthPayload & { name: string };

export type AuthState = {
  user: User | null | undefined;
  status:
    | 'pending'
    | 'authenticating'
    | 'authenticated'
    | 'registering'
    | 'registered'
    | 'success'
    | 'error';
  error: any;
};
