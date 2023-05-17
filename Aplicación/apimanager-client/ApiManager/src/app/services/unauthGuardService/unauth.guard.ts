import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  router: Router;

  constructor(
    router: Router
  ) {
    this.router = router;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let role = sessionStorage.getItem('employeeRole');
      if (role != 'admin' && role != 'developer') {
        return true;
      }

      return this.router.parseUrl('/home');
  }

}
