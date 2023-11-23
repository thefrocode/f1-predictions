import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Race } from '@f1-predictions/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceApiService {
  http = inject(HttpClient);

  constructor() {}

  loadAll(): Observable<Race[]> {
    return this.http.get<Race[]>(`http://localhost:3000/api/races`);
  }
}
