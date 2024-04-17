import { HttpClient, HttpParams } from '@angular/common/http';
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
    let params = new HttpParams();
    if (player_id) {
      params = params.append('player_id', player_id);
    }

    return this.http.get<League[]>(`${this.appConfig.baseURL}/leagues`, {
      params,
    });
  }
  loadOne(player_id: number) {
    return this.http.get<Point[]>(
      `${this.appConfig.baseURL}/leagues/${player_id}`
    );
  }
  selectLeagueToBeDisplayed(league: {
    id: number;
    league_id: number;
    player_id: number;
  }) {
    return this.http.patch<{ message: string }>(
      `${this.appConfig.baseURL}/selected-league/${league.id}`,
      {
        ...league,
      }
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
