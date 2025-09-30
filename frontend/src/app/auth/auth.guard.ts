import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const hasToken = !!localStorage.getItem('auth_token');
  if (hasToken) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigateByUrl('/login');
  }

};
