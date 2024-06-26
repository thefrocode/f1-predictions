import { Route } from '@angular/router';
import { LoginComponent } from '@f1-predictions/auth/feature/login';
import { SignupComponent } from '@f1-predictions/signup';
import { HomeComponent } from '@f1-predictions/home';
import { LayoutComponent } from '@f1-predictions/layout';
import { LeagueSettingsComponent } from '@f1-predictions/league-settings';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
import { PredictionsTeamListComponent } from '@f1-predictions/predictions-team-list';
import { ResultsListComponent } from '@f1-predictions/results-list';
import { AuthGuard } from '@f1-predictions/utils';
import { CallbackComponent } from '@f1-predictions/callback';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
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
        path: 'leagues',
        component: LeaguesListComponent,
      },
      {
        path: 'results',
        component: ResultsListComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard()],
    children: [
      {
        path: 'settings',
        component: LeagueSettingsComponent,
      },
      {
        path: 'team',
        component: PredictionsTeamListComponent,
      },
    ],
  },
];
