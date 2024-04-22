import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import {
  AddLeague,
  AddLeaguePlayer,
  League,
  Player,
  Point,
  SelectedLeague,
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
  loadSelectedLeague(player_id: number) {
    return this.http.get<SelectedLeague>(
      `${this.appConfig.baseURL}/selected-league/${player_id}`
    );
  }
  selectLeagueToBeDisplayed(league: {
    id: number;
    league_id: number;
    player_id: number;
  }) {
    return this.http.patch<SelectedLeague>(
      `${this.appConfig.baseURL}/selected-league/${league.id}`,
      {
        ...league,
      }
    );
  }

  createLeague(league: AddLeague) {
    return this.http.post<League>(`${this.appConfig.baseURL}/leagues`, league);
  }
  joinLeague(leaguePlayer: AddLeaguePlayer) {
    return this.http.post<League>(
      `${this.appConfig.baseURL}/league-teams`,
      leaguePlayer
    );
  }
}
