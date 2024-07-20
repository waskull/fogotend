import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { inject } from '@angular/core';
import { IIUser } from './interfaces';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const array = route.data['roles'] as string[];
  let roles;
  authService.getInfo().subscribe( (e: IIUser)=> {
    roles = e.roles[0];
    // console.log(roles);
    // console.log(roles,array);
    // console.log(route.url);
    if(!route?.url && roles) {router.navigate(['/dashboard']);return false;}
    if(!roles) {router.navigate(['/']);return false;}
    else if (array?.includes(roles)) return true;
    else {router?.navigate(['/dashboard']);return false;}
  });
  return true;
};
