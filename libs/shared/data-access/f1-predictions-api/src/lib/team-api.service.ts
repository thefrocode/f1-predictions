import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AddTeam, PlayerTeam, Team } from '@f1-predictions/models';
import { delay, Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class TeamApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadActivePlayerTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.appConfig.baseURL}/teams/`, {
      withCredentials: true,
    });
  }
  loadOne(player_id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${this.appConfig.baseURL}/teams/${player_id}`
    );
  }

  updateTeam(team: Team[]): Observable<Team[]> {
    return this.http.patch<Team[]>(`${this.appConfig.baseURL}/teams`, team, {
      withCredentials: true,
    });
  }
}
