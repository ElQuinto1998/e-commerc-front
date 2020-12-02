import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import jwtDecoder from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //Comprobar si hay session de usuario
    if (this.auth.getSession() !== null) {
      console.log('Logeados');
      const dataDecoded: any = this.decodeToken();
      console.log('Data: ', dataDecoded);
      //Comprobar si el token no esta caducado
      if (dataDecoded.exp < new Date().getTime() / 1000) {
        console.log('Sesion caducada');
        this.redirect();
      }
      //Comprobar que el usuario es ADMIN
      if (dataDecoded.user.role === 'ADMIN') {
        console.log('Es admin');
        return true;
      }
      console.log('No es es admin');
    }
    console.log('Sesion no iniciada');
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken() {
    return jwtDecoder(this.auth.getSession().token);
  }
}
