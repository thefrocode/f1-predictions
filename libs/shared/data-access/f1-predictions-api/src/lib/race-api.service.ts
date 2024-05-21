import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Race } from '@f1-predictions/models';
import { delay, Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class RaceApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(): Observable<Race[]> {
    return this.http
      .get<Race[]>(`${this.appConfig.baseURL}/races`)
      .pipe(delay(5000));
  }
}
