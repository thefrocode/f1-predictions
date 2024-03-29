import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { League, LeagueTeam, Player } from '@f1-predictions/models';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';
@Injectable({
  providedIn: 'root',
})
export class PlayerApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll() {
    return this.http.get<Player[]>(`${this.appConfig.baseURL}/players`);
  }
  loadAllLeaguesPerPlayer(player_id: number) {
    return this.http.get<LeagueTeam[]>(
      `${this.appConfig.baseURL}/players/${player_id}/leagues`
    );
  }
}
