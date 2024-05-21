import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import {
  AddLeague,
  AddLeaguePlayer,
  League,
  LeaguePlayer,
  LeaguePlayers,
  PaginatedResponse,
  Player,
  PlayerWithPoints,
  Point,
  SelectedLeague,
} from '@f1-predictions/models';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';
import { AuthStore } from '@f1-predictions/auth-store';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueApiService {
  http = inject(HttpClient);
  auth = inject(AuthStore);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(page: number = 1, limit: number = 10, filter: string | null) {
    let params = new HttpParams();

    params = params.append('page', page);
    if (filter) {
      params = params.append('filter', filter);
    }

    return this.http.get<PaginatedResponse<League>>(
      `${this.appConfig.baseURL}/leagues`,
      {
        params,
        withCredentials: this.auth.isAuthenticated(),
      }
    );
  }
  loadOne(
    league_id: number,
    page: number = 1,
    limit: number = 7,
    filter: string | null
  ) {
    let params = new HttpParams();

    params = params.append('page', page);
    params = params.append('limit', limit);
    if (filter) {
      params = params.append('filter', filter);
    }
    return this.http.get<PaginatedResponse<PlayerWithPoints>>(
      `${this.appConfig.baseURL}/leagues/${league_id}`,
      {
        params,
      }
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
  selectLeagueToBeDisplayed(league_id: number) {
    return this.http.patch<SelectedLeague>(
      `${this.appConfig.baseURL}/selected-league/`,
      {
        league_id,
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
