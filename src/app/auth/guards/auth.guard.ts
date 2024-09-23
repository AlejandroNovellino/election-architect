import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // * injected services
  private readonly authService: AuthenticationService = inject(
    AuthenticationService
  );

  constructor() {}

  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | Promise<any> | boolean {
    // verify if user is authenticated
    if (!this.authService.authenticated()) {
      // if not go to auth service (zitadel)
      return this.authService.authenticate();
    }

    return this.authService.authenticated();
  }
}
