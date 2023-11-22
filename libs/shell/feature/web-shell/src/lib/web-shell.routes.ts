import { Route } from '@angular/router';
import { SigninComponent } from '@f1-predictions/auth/feature/signin';

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
];
