import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';
import { RaceSummary, Result } from '@f1-predictions/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.appConfig.baseURL}/results`);
  }
  loadLastRaceSummary() {
    return this.http.get<RaceSummary>(
      `${this.appConfig.baseURL}/results/summary`
    );
  }
}
