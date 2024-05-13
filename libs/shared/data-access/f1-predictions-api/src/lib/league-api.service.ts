import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import {
  AddLeague,
  AddLeaguePlayer,
  League,
  LeaguePlayer,
  LeaguePlayers,
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

  loadAll(isAuthenticated: boolean) {
    return this.http.get<League[]>(`${this.appConfig.baseURL}/leagues`, {
      withCredentials: isAuthenticated,
    });
  }
  loadOne(league_id: number) {
    return this.http.get<LeaguePlayers>(
      `${this.appConfig.baseURL}/leagues/${league_id}`
    );
  }
  loadSelectedLeague() {
    return this.http.get<SelectedLeague>(
      `${this.appConfig.baseURL}/selected-league`,
      {
        withCredentials: true,
      }
    );
  }
  selectLeagueToBeDisplayed(league: { id: number; league_id: number }) {
    return this.http.patch<SelectedLeague>(
      `${this.appConfig.baseURL}/selected-league/${league.id}`,
      {
        league_id: league.league_id,
      },
      {
        withCredentials: true,
      }
    );
  }

  createLeague(league: AddLeague) {
    return this.http.post<League>(`${this.appConfig.baseURL}/leagues`, league, {
      withCredentials: true,
    });
  }
  joinLeague(leaguePlayer: AddLeaguePlayer) {
    return this.http.post<League>(
      `${this.appConfig.baseURL}/league-teams`,
      leaguePlayer
    );
  }
}
