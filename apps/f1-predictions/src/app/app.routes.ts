import { Route } from '@angular/router';
import { SigninComponent } from '@f1-predictions/auth/feature/signin';
import { HomeComponent } from '@f1-predictions/home';
import { LayoutComponent } from '@f1-predictions/layout';

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
    ],
  },
];
