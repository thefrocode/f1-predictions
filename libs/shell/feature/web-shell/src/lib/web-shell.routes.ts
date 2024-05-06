import { Route } from '@angular/router';
import { LoginComponent } from '@f1-predictions/auth/feature/login';
import { LeagueSettingsComponent } from '@f1-predictions/league-settings';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
export const webShellRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: LeagueSettingsComponent,
  },
];
