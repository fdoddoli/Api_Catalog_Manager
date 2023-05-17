import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/dashboard/home/home.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ApiDetailsComponent } from './components/APIS/api-details/api-details.component';
import { EndpointDetailsComponent } from './components/endPoints/endpoint-details/endpoint-details.component';
import { AddAPIComponent } from './components/APIS/add-api/add-api.component';
import { EmployeeService } from './services/employeeService/employee.service';
import { AuthGuardService } from './services/authGuardService/auth-guard.service';
import { UsersComponent } from './components/users/users/users.component';
import { UnauthGuard } from './services/unauthGuardService/unauth.guard';
import { EditAPIComponent } from './components/APIS/edit-api/edit-api.component';

const routes: Routes = [
  { path: 'notauth', component: SigninComponent, canActivate: [UnauthGuard] },
  { path: '', component: HomeComponent, canActivate:[AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuardService] },
  { path: 'api/:id/:category/:endpoint', component: ApiDetailsComponent, canActivate:[AuthGuardService] },
  { path: 'add-api', component: AddAPIComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService]},
  { path: 'edit-api/:id', component: EditAPIComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
