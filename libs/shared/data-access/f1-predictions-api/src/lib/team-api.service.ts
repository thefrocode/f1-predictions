import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AddTeam, Team } from '@f1-predictions/models';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class TeamApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadTeamsByPlayer(player_id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${this.appConfig.baseURL}/teams/${player_id}/player`
    );
  }
  loadTeamsByLeague(league_id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${this.appConfig.baseURL}/teams/${league_id}/league`
    );
  }

  createTeam(team: AddTeam): Observable<Team> {
    return this.http.post<Team>(`${this.appConfig.baseURL}/teams`, team);
  }
}
