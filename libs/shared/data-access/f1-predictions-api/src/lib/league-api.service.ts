import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddLeague, AddLeagueTeam, League } from '@f1-predictions/models';

@Injectable({
  providedIn: 'root',
})
export class LeagueApiService {
  http = inject(HttpClient);

  constructor() {}

  loadAll() {
    return this.http.get<League[]>('http://localhost:3000/api/leagues');
  }

  createLeague(league: AddLeague) {
    return this.http.post<League>('http://localhost:3000/api/leagues', league);
  }
  joinLeague(leagueTeam: AddLeagueTeam) {
    return this.http.post<League>(
      'http://localhost:3000/api/leagues/join',
      leagueTeam
    );
  }
}
