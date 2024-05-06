import { CanActivateChildFn, Router } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';
import { inject } from '@angular/core';

export const AuthGuard = (): CanActivateChildFn => {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    if (authStore.isAuthenticated()) {
      return true;
    }

    return router.parseUrl('/login');
  };
};
