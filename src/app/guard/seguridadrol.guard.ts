import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const seguridadrolGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  const rolActual = loginService.obtenerRol(); // método que lee localStorage
  const rolesPermitidos = route.data['roles'] as string[];

  if (rolesPermitidos.includes(rolActual)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
