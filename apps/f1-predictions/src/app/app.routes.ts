import { Route } from '@angular/router';
import { SigninComponent } from '@f1-predictions/auth/feature/signin';
import { HomeComponent } from '@f1-predictions/home';
import { LayoutComponent } from '@f1-predictions/layout';
import { LeagueSettingsComponent } from '@f1-predictions/league-settings';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
import { PredictionsTeamListComponent } from '@f1-predictions/predictions-team-list';

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
      {
        path: 'team',
        component: PredictionsTeamListComponent,
      },
      {
        path: 'leagues',
        component: LeaguesListComponent,
      },
    ],
  },
];
