import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@f1-predictions/app-config';
import { TopTeams } from '@f1-predictions/models';

@Injectable({
  providedIn: 'root',
})
export class PredictionApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadTopTeams() {
    return this.http.get<TopTeams>(`${this.appConfig.baseURL}/predictions`);
  }
}
