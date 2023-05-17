import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthGuardService } from 'src/app/services/authGuardService/auth-guard.service';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  title = 'microsoft-sign-in';
  apiResponse: string;
  router: Router;
  constructor(
    private msalService: MsalService,
    private employeeService: EmployeeService,
    private httpClient: HttpClient,
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  validateEmployeeEmail(email: string) {
    let roleObs = this.employeeService.validateEmail(email);

    roleObs.subscribe((role) => {
      sessionStorage.setItem('employee_role', role);

      this.router.navigate(['/home']);
    });
  }

  getName() {
    if (this.msalService.instance.getActiveAccount() == null) {
      return 'unknown';
    }

    return this.msalService.instance.getActiveAccount().name;
  }

  login() {
    this.msalService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        let employeeEmail =
          this.msalService.instance.getActiveAccount()?.username!;
        let roleObservable = this.employeeService.validateEmail(employeeEmail);

        roleObservable.subscribe((role) => {
          let parsedRole = role[0]['status'];
          console.dir(parsedRole);
          sessionStorage.setItem('employeeRole', parsedRole);
          this.router.navigate(['/home']);
        });
      });
  }

  logout() {
    this.msalService.logout();
  }

  callProfile() {
    this.httpClient
      .get('http://graph.microsoft.com/v1.0/me')
      .subscribe((res) => {
        this.apiResponse = JSON.stringify(res);
      });
  }
}
