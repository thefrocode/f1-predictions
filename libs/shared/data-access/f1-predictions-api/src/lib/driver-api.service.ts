import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Driver, Point, PredictionType, Race } from '@f1-predictions/models';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Injectable({
  providedIn: 'root',
})
export class DriverApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.appConfig.baseURL}/drivers`);
  }
}
