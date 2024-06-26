import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ApiResponse,
  AuthPayload,
  AuthRegisterPayload,
  User,
} from '@f1-predictions/models';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  login(user: AuthPayload): Observable<User> {
    return this.http.post<User>(
      `${this.appConfig.baseURL}/auth/login`,
      {
        ...user,
      },
      {
        withCredentials: true,
      }
    );
  }
  loginWithGoogle() {
    return this.http.get(`${this.appConfig.baseURL}/auth/google`, {
      withCredentials: true,
    });
  }
  signup(user: AuthRegisterPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.appConfig.baseURL}/auth/signup`,
      {
        ...user,
      }
    );
  }
  loginAutomatically(): Observable<User> {
    return this.http.get<User>(
      `${this.appConfig.baseURL}/auth/login-automatically`,
      {
        withCredentials: true,
      }
    );
  }
  logout() {
    return this.http.get(`${this.appConfig.baseURL}/auth/logout`, {
      withCredentials: true,
    });
  }
}
