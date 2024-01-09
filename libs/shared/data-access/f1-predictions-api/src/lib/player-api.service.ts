import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { League, Player } from '@f1-predictions/models';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService {
  http = inject(HttpClient);

  constructor() {}

  loadAll() {
    return this.http.get<Player[]>('http://localhost:3000/api/players');
  }
}
