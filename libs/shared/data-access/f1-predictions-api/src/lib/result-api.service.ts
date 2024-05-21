import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';
import { PaginatedResponse, RaceSummary, Result } from '@f1-predictions/models';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(page: number, limit: number) {
    let params = new HttpParams();

    params = params.append('page', page);
    params = params.append('limit', limit);
    return this.http.get<PaginatedResponse<Result>>(
      `${this.appConfig.baseURL}/results`,
      {
        params,
      }
    );
  }
  loadLastRaceSummary() {
    return this.http.get<RaceSummary>(
      `${this.appConfig.baseURL}/results/summary`
    );
  }
}
