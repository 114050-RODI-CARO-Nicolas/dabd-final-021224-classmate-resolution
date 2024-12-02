import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { inject } from '@angular/core';

export const validatorLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); 
  const router = inject(Router);
  if (authService.user.id==null) {
    return router.parseUrl('');
    
  }
  return true;
};
