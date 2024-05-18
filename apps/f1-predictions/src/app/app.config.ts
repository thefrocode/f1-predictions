import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { provideToastr } from 'ngx-toastr';
import { CountdownModule, provideCountdown } from 'ngx-countdown';
import { getAppConfigProvider } from '@f1-predictions/app-config';
import { environment } from '../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    getAppConfigProvider(environment),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideCountdown({ format: `DD HH:mm:ss` }),
    importProvidersFrom(
      MatDialogModule,
      BrowserAnimationsModule,
      CountdownModule,
      NgxSkeletonLoaderModule
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '476799260721-idi0ntt8qn9r6btle741unocliq9b48m.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideAnimations(),
  ],
};
