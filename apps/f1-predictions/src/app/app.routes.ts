import { Route } from '@angular/router';
import { SigninComponent } from '@f1-predictions/auth/feature/signin';
import { HomeComponent } from '@f1-predictions/home';
import { LayoutComponent } from '@f1-predictions/layout';
import { LeagueSettingsComponent } from '@f1-predictions/league-settings';

export const appRoutes: Route[] = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'settings',
        component: LeagueSettingsComponent,
      },
    ],
  },
];
