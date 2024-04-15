import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import {
  AddLeague,
  AddLeagueTeam,
  League,
  Player,
  Point,
} from '@f1-predictions/models';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class LeagueApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(player_id: number) {
    return this.http.get<League[]>(
      `${this.appConfig.baseURL}/leagues/${player_id}`
    );
  }
  loadOne(league_id: number) {
    return this.http.get<Point[]>(
      `${this.appConfig.baseURL}/leagues/${league_id}/1`
    );
  }
  loadAllPlayersPerLeague(league_id: number) {
    return this.http.get<Player[]>(
      `${this.appConfig.baseURL}/leagues/${league_id}/players`
    );
  }

  createLeague(league: AddLeague) {
    return this.http.post<League>(`${this.appConfig.baseURL}/leagues`, league);
  }
  joinLeague(leagueTeam: AddLeagueTeam) {
    return this.http.post<League>(
      `${this.appConfig.baseURL}/leagues/join`,
      leagueTeam
    );
  }
}
