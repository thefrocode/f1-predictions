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

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard()],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'settings',
        component: LeagueSettingsComponent,
      },
      {
        path: 'team',
        component: PredictionsTeamListComponent,
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
];
