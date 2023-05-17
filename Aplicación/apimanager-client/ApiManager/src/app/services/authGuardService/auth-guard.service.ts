import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { EmployeeService } from '../employeeService/employee.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = sessionStorage.getItem('employeeRole');
    if (role === 'admin' || role === 'developer') {
      return true;
    } else {
      return this.router.parseUrl('/notauth');
    }
  }
}
