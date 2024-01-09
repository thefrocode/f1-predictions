import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AddTeam, Team } from '@f1-predictions/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamApiService {
  http = inject(HttpClient);

  constructor() {}

  loadTeamsByPlayer(player_id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `http://localhost:3000/api/teams/${player_id}/player`
    );
  }
  loadTeamsByLeague(league_id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `http://localhost:3000/api/teams/${league_id}/league`
    );
  }

  createTeam(team: AddTeam): Observable<Team> {
    return this.http.post<Team>('http://localhost:3000/api/teams', team);
  }
}
