import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']);

    return false;
  }
};
