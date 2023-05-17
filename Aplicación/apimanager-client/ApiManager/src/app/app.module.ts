import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SignedInLinksAdminComponent } from './components/layout/signed-in-links-admin/signed-in-links-admin.component';
import { SignedInLinksDevComponent } from './components/layout/signed-in-links-dev/signed-in-links-dev.component';
import { SignedOutLinksComponent } from './components/layout/signed-out-links/signed-out-links.component';
import { SearchbarComponent } from './components/layout/searchbar/searchbar.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ApiListComponent } from './components/APIS/api-list/api-list.component';
import { ApiSummaryComponent } from './components/APIS/api-summary/api-summary.component';
import { ApiDetailsComponent } from './components/APIS/api-details/api-details.component';
import { AddAPIComponent } from './components/APIS/add-api/add-api.component';
import { EditAPIComponent } from './components/APIS/edit-api/edit-api.component';
import { UserSearchComponent } from './components/users/user-search/user-search.component';
import { UsersComponent } from './components/users/users/users.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersSummaryComponent } from './components/users/users-summary/users-summary.component';
import { EndpointDetailsComponent } from './components/endPoints/endpoint-details/endpoint-details.component';
import { EndpointTestComponent } from './components/endPoints/endpoint-test/endpoint-test.component';
import { EndpointDefinitionComponent } from './components/endPoints/endpoint-definition/endpoint-definition.component';
import { SidebarCategoriesComponent } from './components/layout/sidebar-categories/sidebar-categories.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './services/employeeService/employee.service';
import { AuthGuardService } from './services/authGuardService/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddApiModalComponent } from './components/APIS/add-api/add-api-modal/add-api-modal.component';
import { DeleteApiComponent } from './components/APIS/delete-api/delete-api.component';
import { HotToastComponent } from '@ngneat/hot-toast/lib/components/hot-toast/hot-toast.component';
import {
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { UnauthGuard } from './services/unauthGuardService/unauth.guard';
import { EditApiModalComponent } from './components/APIS/add-api/edit-api-modal/edit-api-modal.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { TooltipModule } from 'ng2-tooltip-directive';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'b8f2c3d7-7bab-47c0-8610-b2c5e3ed561b',
      redirectUri: 'http://localhost:4200',
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignedInLinksAdminComponent,
    SignedInLinksDevComponent,
    SignedOutLinksComponent,
    SearchbarComponent,
    HomeComponent,
    ApiListComponent,
    ApiSummaryComponent,
    ApiDetailsComponent,
    AddAPIComponent,
    EditAPIComponent,
    UserSearchComponent,
    UsersComponent,
    UsersListComponent,
    UsersSummaryComponent,
    EndpointDetailsComponent,
    SidebarCategoriesComponent,
    SigninComponent,
    EndpointTestComponent,
    EndpointDefinitionComponent,
    AddApiModalComponent,
    EditApiModalComponent,
    DeleteApiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MsalModule,
    HotToastModule.forRoot(),
    TooltipModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    UnauthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
