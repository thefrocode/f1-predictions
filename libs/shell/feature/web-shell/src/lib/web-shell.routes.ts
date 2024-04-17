import { Route } from '@angular/router';
import { SigninComponent } from '@f1-predictions/auth/feature/signin';
import { LeagueSettingsComponent } from '@f1-predictions/league-settings';

export const webShellRoutes: Route[] = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: LeagueSettingsComponent,
  },
];
