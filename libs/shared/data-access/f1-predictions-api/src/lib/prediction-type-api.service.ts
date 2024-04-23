import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Point, PredictionType, Race } from '@f1-predictions/models';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class PredictionTypeApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  findAll(): Observable<PredictionType[]> {
    return this.http.get<PredictionType[]>(
      `${this.appConfig.baseURL}/prediction-types`
    );
  }
}
